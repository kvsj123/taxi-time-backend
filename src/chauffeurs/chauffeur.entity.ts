import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity('chauffeurs')
export class Chauffeur {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  auth_user_id: string;

  @Column({ type: 'uuid', nullable: true })
  company_id: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ length: 255, nullable: true })
  birth_place: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ length: 100, unique: true })
  national_id: string;

  @Column({ length: 100, nullable: true })
  nationality: string;

  // ✅ File Uploads
  @Column({ type: 'text', nullable: true })
  id_card: string;

  @Column({ type: 'text', nullable: true })
  driver_license_photo: string;

  @Column({ type: 'text', nullable: true })
  bank_card_photo: string;

  @Column({ type: 'text', nullable: true })
  contract_photo: string;

  // ✅ Employment Information
  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'text', nullable: true })
  extra_info: string;

  // ✅ Workdays
  @Column({ default: false })
  works_monday: boolean;

  @Column({ default: false })
  works_tuesday: boolean;

  @Column({ default: false })
  works_wednesday: boolean;

  @Column({ default: false })
  works_thursday: boolean;

  @Column({ default: false })
  works_friday: boolean;

  @Column({ default: false })
  works_saturday: boolean;

  @Column({ default: false })
  works_sunday: boolean;

  // ✅ Shift & Work Formula
  @Column({ type: 'varchar', length: 50 })
  shift_type: 'Day' | 'Night' | 'Long';

  @Column({ type: 'varchar', length: 50 })
  work_formula: '50/50' | 'Forfait';

  // ✅ Payment Preferences (Checkbox Booleans)
  @Column({ default: false })
  accepts_card_payment: boolean;

  @Column({ default: false })
  accepts_check_payment: boolean;

  @Column({ default: false })
  accepts_cash_payment: boolean;

  @Column({ default: false })
  accepts_bolt_app: boolean;

  @Column({ default: false })
  accepts_bolt_cash: boolean;

  @Column({ default: false })
  accepts_bolt_card: boolean;

  @Column({ default: false })
  accepts_heetch_app: boolean;

  @Column({ default: false })
  accepts_heetch_cash: boolean;

  @Column({ default: false })
  accepts_heetch_card: boolean;

  @Column({ default: false })
  accepts_uber_app: boolean;

  @Column({ default: false })
  accepts_uber_cash: boolean;

  @Column({ default: false })
  accepts_uber_card: boolean;

  @Column({ default: false })
  accepts_taxi_vert_cash: boolean;

  @Column({ default: false })
  accepts_taxi_vert_app: boolean;

  @Column({ default: false })
  accepts_taxi_vert_card: boolean;

  // ✅ Timestamps
  @CreateDateColumn()
  created_at: Date;
}
