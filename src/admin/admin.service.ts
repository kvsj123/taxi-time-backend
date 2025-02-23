import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly supabaseService: SupabaseService,
  ) {}

  // ✅ Create Admin (Registers in Supabase & DB)
  async create(createAdminDto: CreateAdminDto) {
    const { email, first_name, last_name, company_id } = createAdminDto;

    // Check if email already exists
    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new ConflictException(`Admin with email ${email} already exists`);
    }

    // ✅ Create User in Supabase Auth
    const { data, error } = await this.supabaseService.getClient().auth.signUp({
      email,
      password: createAdminDto.password, // Default password (must be changed later)
      options: { emailRedirectTo: '', data: { role: 'admin' } }, // Set role in metadata
    });
    

    if (error || !data.user) {
      throw new ConflictException('Failed to create admin in Supabase');
    }

    // ✅ Save Admin in Database
    const admin = this.adminRepository.create({
      company_id,
      auth_user_id: data.user.id,
      first_name,
      last_name,
      email,

    });

    return await this.adminRepository.save(admin);
  }

  // ✅ Get All Admins
  async findAll() {
    return await this.adminRepository.find();
  }

  // ✅ Get Admin by ID
  async findOne(id: string) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new NotFoundException(`Admin not found`);
    return admin;
  }

    // ✅ Find Admin by Supabase Auth User ID
  async findByAuthUserId(authUserId: string) {
    const admin = await this.adminRepository.findOne({ where: { auth_user_id: authUserId } });
    if (!admin) {
      throw new NotFoundException(`Admin with auth_user_id ${authUserId} not found`);
    }
    return admin;
  }

  // ✅ Update Admin
  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id); // Ensure admin exists
    await this.adminRepository.update(id, updateAdminDto);
    return this.findOne(id);
  }

  // ✅ Delete Admin (Also deletes from Supabase Auth)
  async remove(id: string) {
    const admin = await this.findOne(id);
    const { error } = await this.supabaseService.getClient().auth.admin.deleteUser(admin.auth_user_id);
    
    if (error) throw new ConflictException('Failed to delete admin from Supabase');

    await this.adminRepository.delete(id);
    return { message: 'Admin deleted successfully' };
  }
}
