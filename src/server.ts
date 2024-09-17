import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cors from 'cors';
import { env } from './environments/Env';
import Routes from './routes/Routes';
// import { I18n } from 'i18n';
import LoggingService from "./services/Logger/LoggingService"
import { ReqInterface, ResInterface } from './interfaces/RequestInterface';
import { NextFunction } from "express"
import rateLimit from 'express-rate-limit'
export class Server {
  public app: express.Application = express();

  constructor() {
    console.log('environment', process.env.NODE_ENV);
    this.setConfigurations();
    // this.rateLimitng();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.setMongodb();
    this.enableCors();
    this.configBodyParser();
    // this.setLanguage();
  }

  // setLanguage() {
  //   const localePath = path.resolve(process.cwd() + '/assets/locales');
  //   const i18n = new I18n({
  //     locales: ['en', 'fr'],
  //     directory: localePath
  //   });
  //   this.app.use(i18n.init);
  // }


  setMongodb() {
    mongoose.connect(env().dbUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Database connected");
    }).catch((e) => {
      console.log(e);
      LoggingService.critical(e)
      console.log('failed');
    })
  }

  enableCors() {
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
  }

  configBodyParser() {
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(express.json({ limit: '10mb' }));
  }

  setRoutes() {
    this.app.use((req: ReqInterface, res: ResInterface, next: express.NextFunction) => {
      res.startTime = new Date().getTime();
      res.api = req.url;
      res.method = req.method;
      console.log(`Api ==> ${req.url}  ${req.method}`);
      console.log('request-body', req.body);
      next();
    });
    this.app.use('/api-doc', express.static(path.resolve(process.cwd() + '/assets/apidoc/')));
    this.app.use('/api/documents', express.static('./assets/images/'));
    this.rateLimitng();
    this.app.use('/api/v1', Routes)
    this.app.use('/test', (req, res, next) => {
      res.status(200).json({ msg: "Hello Bro" })
    })
  }

  error404Handler() {
    this.app.use((req: ReqInterface, res: ResInterface) => {
      res.status(404).json({
        message: 'Route not found test',
        status: 404
      });
    })
  }

  rateLimitng() {
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 15 minutes
      max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
    this.app.use(limiter)
  }

  handleErrors() {
    this.app.use((error: any, req: ReqInterface, res: ResInterface, next: NextFunction) => {
      const errorStatus = req.errorStatus;
      res.status(errorStatus || 500).json({
        message: error.message || 'Something went wrong!!',
        statusText: error.statusText || "ERROR",
        status: errorStatus || 500,
        data: {}
      })
    })
  }
}