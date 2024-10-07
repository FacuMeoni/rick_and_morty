import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5173']

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if(!origin || acceptedOrigins.includes(origin)){
            return callback(null, true);
        } else {
            return callback(new Error(`Origin ${origin} Not allowed by Cors`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
});

export default corsMiddleware;