import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import homeRouter from '@routes/home';
import labsRouter from '@routes/labs';
import trendRouter from '@routes/trend';
import aboutRouter from '@routes/about';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `../config.env.${env}`) });

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // layout.ejs를 기본 레이아웃으로 설정

app.use('/', homeRouter);
app.use('/labs', labsRouter);
app.use('/trend', trendRouter);
app.use('/about', aboutRouter);

app.listen(port);

export default app;