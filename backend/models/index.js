import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import initUserModel from './User.js';

dotenv.config();

// Create a new Sequelize instance with database configurations
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
        logging: false,
        timestamps: true,
    },
});

// Initialize models
const User = initUserModel(sequelize);



// Export models and sequelize instance
export { sequelize, User};
export default sequelize;
