import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChauffeursService } from './chauffeurs.service';
import { ChauffeursController } from './chauffeurs.controller';
import { Chauffeur } from './chauffeur.entity';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chauffeur])],
  providers: [ChauffeursService, SupabaseService],
  controllers: [ChauffeursController]
})
export class ChauffeursModule {}
