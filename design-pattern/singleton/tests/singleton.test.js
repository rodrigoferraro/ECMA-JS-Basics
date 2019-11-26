const assert = require('assert');
const Logger = require('../logger1');

describe('Singleton', () => {
    it('should use the same instance of Logger once its first call', () => {

        Logger.setConfig({
            appName: 'SingleApp'
        })

        const logThreeTimes = [1, 2, 3];
        logThreeTimes.forEach(function (times) {
            Logger.log('chamou ' + times);
        })

        assert.equal(Logger.getCont(), 3);
    })

})