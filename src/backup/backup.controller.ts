import { Body, Controller, Post } from '@nestjs/common';
import { BackupService } from './backup.service';
import { RestoreService } from './restore.service';

@Controller('database')
export class BackupController {
  constructor(
    private readonly backupService: BackupService,
    private readonly restoreService: RestoreService,
  ) {}

  @Post('backup')
  async dumpDatabase() {
    try {
      const fechaActual = new Date();
      const dia = fechaActual.getDate().toString().padStart(2, '0');
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
      const año = fechaActual.getFullYear();
      const horas = fechaActual.getHours().toString().padStart(2, '0');
      const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
      const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

      const nombreDump = `${año}-${mes}-${dia}-${horas}-${minutos}-${segundos}-san_expedito_dump.sql`;
      await this.backupService.dumpDatabase(nombreDump);
      return { message: 'Database dumped successfully' };
    } catch (error) {
      return { error: 'Failed to dump database' };
    }
  }

  @Post('restore')
  async restoreDatabaseDump(@Body('nombre_archivo') nombre_archivo: string) {
    try {
      const url = 'C:\\xampp\\htdocs\\localsites\\sgi5\\backup\\' + nombre_archivo;
      console.log(url);
      await this.restoreService.restoreDatabaseDump();
      return { message: 'Database dumped successfully' };
    } catch (error) {
      return { error: 'Failed to dump database' };
    }
  }
}
