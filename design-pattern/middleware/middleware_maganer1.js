const DataPipeline = require("./data_pipeline");

class middleware_manager {
  constructor() {
    this.middlewares = [];
  }

  process(data = {}) {
    const dataPipeline = new DataPipeline(this.middlewares, data);
    dataPipeline.dispatch();
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }
}

module.exports = middleware_manager;
