/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-05-19 | @Updated: 2019-05-22
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-cache
 */

let mcCache           = {};

module.exports = {
    setCache(key = '', value = '', expire = 300) {
        // key and value: key:string, value:string, expire:time(seconds)
        try {
            if (!key || !value) return false;

            // stringify key-params
            key      = key.toString();
            mcCache[key] = {
                'value' : value,
                'expire': Date.now() + expire * 1000,
            };
            return true
        } catch (e) {
            console.log('error setting cache: ', e);
            return false;
        }
    },

    getCache(key = '') {
        try {
            // validate params, both are required
            if (!key) return null;

            // stringify key-params
            key      = key.toString();

            // cases: valid/not-expired, expired, not available/unknown
            if (mcCache[key] && mcCache[key]['expire'] > Date.now()) {
                return mcCache[key];
            }

            if (mcCache[key]) {
                delete mcCache[key];
            }

            return null;
        } catch (e) {
            console.log('error getting cache: ', e);
            return null;
        }
    },

    deleteCache(key = '') {
        try {
            // validate params
            if (!key) return false;

            // stringify key-params
            key      = key.toString();

            // cases: available/deleted, not-available/not-deleted
            if (mcCache[key]) {
                delete mcCache[key];
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
            mcCache = {};
            return true;
        } catch (e) {
            console.log('error clearing cache: ', e);
            return false;
        }
    },
};
