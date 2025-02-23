import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxiCompany } from './taxi_company.entity';
import { TaxiCompaniesService } from './taxi_companies.service';
import { TaxiCompaniesController } from './taxi_companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiCompany])],
  providers: [TaxiCompaniesService],
  controllers: [TaxiCompaniesController],
})
export class TaxiCompaniesModule {}
