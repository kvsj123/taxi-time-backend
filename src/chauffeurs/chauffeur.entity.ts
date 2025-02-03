import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('chauffeurs')
export class Chauffeur {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  auth_user_id: string; // Supabase Auth User ID

  @Column({ type: 'uuid', nullable: true })
  company_id: string;

  // Personal Details
  @Column({ type: 'varchar', length: 255, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  birth_place: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  postal_code: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  national_id: string;

  @Column({ type: 'text', nullable: true })
  id_card: string;

  // Family Details
  @Column({ type: 'varchar', length: 50, nullable: true })
  marital_status: string;

  @Column({ type: 'integer', default: 0 })
  dependents: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dependent_spouse_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dependent_spouse_profession: string;

  @Column({ type: 'integer', default: 0 })
  number_of_kids: number;

  // Education & Skills
  @Column({ type: 'varchar', length: 255, nullable: true })
  education_level: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  language: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  driver_license_number: string;

  @Column({ type: 'text', nullable: true })
  driver_license_photo: string;

  // Employment Details
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  worker_number: string;

  @Column({ type: 'date', nullable: true })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profession: string;

  @Column({ type: 'varchar', length: 50, default: 'Active' })
  employment_status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  work_permit_type: string;

  @Column({ type: 'text', nullable: true })
  extra_info: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  hourly_rate: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  virtual_terminal_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  work_location: string;

  @Column({ type: 'text', nullable: true })
  benefits_in_kind: string;

  // Work Schedule
  @Column({ type: 'varchar', length: 255, nullable: true })
  work_formula: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  work_days: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  period: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  free_day: string;

  // Payment Preferences
  @Column({ type: 'boolean', default: false })
  prefers_card_payment: boolean;

  @Column({ type: 'boolean', default: false })
  prefers_cash_payment: boolean;

  @Column({ type: 'boolean', default: false })
  prefers_check_payment: boolean;

  @Column({ type: 'boolean', default: false })
  prefers_invoice: boolean;

  @Column({ type: 'boolean', default: false })
  prefers_heetch: boolean;

  // Timestamps
  @CreateDateColumn()
  created_at: Date;
}