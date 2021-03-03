'use strict';
const urlParse = require('url-parse');
const dbHandle = require('./Database/connect');
const UrlNode = dbHandle.model('UrlNode', require('./Schemas/UrlNode'));
const Request = dbHandle.model('Request', require('./Schemas/Request'));

/**
 * Creates a new request if UrlNode does not exist 
 * or updates request's Priority if UrlNode exists
 * or returns UrlNode if UrlNode is visited
 * @param {String} rawUrl
 * 
 */

const updateRequest = (rawUrl) => {
    const Url = urlParse(rawUrl);
    const protocol = Url.protocol;
    const hostname = Url.hostname;
    const path = Url.path || '/';
    console.log(protocol, hostname, path);
    urlNodeExists({protocol,hostname,path})
    .then(([exists,visited, urlObj]) => {
        //console.log(`exist, visited, urlObj - ${exists} ${visited} ${urlObj}`);
        if(exists) {
            //Update Priority if !visited
            if(!visited){
                const nodeId = urlObj.id;
                Request.updateOne({
                    nodeId : nodeId
                }, {
                    $inc : {
                        priority : 1
                    }
                }).then(res => {
                    console.log(`Priority Updated ${res.ok}`);
                    return true;
                })
                .catch(e => {
                    console.error(e);
                    return null;
                })
            }
            else{
                //Delete Request
                Request.deleteOne({
                    nodeId : urlObj.id,
                }).then(res => {
                    console.log(`Request Crawled, hence deleted`);
                    return true;
                })
                .catch(e => {
                    console.error(e);
                    return null;
                })
            }
        }
        else{
            //Create URL Node and Create Request
            createUrlNode({protocol,hostname,path})
            .then(urlId => {
                createNewRequest(urlId)
                .then(reqId => {
                    return reqId;
                })
            })
            .catch(e => {
                console.error(e);
            });
        }
    })
    .catch(e => {
        console.error(e);
        return null;
    });
}

const createNewRequest = async (nodeId) => {
    const req = new Request({
        nodeId: nodeId,
    });

    try {
        const newRequest = await req.save();
        console.log(`newRequest Id : ${newRequest.id}`);
        return newRequest.id;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const createUrlNode = async ({protocol, hostname, path}) => {
    const node = new UrlNode({
        protocol: protocol,
        hostname: hostname,
        path: path,
    });

    try{
        const newNode = await node.save();
        console.log(`New UrlNode ID : ${newNode.id}`);
        return newNode.id;
    } catch (e) {
        console.error(e);
        return null;
    }
}


const urlNodeExists = async ({protocol, hostname, path}) =>{
    /**
     * returns [exists, isVisted]
     */
    try{
        //Find UrlNode matching {protocol, hostname, path}
        const urlnode = await UrlNode.findOne({
            'protocol':protocol,
            'hostname':hostname,
            'path':path
        }).exec();
        //console.log(urlnode);
        if(urlnode === null){
            return [false,false];
        }
        else{
            return [true,urlnode.isVisited, urlnode];
        }
    } catch (e) {
        console.error(e);
        //error occured
        return [false,true];
    }

}

module.exports = updateRequest;