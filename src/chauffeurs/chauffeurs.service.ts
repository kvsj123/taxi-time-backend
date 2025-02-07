import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chauffeur } from './chauffeur.entity';
import { CreateChauffeurDto } from './create-chauffeur.dto';
import { UpdateChauffeurDto } from './update-chauffeur.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { File as MulterFile } from 'multer'; // ✅ Correct import for file handling



@Injectable()
export class ChauffeursService {
  constructor(
    @InjectRepository(Chauffeur)
    private readonly chauffeurRepository: Repository<Chauffeur>,
    private readonly supabaseService: SupabaseService,
  ) {}

  // ✅ File Upload Function (Uploads images to Supabase Storage)
  async uploadFile(file: MulterFile | undefined, folder: string): Promise<string | null> {
    if (!file) return null;
  
    console.log(`📂 Uploading file: ${file.originalname} to folder: ${folder}`);
  
    const supabase = this.supabaseService.getClient();
    const filePath = `${folder}/${Date.now()}-${file.originalname}`;
  
    const { data, error } = await supabase.storage
      .from('chauffeurs')
      .upload(filePath, file.buffer, { contentType: file.mimetype });
  
    if (error) {
      console.error(`❌ Supabase Upload Failed for ${file.originalname}:`, error);
      throw new HttpException('File upload failed: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  
    console.log(`✅ Supabase Upload Success: ${data.path}`);
  
    // Get public URL
    const { data: publicUrlData } = await supabase.storage.from('chauffeurs').getPublicUrl(data.path);
    console.log(`🔗 Public URL: ${publicUrlData.publicUrl}`);
  
    return publicUrlData.publicUrl;
  }
  
  

  async create(
    createChauffeurDto: CreateChauffeurDto,
    idCardFile?: MulterFile,
    driverLicenseFile?: MulterFile,
    bankCardFile?: MulterFile,
    contractFile?: MulterFile
  ) {
    console.log("📥 Received DTO:", createChauffeurDto);
    console.log("📂 Received Files:", { idCardFile, driverLicenseFile, bankCardFile, contractFile });
  
    const supabase = this.supabaseService.getClient();
    const email = createChauffeurDto.email.trim().toLowerCase();
  
    // Check if email already exists
    const existingChauffeur = await this.chauffeurRepository.findOne({ where: { email } });
    if (existingChauffeur) {
      console.error(`❌ Chauffeur with email ${email} already exists`);
      throw new HttpException(`Chauffeur with email ${email} already exists`, HttpStatus.CONFLICT);
    }
  
    // Create chauffeur account in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password: 'Chauffeur123',
      options: { emailRedirectTo: '', data: { role: 'chauffeur' } },
    });
  
    if (error || !data.user) {
      console.error("❌ Failed to create Supabase Auth User:", error);
      throw new HttpException('Failed to create chauffeur account in Supabase', HttpStatus.BAD_REQUEST);
    }
  
    console.log("✅ Supabase Auth Created:", data.user);
  
    try {
      // Upload Files (ID card, License, Bank Card, Contract) if they exist
      const idCardUrl = idCardFile ? await this.uploadFile(idCardFile, 'id_cards') : null;
      const driverLicenseUrl = driverLicenseFile ? await this.uploadFile(driverLicenseFile, 'licenses') : null;
      const bankCardUrl = bankCardFile ? await this.uploadFile(bankCardFile, 'bank_cards') : null;
      const contractUrl = contractFile ? await this.uploadFile(contractFile, 'contracts') : null;
  
      console.log("📤 Uploaded Files URLs:", { idCardUrl, driverLicenseUrl, bankCardUrl, contractUrl });
  
      // Convert empty values to null
      const cleanedData: Partial<Chauffeur> = Object.fromEntries(
        Object.entries(createChauffeurDto).map(([key, value]) => {
          if (value === "true") return [key, true];  // ✅ Convert "true" to true
          if (value === "false") return [key, false]; // ✅ Convert "false" to false
          return [key, value === '' ? null : value];  // ✅ Convert empty strings to null
        })
      );
      
      console.log("🧹 Cleaned DTO:", cleanedData);
  
      // Create the new Chauffeur entity
      const newChauffeur = this.chauffeurRepository.create({
        ...cleanedData, // Spread cleaned data
        email, // Explicitly include email
        auth_user_id: data.user.id,
        id_card: idCardUrl,
        driver_license_photo: driverLicenseUrl,
        bank_card_photo: bankCardUrl,
        contract_photo: contractUrl,
      } as Chauffeur); // Explicitly cast to Chauffeur
  
      console.log("📝 Attempting to Save Chauffeur:", JSON.stringify(newChauffeur, null, 2));
  
      // Save to database
      const savedChauffeur = await this.chauffeurRepository.save(newChauffeur);
      console.log("✅ Chauffeur Successfully Saved:", JSON.stringify(savedChauffeur, null, 2));
  
      return savedChauffeur;
    } catch (dbError: any) {
      console.error("❌ Database Error:", dbError);
      await supabase.auth.admin.deleteUser(data.user.id);
      throw new HttpException('Failed to create chauffeur due to database error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  // ✅ Get all chauffeurs
  async findAll() {
    return await this.chauffeurRepository.find();
  }

  // ✅ Get a single chauffeur
  async findOne(id: string) {
    const chauffeur = await this.chauffeurRepository.findOne({ where: { id } });
    if (!chauffeur) {
      throw new HttpException('Chauffeur not found', HttpStatus.NOT_FOUND);
    }
    return chauffeur;
  }

  // ✅ Update Chauffeur
  async update(id: string, updateChauffeurDto: UpdateChauffeurDto) {
    const chauffeur = await this.chauffeurRepository.findOne({ where: { id } });
    if (!chauffeur) {
      throw new HttpException('Chauffeur not found', HttpStatus.NOT_FOUND);
    }
    await this.chauffeurRepository.update(id, updateChauffeurDto);
    return this.chauffeurRepository.findOne({ where: { id } });
  }

  // ✅ Delete Chauffeur
  async remove(id: string) {
    const chauffeur = await this.chauffeurRepository.findOne({ where: { id } });
    if (!chauffeur) {
      throw new NotFoundException(`Chauffeur with ID ${id} not found`);
    }
    const supabase = this.supabaseService.getClient();

    // ✅ Delete Supabase Auth User
    const { error } = await supabase.auth.admin.deleteUser(chauffeur.auth_user_id);
    if (error) {
      throw new HttpException('Failed to delete chauffeur account', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // ✅ Delete Chauffeur from Database
    await this.chauffeurRepository.delete(id);
    return { message: 'Chauffeur and linked Supabase Auth user deleted successfully' };
  }
}
