'use strict';

const { createLogger, transports, format } = require('winston');

class WinstonLogger {
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.json(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

module.exports = WinstonLogger;
