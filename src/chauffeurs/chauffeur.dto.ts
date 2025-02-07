import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateChauffeurDto {
  @IsUUID()
  auth_user_id: string;

  @IsUUID()
  @IsOptional()
  company_id?: string;

  @IsString()
  @Length(1, 255)
  first_name: string;

  @IsString()
  @Length(1, 255)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  phone: string;

  @IsDate()
  birth_date: Date;

  @IsString()
  @IsOptional()
  birth_place?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @Length(1, 100)
  national_id: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  // ✅ File Uploads
  @IsString()
  @IsOptional()
  id_card?: string;

  @IsString()
  @IsOptional()
  driver_license_photo?: string;

  @IsString()
  @IsOptional()
  bank_card_photo?: string;

  @IsString()
  @IsOptional()
  contract_photo?: string;

  // ✅ Employment Information
  @IsDate()
  start_date: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsOptional()
  extra_info?: string;

  // ✅ Workdays
  @IsBoolean()
  @IsOptional()
  works_monday?: boolean;

  @IsBoolean()
  @IsOptional()
  works_tuesday?: boolean;

  @IsBoolean()
  @IsOptional()
  works_wednesday?: boolean;

  @IsBoolean()
  @IsOptional()
  works_thursday?: boolean;

  @IsBoolean()
  @IsOptional()
  works_friday?: boolean;

  @IsBoolean()
  @IsOptional()
  works_saturday?: boolean;

  @IsBoolean()
  @IsOptional()
  works_sunday?: boolean;

  // ✅ Shift & Work Formula
  @IsString()
  shift_type: 'Day' | 'Night' | 'Long';

  @IsString()
  work_formula: '50/50' | 'Forfait';

  // ✅ Payment Preferences
  @IsBoolean()
  @IsOptional()
  accepts_card_payment?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_check_payment?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_cash_payment?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_bolt_app?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_bolt_cash?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_bolt_card?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_heetch_app?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_heetch_cash?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_heetch_card?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_uber_app?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_uber_cash?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_uber_card?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_taxi_vert_cash?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_taxi_vert_app?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_taxi_vert_card?: boolean;
}
