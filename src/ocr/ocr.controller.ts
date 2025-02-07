import { Controller, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { OCRService } from "./ocr.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import { File as MulterFile } from 'multer'; // ✅ Corrected Import

@Controller("ocr")
export class OCRController {
  constructor(private readonly ocrService: OCRService) {}

  @Post("process")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    })
  )
  async processImage(@UploadedFile() file: MulterFile) {
    return this.ocrService.processImage(file);
  }
}
