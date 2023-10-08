'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { v4: uuidv4 } = require('uuid');

const WinstonLogger = require('./src/driver/winstonLogger');
const MongoDb = require('./src/driver/mongoDb');
const SwaggerDoc = require('./src/driver/swaggerDoc');
const ProfileRepository = require('./src/repository/profile');
const ProfileSeeder = require('./src/migration/profileSeeder');
const ProfileUsecase = require('./src/usecase/profile');
const ProfileHandler = require('./src/handler/profile');
const ProfileApiHandler = require('./src/handler/profileApi');
const CommentApiHandler = require('./src/handler/commentApi');
const CommentRepository = require('./src/repository/comment');
const CommentUsecase = require('./src/usecase/comment');
const PrometheusMetric = require('./src/driver/prometheusMetric');
const EnvConfig = require('./src/driver/envConfig');

// dependencies
const logger = new WinstonLogger();
const config = new EnvConfig(logger);
const metric = new PrometheusMetric(logger);
const swaggerDoc = new SwaggerDoc(config);
const db = new MongoDb();
const profileRepository = new ProfileRepository();
const commentRepository = new CommentRepository();
const profileSeeder = new ProfileSeeder(profileRepository);
const profileUsecase = new ProfileUsecase(profileRepository);
const commentUsecase = new CommentUsecase(commentRepository);
const profileHandler = new ProfileHandler(logger, profileUsecase);
const profileApiHandler = new ProfileApiHandler(logger, profileUsecase);
const commentApiHandler = new CommentApiHandler(logger, commentUsecase);

// init server
const app = express();
const port = process.env.PORT || config.port;

// views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
  const requestId = uuidv4();
  req.headers['x-request-id'] = requestId;
  res.setHeader('x-request-id', requestId);
  next();
});

// handlers
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc.getSpec()));
app.use('/metrics', metric.serve);
app.use(profileHandler.router);
app.use(profileApiHandler.router);
app.use(commentApiHandler.router);
app.use('/', (req, res) => {
  res.json({
    title: 'Welcome to Boo!',
  });
});

// start server
(async () => {
  try {
    await db.init();
    logger.info('Database successfully connected');
  } catch (err) {
    logger.error(err);
  }
  
  try {
    await profileSeeder.execute();
    logger.info('Seeder successfully executed');
  } catch (err) {
    logger.error(err);
  }
})
process.on('SIGINT', async () => {
  try {
    await db.close();
    logger.info('Database connection closed');
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
});
http.createServer(app).listen(port, async () => {
  logger.info(`Server started on port ${port}`);
});
