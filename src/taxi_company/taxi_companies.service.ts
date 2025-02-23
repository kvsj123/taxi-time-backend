import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxiCompany } from './taxi_company.entity';

@Injectable()
export class TaxiCompaniesService {
  constructor(
    @InjectRepository(TaxiCompany)
    private readonly taxiCompaniesRepository: Repository<TaxiCompany>,
  ) {}

  async create(data: Partial<TaxiCompany>): Promise<TaxiCompany> {
    const company = this.taxiCompaniesRepository.create(data);
    return this.taxiCompaniesRepository.save(company);
  }

  async findAll(): Promise<TaxiCompany[]> {
    return this.taxiCompaniesRepository.find();
  }

  async findOne(id: string): Promise<TaxiCompany | null> {
    return this.taxiCompaniesRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<TaxiCompany>): Promise<TaxiCompany | null> {
    await this.taxiCompaniesRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.taxiCompaniesRepository.delete(id);
  }
}
