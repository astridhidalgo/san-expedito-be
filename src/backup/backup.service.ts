import { Injectable } from '@nestjs/common';
import mysqldump from 'mysqldump';
import * as MysqlTools from 'mysql-tools';
import * as fs from 'node:fs';
import mysql from 'mysql2/promise';

@Injectable()
export class BackupService {
  private tool = new MysqlTools({
    mysqlCmd: 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql',
    mysqldumpCmd: 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump',
  });

  async dumpDatabase(dumpToFile?: string): Promise<void> {
    const connectionOptions = {
      host: 'localhost',
      user: 'develop',
      password: 'develop2024*',
      database: 'san_expedito',
    };

    const outputPath = 'C:\\xampp\\htdocs\\localsites\\sgi5\\backup\\';
    try {
      if (dumpToFile) {
        await mysqldump({
          connection: connectionOptions,
          dumpToFile: outputPath + dumpToFile,
        });
        console.log(`Database dumped to ${dumpToFile}`);
      } else {
        const result = await mysqldump({
          connection: connectionOptions,
        });
        console.log(result);
      }
    } catch (error) {
      console.error('Error dumping database:', error);
      throw error;
    }
  }
}
