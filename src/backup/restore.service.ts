import { Injectable } from '@nestjs/common';
import * as MysqlTools from 'mysql-tools';
import * as fs from 'node:fs';
import mysql from 'mysql2/promise';

@Injectable()
export class RestoreService {
  private tool = new MysqlTools({
    mysqlCmd: 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql',
    mysqldumpCmd: 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump',
  });

  /* async restoreDatabaseDump(filePath) {
    try {
      // Leer el archivo de volcado
      const dumpContent = fs.readFileSync('C:\\xampp\\htdocs\\localsites\\sgi5\\backup\\dump_2024-06-18-san_expedito_dump.sql', 'utf8');

      // Crear la conexión a la base de datos
      const connection = await mysql.createConnection({ host: 'localhost', database: 'san_expedito', user: 'develop', password: 'develop2024*', port: 3306 });

      // Ejecutar las sentencias del archivo de volcado
      await connection.query(dumpContent);

      console.log('Restauración del dump completada correctamente.');

      // Cerrar la conexión
      await connection.end();
    } catch (error) {
      console.error('Error al restaurar el dump:', error);
      throw error; // Manejar o relanzar el error según sea necesario
    }
  }*/

  async restoreDatabaseDump(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tool.restoreDatabase(
        {
          host: 'localhost',
          user: 'develop',
          password: 'develop2024*',
          sqlFilePath: 'C:\\xampp\\htdocs\\localsites\\sgi5\\backup\\dump_2024-06-18-san_expedito_dump.sql',
          database: 'san_expedito',
        },
        (error, output, message) => {
          if (error instanceof Error) {
            console.log('Error al restaurar el dump:', error);
            reject(error);
          } else {
            console.log('Output:', output);
            console.log('Message:', message);
            resolve();
          }
        },
      );
    });
  }
}
