/**
 * Tests if a given string is an URL or not
 * @function isUrl
 * @param {String} url
 * @returns {Boolean}
 */

const protocol = /^(?:\w+:)?\/\/(\S+)$/;

const localhost = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
const notLocalhost = /^[^\s\.]+\.\S{2,}$/;

function isUrl(url) {
    if (typeof url !== 'string') return new TypeError('Parameter "url" isn\'t a string');

    const match = url.match(protocol);
    if (!match) return false;

    const afterProtocol = match[0];
    if (!afterProtocol) return false;

    if (localhost.test(afterProtocol) || notLocalhost.test(afterProtocol)) return true;

    return false;
}

module.exports = isUrl;