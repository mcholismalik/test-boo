const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class EnvConfig {
  constructor(logger) {
    this.logger = logger;
    this.environment = process.env.NODE_ENV || 'development';
    this.filename = path.join(__dirname, '../..', 'config', `${this.environment}.yaml`);
    return this.load();
  }

  load() {
    const fileContents = fs.readFileSync(this.filename, 'utf8');
    const config = yaml.load(fileContents);
    this.logger.info(`Config successfully loaded in env: ${this.environment}`)
    return config;
  }
}

module.exports = EnvConfig;
