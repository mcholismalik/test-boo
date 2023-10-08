'use strict';

const client = require('prom-client');

class PrometheusMetric {
  constructor() {
    client.collectDefaultMetrics();
  }

  async serve(req, res, next) {
    res.set('Content-Type', client.register.contentType);
    return res.send(await client.register.metrics());
  }
}

module.exports = PrometheusMetric;