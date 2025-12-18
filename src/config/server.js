import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;

const initServer = () => {
    const app = express();
    app.use(cors());
    app.use(json());
    return app;
};

export default initServer;