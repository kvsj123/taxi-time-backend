import { Injectable } from "@nestjs/common";
import * as Tesseract from "tesseract.js";
import * as fs from "fs";
import { File as MulterFile } from 'multer'; // ✅ Corrected Import

@Injectable()
export class OCRService {
  async processImage(file: MulterFile) {
    if (!file) {
      throw new Error("No file uploaded.");
    }

    const imagePath = file.path;

    try {
      // Perform OCR using Tesseract.js
      const { data } = await Tesseract.recognize(imagePath, "fra");
      const extractedText = data.text;

      console.log("OCR Extracted Text:", extractedText);

      // Extract structured values
      const structuredData = this.extractValues(extractedText);

      // Delete image after processing
      fs.unlinkSync(imagePath);

      return structuredData;
    } catch (error) {
      console.error("OCR Error:", error);
      throw new Error("Failed to process image.");
    }
  }

  private extractValues(text: string) {
    const lines = text.split("\n").map(line => line.trim());

    const data = {
      noLicence: "Not found",
      courses: "Not found",
      distCharge: "Not found",
      distTotale: "Not found",
      nbreChutes: "Not found"
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();

      if (line.includes("n° licence") || line.includes("no licence")) {
        data.noLicence = this.findNumber(lines, i);
      }
      if (line.includes("courses")) {
        data.courses = this.findNumber(lines, i);
      }
      if (line.includes("dist. charge")) {
        data.distCharge = this.findNumber(lines, i);
      }
      if (line.includes("dist. totale")) {
        data.distTotale = this.findNumber(lines, i);
      }
      if (line.includes("nbre chutes")) {
        data.nbreChutes = this.findNumber(lines, i);
      }
    }

    console.log("Structured Data:", data);
    return data;
  }

  private findNumber(lines: string[], index: number): string {
    const match = lines[index].match(/(\d+[.,]?\d*)/);
    if (match) return match[1];

    // If no number is found, check the next line
    if (index + 1 < lines.length) {
      const matchNext = lines[index + 1].match(/(\d+[.,]?\d*)/);
      if (matchNext) return matchNext[1];
    }

    return "Not found";
  }
}
