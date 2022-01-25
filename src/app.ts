import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan'
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB,connectTestDB} from "./database/memory"

import authRoute from './routes/auth';
import recipeRoute from './routes/recipe';
dotenv.config()

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

app.use(cors());

app.get('/', (req, res)=>{
  // res.status(200).sendFile(path.join(__dirname, '../views', '404.html'));
  res.render('404');
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoute);
app.use('/api/recipes', recipeRoute);


// connect db
if(process.env.NODE_ENV === 'test'){
  connectTestDB()
}else{
  connectDB()
}
console.log(process.env.NODE_ENV);

// connectDB()


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set('view engine', 'ejs')


// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

export default app;