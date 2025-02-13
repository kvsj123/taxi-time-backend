import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SupabaseService } from './supabase/supabase.service';
import { ChauffeursModule } from './chauffeurs/chauffeurs.module';
import { OCRModule } from "./ocr/ocr.module";
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables available globally
    }),

    // TypeORM Configuration (Supabase PostgreSQL)
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.SUPABASE_DATABASE_URL,  // Ensure these are set in .env
      autoLoadEntities: true,
      synchronize: false,  // Set to false in production
    }),

    AuthModule,
    ChauffeursModule,
    OCRModule,
    AdminModule
  ],
  providers: [SupabaseService],
})
export class AppModule {}
