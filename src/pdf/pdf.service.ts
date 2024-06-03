import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from '../facturas/dto/create-factura.dto';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as pdf from 'html-pdf';
@Injectable()
export class PdfService {
  async generatePdf(htmlContent: CreateFacturaDto): Promise<any> {
    const datosFactura = {
      numeroFactura: htmlContent.numero_factura,
      cedula: htmlContent.cliente.cedula,
      nombre: htmlContent.cliente.nombre,
      apellido: htmlContent.cliente.apellido,
      items: htmlContent.productos.map((producto) => ({
        codigo: producto.codigo,
        item: producto.nombre,
        cantidad: producto.cantidad,
        precio: producto.precio,
        totalPorProducto: producto.totalPorProducto,
      })),
      total: htmlContent.total,
    };

    console.log(datosFactura);

    // Lee el contenido del archivo HTML de la plantilla
    const htmlTemplate = fs.readFileSync('src/pdf/factura.html', 'utf-8');

    // Compila la plantilla
    const template = Handlebars.compile(htmlTemplate);

    // Renderiza la plantilla con los datos de la factura
    const facturaHtml = template(datosFactura);

    // Guarda el HTML renderizado en un archivo
    fs.writeFileSync('factura.html', facturaHtml);

    const htmlFilePath = 'factura.html'; //ruta donde generara el html con los datos de la factura
    const options = { format: 'Letter' };

    //const outputPath = 'C:\\xampp\\htdocs\\factura.pdf'; //ruta original
    const outputPath = 'C:\\xampp\\htdocs\\localsites\\sgi5\\factura.pdf'; //ruta donde guardara el pdf
    await this.generatePdfFromFile(htmlFilePath, options, outputPath);
    return { url: 'file:///' + outputPath };
    //return { url: 'PDF generado exitosamente.' };
  }

  async generatePdfFromFile(htmlFilePath: string, options: pdf.CreateOptions, outputPath: string): Promise<string> {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    return this.generatePdfFromContent(htmlContent, options, outputPath);
  }

  async generatePdfFromContent(htmlContent: string, options: pdf.CreateOptions, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      pdf.create(htmlContent, options).toFile(outputPath, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.filename);
        }
      });
    });
  }
}
