import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { TaxiCompaniesService } from './taxi_companies.service';
import { TaxiCompany } from './taxi_company.entity';

@Controller('taxi-companies')
export class TaxiCompaniesController {
  constructor(private readonly taxiCompaniesService: TaxiCompaniesService) {}

  @Post()
  async create(@Body() data: Partial<TaxiCompany>): Promise<TaxiCompany> {
    return this.taxiCompaniesService.create(data);
  }

  @Get()
  async findAll(): Promise<TaxiCompany[]> {
    return this.taxiCompaniesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaxiCompany | null> {
    return this.taxiCompaniesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<TaxiCompany>): Promise<TaxiCompany | null> {
    return this.taxiCompaniesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.taxiCompaniesService.delete(id);
  }
}
