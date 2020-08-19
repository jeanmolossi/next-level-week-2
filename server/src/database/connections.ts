import path from 'path';
import { createConnection } from 'typeorm';

createConnection({
  type: 'sqlite',
  database: path.join(__dirname, 'database.sqlite'),
  entities: [path.join(path.resolve(__dirname, '..', 'entities'), '*.ts')],
});
