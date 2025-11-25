import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product.model.ts';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL as string);

db.addModels([Product]);

export default db;