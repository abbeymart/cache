/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-05-21 | @Updated: 2019-05-21
 * @Company: mConnect.biz | @License: MIT
 * @Description: @mconnect/cache testing, simple cache
 */

const {suite, test, before} = require('mocha');

const {cacheData} = require('../index');
const {sleep, ok} = require('./helpers');

let cacheKey,
    cacheValue,
    expiryTime = 5; // in seconds

before(() => {
    cacheKey   = {
        code: 'test',
        res : 'testing',
    };
    cacheValue = {
        firstName: "abc",
        lastName : 'xyz',
    };
});

suite('@mconnect/cacheData package Testing: ', () => {
    suite('Positive testing, default options:', () => {
        test('should set and return valid cacheValue', () => {
            const setCache = cacheData.setCache(cacheKey, cacheValue, expiryTime);
            let res;
            if (setCache) {
                res = cacheData.getCache(cacheKey)['value'];
            }
            ok(JSON.stringify(res) === JSON.stringify(cacheValue), `response should be: ${JSON.stringify(cacheValue)}`);
        });
        test('should clear cache and return null/empty value', () => {
            cacheData.clearCache();
            const res = cacheData.getCache(cacheKey);
            ok(res === null, `response should be: null`);
        });
    });
    suite('Positive testing, for set options:', () => {
        test('should set and return valid cacheValue -> before timeout/expiration)', () => {
            // set redis-cache expiry time to 5 seconds
            expiryTime     = 2;
            const setCache = cacheData.setCache(cacheKey, cacheValue, expiryTime);
            let res;
            if (setCache) {
                res = cacheData.getCache(cacheKey)['value'];
            }
            ok(JSON.stringify(res) === JSON.stringify(cacheValue), `response should be: ${JSON.stringify(cacheValue)}`);
        });
        test('should return null value after timeout/expiration', async () => {
            await sleep(3000);
            const res = cacheData.getCache(cacheKey);
            ok(res === null, `response should be: null`);
        });
    });
});
