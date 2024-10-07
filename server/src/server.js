import { config } from 'dotenv';
config();
import express from 'express';
import morgan from 'morgan';
import { sequelize } from './database/database.js';
import { errHandler } from './middlewares/err_handler.js';
import './database/models.js'; ///Models ---> DON'T DELETE.
import userRouter from './routes/user_routes.js';
import characterRouter from './routes/character_routes.js';
import favoritesRouter from './routes/favorites_route.js';
import rateLimit from 'express-rate-limit';
import { saveCharactersOnDB } from './controllers/characters_controller.js';
import corsMiddleware from './middlewares/cors.js';

const app = express();
const ACCEPTED_ORIGINS = 'http'

app.use(express.json());
app.use(morgan('dev'));
app.use(corsMiddleware());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter)
app.use('/favorites', favoritesRouter);
app.use('/user', userRouter);
app.use('/characters', characterRouter);
app.use((req, res, next) => {
    res.status(404).json({
        sucess: false,
        message: 'Route not found'
    })
});
app.use(errHandler);

const port = process.env.PORT || 3000;
async function main() {
    try {
        
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        app.listen(port);
        console.log(`Server running ok on: http://localhost:${port}`)
        
        await sequelize.sync({ force: false })
        console.log('Re-sync done!');

        // await saveCharactersOnDB(); ---> To save characters in the database, uncomment.

    } catch (error) {
        console.error(error.message);
    }
}

main();
