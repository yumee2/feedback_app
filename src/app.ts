import express, { Application } from "express";
import dotenv from 'dotenv';
import {default as userRouter} from  './users/user.router';
import {default as boardsRouter} from  './boards/boards.router';

import path from "path";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/users', userRouter);
app.use('/boards', boardsRouter);


app.listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
})