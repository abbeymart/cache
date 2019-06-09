/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-05-19 | @Updated: 2019-06-09
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-cache-hash
 */

let mcCacheHash = {};

module.exports = {
    setCache(key = '', hash = {}, expire = 300) {
        try {
            // key and value
            let hashKey   = hash && hash.key ? hash.key : key;
            let hashValue = hash && hash.value ? hash.value : '';

            if (!key || !hashKey || !hash.value) return false;

            // stringify key-params
            const mainKey = JSON.stringify(key);
            hashKey       = JSON.stringify(hashKey);

            if (!mcCacheHash[mainKey]) {
                mcCacheHash[mainKey] = {};
            }

            mcCacheHash[mainKey][hashKey] = {
                'value' : hashValue,
                'expire': Date.now() + expire * 1000,
            };
            return true;
        } catch (e) {
            console.log('error setting cache: ', e);
            return false;
        }
    },

    getCache(key = '', hashKey = '') {
        // console.log('mc-cache-content: ', mcCacheHash);
        try {
            // validate params, both are required
            if (!key || !hashKey) return null;

            // stringify key-params
            const mainKey      = JSON.stringify(key);
            const cacheHashKey = JSON.stringify(hashKey);

            // cases: valid/not-expired, expired, not available/unknown
            if (mcCacheHash[mainKey] && mcCacheHash[mainKey][cacheHashKey] && mcCacheHash[mainKey][cacheHashKey]['expire'] > Date.now()) {
                return mcCacheHash[mainKey][cacheHashKey];
            }

            if (mcCacheHash[mainKey] && mcCacheHash[mainKey][cacheHashKey]) {
                delete mcCacheHash[mainKey][cacheHashKey];
            }

            return null;
        } catch (e) {
            console.log('error getting cache: ', e);
            return null;
        }
    },

    deleteCache(key = '', hashKey = '') {
        try {
            // validate params, at least one is required
            if (!key && !hashKey) return false;

            // stringify key-params
            const mainKey      = JSON.stringify(key);
            const cacheHashKey = JSON.stringify(hashKey);

            // cases: available/deleted (by key/hashKey), not-available/not-deleted
            if (mainKey && cacheHashKey) {
                // delete by hashKey
                if (mcCacheHash[mainKey] && mcCacheHash[mainKey][cacheHashKey]) {
                    delete mcCacheHash[mainKey][cacheHashKey];
                    return true;
                }
            }

            if (mainKey) {
                // delete by mainKey
                if (mcCacheHash[mainKey]) {
                    delete mcCacheHash[mainKey];
                    return true;
                }
            }

            return false;
        } catch (e) {
            console.log('error deleting cache: ', e);
            return false;
        }
    },

    clearCache() {
        try {
            mcCacheHash = {};
            return true;
        } catch (e) {
            console.log('error clearing cache: ', e);
            return false;
        }
    },
};
