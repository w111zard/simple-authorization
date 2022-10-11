require('dotenv').config();
const express = require('express');
const router = require('./routers/index');
const sequelize = require('./database');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();