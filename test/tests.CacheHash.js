/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-05-21 | @Updated: 2019-05-21
 * @Company: mConnect.biz | @License: MIT
 * @Description: @mconnect/cache testing, hash cache
 */

const {suite, test, before} = require('mocha');

const {cacheHash} = require('../index');
const {sleep, ok} = require('./helpers');

let cacheKey,
    cacheValue,
    hashKey,
    hashInfo,
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

    hashKey = {
        code: 'hash-test',
        res : 'hash-testing',
    };

    hashInfo = {
        key  : hashKey,
        value: cacheValue,
    };
});

suite('@mconnect/cacheHash package Testing: ', () => {
    suite('Positive testing, default options:', () => {
        test('should set and return valid cacheValue', () => {
            const setCache = cacheHash.setCache(cacheKey, hashInfo, expiryTime);
            let res;
            if (setCache) {
                res = cacheHash.getCache(cacheKey, hashKey)['value'];
            }
            ok(JSON.stringify(res) === JSON.stringify(cacheValue), `response should be: ${JSON.stringify(cacheValue)}`);
        });
        test('should clear(by key) and return null/empty value', () => {
            cacheHash.clearCache();
            const res = cacheHash.getCache(cacheKey, hashKey);
            ok(res === null, `response should be: null`);
        });
    });
    suite('Positive testing, for set options:', () => {
        test('should set and return valid cacheValue -> before timeout/expiration)', () => {
            // set redis-cache expiry time to 5 seconds
            expiryTime     = 2;
            const setCache = cacheHash.setCache(cacheKey, hashInfo, expiryTime);
            let res;
            if (setCache) {
                res = cacheHash.getCache(cacheKey, hashKey)['value'];
            }
            ok(JSON.stringify(res) === JSON.stringify(cacheValue), `response should be: ${JSON.stringify(cacheValue)}`);
        });
        test('should return null value after timeout/expiration', async () => {
            await sleep(3000);
            const res = cacheHash.getCache(cacheKey, hashKey);
            // console.log('timeout-value: ', res);
            ok(res === null, `response should be: null`);
        });
    });
});
