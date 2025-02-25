import express, { Application } from "express";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;


app.listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
})