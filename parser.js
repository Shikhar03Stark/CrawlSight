'use strict';
const urlParser = require('url-parse');

const fetchLinks = (jQuery, url) => {
    const $ = jQuery;
    //for each achor tag, object of URL
    let links = [];
    $("a").each((index, elem) => {

        const urlText = elem.attribs["href"];
        const Url = new urlParser(urlText);
        const host = (Url.hostname !== '') ? Url.hostname : url.hostname;
        const isInternal = (host === url.hostname) ? true : false;
        const path = Url.pathname;
        const protocol = Url.protocol;
        if(path !== ''){
            const urlObject = {
                protocol,
                host,
                path,
                isInternal
            };
    
            links.push(urlObject);
        }
    });

    return links;
}

module.exports = fetchLinks;