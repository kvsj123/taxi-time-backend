import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ChauffeursService } from './chauffeurs.service';
import { CreateChauffeurDto } from './create-chauffeur.dto';
import { UpdateChauffeurDto } from './update-chauffeur.dto';

@Controller('chauffeurs')
export class ChauffeursController {
  constructor(private readonly chauffeursService: ChauffeursService) {}

  @Post()
  async create(@Body() createChauffeurDto: CreateChauffeurDto) {
    try {
      return await this.chauffeursService.create(createChauffeurDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return await this.chauffeursService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.chauffeursService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateChauffeurDto: UpdateChauffeurDto) {
    return await this.chauffeursService.update(id, updateChauffeurDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.chauffeursService.remove(id);
  }
}
