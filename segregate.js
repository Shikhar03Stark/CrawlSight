'use strict';

/**
 * Segregates Link ojects into http(s) Internal and External based on hostname
 * @param {[]} links 
 * @returns {[internals, externals]}
 */
const segregateLinks = (links) => {
    let internals = [], externals = [];
    links.forEach((url) => {
        if(url.protocol === 'https:' || url.protocol === 'http:'){
            const hostname = `${url.protocol}//${url.host}`;
            if(url.isInternal){
                internals.push(`${hostname}${url.path}`);
            }
            else{
                externals.push(hostname);
            }
        }
    });

    return [internals, externals];
}

module.exports = segregateLinks;
