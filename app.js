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

// init server
const app = express();
const port = process.env.PORT || 3000;

// dependencies
const logger = new WinstonLogger();
const metric = new PrometheusMetric();
const db = new MongoDb();
(async () => {
    try {
        await db.init();
				logger.info('Database successfully connected');
    } catch(err) {
        logger.error(err);
    }
})();
const profileRepository = new ProfileRepository();
const commentRepository = new CommentRepository();
const profileSeeder = new ProfileSeeder(profileRepository);
(async () => {
    try {
        await profileSeeder.init();
				logger.info('Seeder successfully running');
    } catch(err) {
        logger.error(err);
    }
})();
const profileUsecase = new ProfileUsecase(profileRepository);
const commentUsecase = new CommentUsecase(commentRepository);
const profileHandler = new ProfileHandler(logger, profileUsecase);
const profileApiHandler = new ProfileApiHandler(logger, profileUsecase);
const commentApiHandler = new CommentApiHandler(logger, commentUsecase);

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDoc));
app.use('/metrics', metric.serve);
app.use(profileHandler.router);
app.use(profileApiHandler.router);
app.use(commentApiHandler.router);
app.use('/', (req, res) => {
	res.json({
		title: 'Welcome to Boo!',
	})
});

// start server
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
http.createServer(app).listen(port, () => {
    logger.info(`Server started on port ${port}`);
});
