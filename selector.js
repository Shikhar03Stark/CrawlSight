"use strict";
const dbHandle = require('./Database/connect');
const Request = dbHandle.model('Request', require('./Schemas/Request'));

/**
 * Pick Top x elements based on Priority and FCFS
 */

const getCrwalNodes = (maxlimit) => {
    fetchTopRequests(maxlimit)
    .then(crawlNodes => {
        //console.log(`${crawlNodes}, ${crawlNodes.length}`);
        return crawlNodes;
    })
    .catch(err => {
        console.error(err);
        return [];
    })
};

const fetchTopRequests = async (maxlimit) => {
    try{
        const results = await Request.find({}).sort({'priority':-1, 'requestedOn':-1}).limit(maxlimit).exec();
        //Delete results from DB
        const requestId = [];
        results.forEach((request) => {
            requestId.push(request._id);
        });

        const response = await Request.deleteMany({
            _id : {
                $in : requestId
            }
        }).exec();

        if(response.ok === 1){
            //Array of UrlNode id,
            const urlNodes = [];
            results.forEach((request) => {
                urlNodes.push(request.nodeId);
            });

            return urlNodes;
        }
        else{
            console.error(`Error Deleteing Fetched Content`);
            return [];
        }

    }
    catch (err) {
        console.error(err);
        return [];
    }

}

module.exports = getCrwalNodes;