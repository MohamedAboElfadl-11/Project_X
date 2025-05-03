import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { UserData } from '../Models/user.model';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  serviceName: 'orcl',
  synchronize: false,
  logging: false,
  entities: [UserData],
  migrations: [],
  subscribers: [],
});

export const database_connection = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to Oracle DB successfully ✅');
  } catch (error) {
    console.error('Error while connecting to Oracle DB:', error);
    throw error;
  }
};
