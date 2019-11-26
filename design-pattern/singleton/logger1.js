class Logger {
    constructor() {
        this.cont = 0;
        this.config = {
            appName: 'Nome da Aplicação',
        }
    }

    setConfig(config) {
        this.config = config;
    }

    log(message, ...params) {
        this.cont++;

        console.log(this.config.appName, message, params);
    }
    
    getCont() {
        return this.cont;
    }
}

module.exports = new Logger();