import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();
const { DBNAME, DBUSER, DBHOST, DBPASS } = process.env;

export const sequelize = new Sequelize(`postgres://${DBUSER}:${DBPASS}@${DBHOST}/${DBNAME}`,{
    logging: false
});
