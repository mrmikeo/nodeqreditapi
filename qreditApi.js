/*
* A Promised NodeJS Module for connecting with the Qredit V2 API
*/

var request = require("request");

var qreditApi = /** @class */ (function () 
{

    function qreditApi(apiURL) 
    {
        if (apiURL === void 0)
            this.apiURL = 'https://qredit.cloud/api/v2';
        else
            this.apiURL = apiURL;
            
        return this;
    }
    
    qreditApi.prototype.getApiUrl = function ()
    {
    
        return this.apiURL;
    
    };
    
    /* Blockchain */
    
    qreditApi.prototype.getBlockChain = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/blockchain', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Blocks */
    
    qreditApi.prototype.getBlockHeight = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/blocks?limit=1', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }

                if (body && body.data && body.data[0].height && body.data[0].id)
                {
                
                    resolve(body.data[0].height);
                
                }
                else
                {
                
                    reject('No Data');
                
                }
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.listBlocks = function (page, limit)
    {

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/blocks?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getBlockByHeight = function (height)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/blocks/?height=' + height, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getBlockByID = function (id)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/blocks/' + id, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getTransactionsByBlockID = function (id)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/blocks/' + id + '/transactions', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.searchBlocks = function (page, limit, body)
    {

/*

Body Options:

** body is a json object

id                          string      ID of the block.
version                     int         Version of the block.
previousBlock               int         ID of the previous block.
payloadHash                 string      Hash of the payload.
generatorPublicKey          string      Public key of the forger who forged the block.
blockSignature              string      Signature of the block.
timestamp                   object      Timestamp range for block creation time. Measured in number of seconds since the genesis block.
timestamp.from              int         Block creation time must be bigger or equal to this.
timestamp.to                int         Block creation time must be smaller or equal to this.
height                      object      Height range of the block. The genesis block has height 1.
height.from                 int         Block height must be bigger or equal to this.
height.to                   int         Block height must be smaller or equal to this.
numberOfTransactions        object      Ranage for number of transactions contained in the block.
numberOfTransactions.from   int         The number of transactions in the block must be bigger or equal to this.
numberOfTransactions.to     int         The number of transactions in the block must be smaller or equal to this.
totalAmount                 object      Range for total amount transacted in the block, including block reward, transaction fees and transactions' amounts. In arktoshi.
totalAmount.from            int         Block total amount must be bigger or equal to this.
totalAmount.to              int         Block total amount must be smaller or equal to this.
totalFee                    object      Range for the sum of all transactions' fees in the block. In arktoshi.
totalFee.from               int         The sum of all transactions' fees in the block must be bigger or equal to this.
totalFee.to                 int         The sum of all transactions' fees in the block must be smaller or equal to this.
reward                      object      Range for block reward. In arktoshi.
reward.from                 int         Block reward must be bigger or equal to this.
reward.to                   int         Block reward must be smaller or equal to this.
payloadLength               object      Range for block payload length. In bytes.
payloadLength.from          int         Block payload length must be bigger or equal to this.
payloadLength.to            int         Block payload length must be smaller or equal to this.

*/

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.post(this.apiURL + '/blocks/search?' + querystring, {json:true, body: body}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Delegates */
    
        /* TODO */
        
    /* Node */
    
        /* TODO */
        
    /* Peers */
    
        /* TODO */
        
    /* Transactions */

    qreditApi.prototype.createTransaction = function (transactions)
    {
    
        /*
        
        transactions is an array of a single or multiple transaction objects
        
        */

        return new Promise((resolve, reject) => {
        
            request.post(this.apiURL + '/transactions', {json:true, body: { transactions: transactions}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getTransactionByID = function (id)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/transactions/' + id, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.listTransactions = function (page, limit, type, blockid, id)
    {
    
        /* 
        
            Inputs:
            
            page - int - optional
            limit - int - optional
            type - int - optional
            blockid - int - optional
            id - int optional
            
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (type !== undefined) querystring += 'type=' + type + "&";
        if (blockid !== undefined) querystring += 'blockId=' + blockid + "&";
        if (id !== undefined) querystring += 'id=' + id + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/transactions?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.searchTransactions = function (page, limit, body)
    {

/*

Body Options:

** body is a json object

orderBy         string  ...
id              string  ...
blockId         string  ...
type            int ...
version         int ...
senderPublicKey string  ...
senderId        string  ...
recipientId     string  ...
ownerId         string  ...
vendorFieldHex  string  ...
timestamp       object  ...
timestamp.from  int ...
timestamp.to    int ...
amount          object  ...
amount.from     int ...
amount.to       int ...
fee             object  ...
fee.from        int ...
fee.to          int ...
#

*/

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.post(this.apiURL + '/transactions/search?' + querystring, {json:true, body: body}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    
    return qreditApi;
    
}());

exports.default = qreditApi;
