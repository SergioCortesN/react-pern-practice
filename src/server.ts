import express from 'express';
import router from './router.ts';
import db from './config/db.ts';
import colors from 'colors';

// Initialize database connection
async function connectDB() {
    try {
        await db.authenticate();
        console.log('Modelos cargados:', Object.keys(db.models)); // ← Verifica esto
        await db.sync();
        console.log(colors.green.bold('Database connection established & tables synced'));        
    } catch (error) {
        console.log(colors.red.bold('Unable to connect to the database:'));
        console.log(error);
    }
}
connectDB();

// Create Express server
const server = express();

// leer JSON
server.use(express.json());

server.use('/api/products', router);

export default server;