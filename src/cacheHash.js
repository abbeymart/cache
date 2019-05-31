/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-05-19 | @Updated: 2019-05-22
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-cache-hash
 */

let mcCacheHash = {};

module.exports = {
    setCache(key = '', hash = {}, expire = 300) {
        try {
            // key and value
            hash.key   = hash && hash.key ? hash.key : key;
            hash.value = hash && hash.value ? hash.value : '';

            if (!key || !hash.key || !hash.value) return false;

            // stringify key-params
            key      = key.toString();
            hash.key = hash.key.toString();

            mcCacheHash[key] = {};

            mcCacheHash[key][hash.key] = {
                'value' : hash.value,
                'expire': Date.now() + expire * 1000,
            };
            return true;
        } catch (e) {
            console.log('error setting cache: ', e);
            return false;
        }
    },

    getCache(key = '', hashKey = '') {
        try {
            // validate params, both are required
            if (!key || !hashKey) return null;

            // stringify key-params
            key     = key.toString();
            hashKey = hashKey.toString();

            // cases: valid/not-expired, expired, not available/unknown
            if (mcCacheHash[key] && mcCacheHash[key][hashKey] && mcCacheHash[key][hashKey]['expire'] > Date.now()) {
                return mcCacheHash[key][hashKey];
            }

            if (mcCacheHash[key] && mcCacheHash[key][hashKey]) {
                delete mcCacheHash[key][hashKey];
            }

            return null;
        } catch (e) {
            console.log('error getting cache: ', e);
            return null;
        }
    },

    deleteCache(key = '', hashKey = '', by = 'hashKey') {
        try {
            // validate params, at least one is required
            if (!key && !hashKey) return false;

            // stringify key-params
            key     = key.toString();
            hashKey = hashKey.toString();

            // cases: available/deleted (by key/hashKey), not-available/not-deleted
            if (key && by === 'key') {
                // delete by key
                delete mcCacheHash[key];
                return true;
            }

            if (key && hashKey && by === 'hashKey') {
                // delete by hashKey
                delete mcCacheHash[key][hashKey];
                return true;
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
