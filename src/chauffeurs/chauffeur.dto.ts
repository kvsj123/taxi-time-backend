import { IsString, IsUUID, IsOptional, IsEmail, IsDateString, IsBoolean, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateChauffeurDto {
  @IsUUID()
  auth_user_id: string; // Supabase Auth User ID

  @IsUUID()
  @IsOptional()
  company_id?: string;

  // 🔹 Personal Details
  @IsString()
  @MaxLength(255)
  first_name: string;

  @IsString()
  @MaxLength(255)
  last_name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  birth_place?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  postal_code?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nationality?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  national_id?: string;

  @IsString()
  @IsOptional()
  id_card?: string;

  // 🔹 Family Details
  @IsString()
  @IsOptional()
  @MaxLength(50)
  marital_status?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  dependents?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  dependent_spouse_name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  dependent_spouse_profession?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  number_of_kids?: number;

  // 🔹 Education & Skills
  @IsString()
  @IsOptional()
  @MaxLength(255)
  education_level?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  language?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  driver_license_number?: string;

  @IsString()
  @IsOptional()
  driver_license_photo?: string;

  // 🔹 Employment Details
  @IsString()
  @MaxLength(50)
  worker_number: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  profession?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  employment_status?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  work_permit_type?: string;

  @IsString()
  @IsOptional()
  extra_info?: string;

  @IsNumber()
  @IsOptional()
  hourly_rate?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  virtual_terminal_id?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  work_location?: string;

  @IsString()
  @IsOptional()
  benefits_in_kind?: string;

  // 🔹 Work Schedule
  @IsString()
  @IsOptional()
  @MaxLength(255)
  work_formula?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  work_days?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  period?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  free_day?: string;

  // 🔹 Payment Preferences
  @IsBoolean()
  @IsOptional()
  prefers_card_payment?: boolean;

  @IsBoolean()
  @IsOptional()
  prefers_cash_payment?: boolean;

  @IsBoolean()
  @IsOptional()
  prefers_check_payment?: boolean;

  @IsBoolean()
  @IsOptional()
  prefers_invoice?: boolean;

  @IsBoolean()
  @IsOptional()
  prefers_heetch?: boolean;
}
