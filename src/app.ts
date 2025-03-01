import express, { Application } from "express";
import dotenv from 'dotenv';
import {default as userRouter} from  './users/user.router';
import {default as boardsRouter} from  './boards/boards.router';
import {default as feedbackRouter} from  './feedback-posts/feedback-posts.router';
import {default as upvotesRouter} from  './upvotes/upvotes.router';


import path from "path";

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/feedback', feedbackRouter);
app.use('/upvote', upvotesRouter);


app.listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
})