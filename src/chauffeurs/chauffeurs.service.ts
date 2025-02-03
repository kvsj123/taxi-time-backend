import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chauffeur } from './chauffeur.entity';
import { CreateChauffeurDto } from './create-chauffeur.dto';
import { UpdateChauffeurDto } from './update-chauffeur.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ChauffeursService {
  constructor(
    @InjectRepository(Chauffeur)
    private readonly chauffeurRepository: Repository<Chauffeur>,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createChauffeurDto: CreateChauffeurDto) {
    const supabase = this.supabaseService.getClient();

    // 🔹 Create Chauffeur Account in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: createChauffeurDto.email.trim().toLowerCase(),
        password: 'Chauffeur123', // Temporary password
        options: {
          emailRedirectTo: '', // Disables email confirmation
          data: { role: 'chauffeur'} // Saves the role in Supabase Auth metadata
        }
      });
      
      if (error || !data.user) {
        console.error('Error signing up chauffeur:', error);
        throw new HttpException('Failed to create chauffeur account', HttpStatus.BAD_REQUEST);
      }
      
      const newChauffeur = this.chauffeurRepository.create({
        ...createChauffeurDto,
        auth_user_id: data.user.id, // Link to Supabase User
      });
      
      return await this.chauffeurRepository.save(newChauffeur);
      
  }

  async findAll() {
    return await this.chauffeurRepository.find();
  }

  async findOne(id: string) {
    const chauffeur = await this.chauffeurRepository.findOne({ where: { id } });

    if (!chauffeur) {
      throw new HttpException('Chauffeur not found', HttpStatus.NOT_FOUND);
    }
    return chauffeur;
  }

  async update(id: string, updateChauffeurDto: UpdateChauffeurDto) {
    const chauffeur = await this.chauffeurRepository.findOne({ where: { id } });

    if (!chauffeur) {
      throw new HttpException('Chauffeur not found', HttpStatus.NOT_FOUND);
    }

    await this.chauffeurRepository.update(id, updateChauffeurDto);
    return this.chauffeurRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    // Find chauffeur by ID
    const chauffeur = await this.chauffeurRepository.findOne({ where: { id } });
  
    if (!chauffeur) {
      throw new NotFoundException(`Chauffeur with ID ${id} not found`);
    }
  
    const supabase = this.supabaseService.getClient();
  
    // First, delete the user from Supabase Auth
    const { error } = await supabase.auth.admin.deleteUser(chauffeur.auth_user_id);
  
    if (error) {
      console.error('Error deleting Supabase Auth user:', error);
      throw new HttpException('Failed to delete chauffeur account', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    // Now, delete the chauffeur from the database
    await this.chauffeurRepository.delete(id);
  
    return { message: 'Chauffeur and linked Supabase Auth user deleted successfully' };
  }
}
