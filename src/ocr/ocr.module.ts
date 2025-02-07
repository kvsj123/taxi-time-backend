import { Module } from "@nestjs/common";
import { OCRService } from "./ocr.service";
import { OCRController } from "./ocr.controller";

@Module({
  controllers: [OCRController],
  providers: [OCRService],
})
export class OCRModule {}
