import express from 'express';
import router from './router.ts';
import db from './config/db.ts';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions} from './config/swagger.ts';

// Initialize database connection
export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        //console.log(colors.blue('Conexion existosa a la BD'));        
    } catch (error) {
        //console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a la BD'));
    }
}
connectDB();

// Create Express server
const server = express();

// leer JSON
server.use(express.json());

server.use('/api/products', router);

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions));

export default server;