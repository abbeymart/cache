/**
 * @Author: abbeymart | Abi Akindele | @Created: 2019-05-22 | @Updated: 2019-05-22
 * @Company: mConnect.biz | @License: MIT
 * @Description: mc-test, helper functions
 */

function sleep( ms ) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// test handler function | preferred - elegant/flexible - for handling different/simple cases
function ok( expr, msg ) {
    if ( ! expr ) {
        throw new Error(msg);
    }
}

module.exports = {sleep, ok};
