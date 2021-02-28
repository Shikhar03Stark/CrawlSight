'use strict';
const Crawler = require("crawler");
const fetchLinks = require('./parser');
const segregateLinks = require('./segregate');

const worker = new Crawler({
    //jQuery: jsdom,
    maxConnections: 10,
    callback: (err, res) => {
        if(err){
            console.error(err);
        }
        else{
            const $ = res.$;
            const links = fetchLinks($, res.request.uri);
            const [internal, external] = segregateLinks(links);
            console.log(external);
            worker.queue(external);
        }
    }
});

worker.queue(["https://www.facebook.com/"]);