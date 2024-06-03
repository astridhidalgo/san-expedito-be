import { Body, Controller, Post } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreateFacturaDto } from '../facturas/dto/create-factura.dto';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  async generatePdf(@Body() createFacturaDto: CreateFacturaDto): Promise<{ url: string }> {
    console.log(createFacturaDto);
    return this.pdfService.generatePdf(createFacturaDto);
  }
}
