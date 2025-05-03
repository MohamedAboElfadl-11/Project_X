import express from 'express';
import { config } from 'dotenv';
import { database_connection } from './Config/db_connection.config';
import { controllerHandler } from './Utils/controller_handler.utils';


config()

const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3000;

controllerHandler(app);

(async () => {
    await database_connection()
})();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
