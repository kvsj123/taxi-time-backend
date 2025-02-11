import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { ChauffeursService } from './chauffeurs.service';
import { CreateChauffeurDto } from './create-chauffeur.dto';
import { UpdateChauffeurDto } from './update-chauffeur.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';
import { validate } from 'class-validator';

@Controller('chauffeurs')
export class ChauffeursController {
  constructor(private readonly chauffeursService: ChauffeursService) {}

  // ✅ Create Chauffeur with Multiple File Uploads
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'id_card', maxCount: 1 },
      { name: 'driver_license_photo', maxCount: 1 },
      { name: 'bank_card_photo', maxCount: 1 },
      { name: 'contract_photo', maxCount: 1 },
    ])
  )
  async create(
    @Body() createChauffeurDto: CreateChauffeurDto,
    @UploadedFiles()
    files: {
      id_card?: MulterFile[];
      driver_license_photo?: MulterFile[];
      bank_card_photo?: MulterFile[];
      contract_photo?: MulterFile[];
    }
  ) {
    console.log("📥 Received DTO:", createChauffeurDto);
    console.log("📂 Received Files:", files);

    // Extract files correctly
    const idCardFile = files.id_card?.[0];
    const driverLicenseFile = files.driver_license_photo?.[0];
    const bankCardFile = files.bank_card_photo?.[0];
    const contractFile = files.contract_photo?.[0];

    console.log("📂 Extracted Files:", { idCardFile, driverLicenseFile, bankCardFile, contractFile });

    return this.chauffeursService.create(
      createChauffeurDto,
      idCardFile,
      driverLicenseFile,
      bankCardFile,
      contractFile
    );
  }



  @Get()
  async findAll() {
    return await this.chauffeursService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.chauffeursService.findOne(id);
  }

  @Put(":id")
@UseInterceptors(
  FileFieldsInterceptor([
    { name: "id_card", maxCount: 1 },
    { name: "driver_license_photo", maxCount: 1 },
    { name: "bank_card_photo", maxCount: 1 },
    { name: "contract_photo", maxCount: 1 },
  ])
)
async update(
  @Param("id") id: string,
  @Body() updateChauffeurDto: UpdateChauffeurDto,
  @UploadedFiles()
  files: {
    id_card?: MulterFile[];
    driver_license_photo?: MulterFile[];
    bank_card_photo?: MulterFile[];
    contract_photo?: MulterFile[];
  }
) {
  console.log(`🚀 Updating chauffeur with ID: ${id}`);
  console.log(`📥 Received DTO:`, updateChauffeurDto);
  console.log(`📂 Received Files:`, files);

  // Extract uploaded files
  const idCardFile = files.id_card?.[0];
  const driverLicenseFile = files.driver_license_photo?.[0];
  const bankCardFile = files.bank_card_photo?.[0];
  const contractFile = files.contract_photo?.[0];

  console.log("📂 Extracted Files:", { idCardFile, driverLicenseFile, bankCardFile, contractFile });

  return this.chauffeursService.update(
    id,
    updateChauffeurDto,
    idCardFile,
    driverLicenseFile,
    bankCardFile,
    contractFile
  );
}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.chauffeursService.remove(id);
  }
}