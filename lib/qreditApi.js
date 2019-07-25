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

        /*
        
        (OPTIONAL)
        
        page	    int	        The number of the page that will be returned.
        limit	    int	        The number of resources per page.
        
        */
        
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

        /*
        
        (REQUIRED)
        
        height	    int	        The height of block.
        
        */
        
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

        /*
        
        (REQUIRED)
        
        id	    int	        The id of block.
        
        */
        
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

        /*
        
        (REQUIRED)
        
        id	    int	        The id of block.
        
        */
        
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

ALL BODY & QUERY ITEMS ARE OPTIONAL

Query Parameters:

page	                    int	        The number of the page that will be returned.
limit                       int	        The number of resources per page.

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
    
    qreditApi.prototype.listDelegates = function (page, limit, orderBy)
    {

        /*
        
        (OPTIONAL)
        
        page	    int	        The number of the page that will be returned.
        limit	    int	        The number of resources per page.
        orderBy	    string	    The column by which the resources will be sorted.
        
        orderBy valid fields:  username, rank, votes
        
        */
        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (orderBy !== undefined) querystring += 'orderBy=' + orderBy + "&";
        

        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/delegates?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    qreditApi.prototype.getDelegate = function (identifier)
    {
        
        /*
        
           (REQURIED)
        
            identifier  string  {username|address|publicKey}
            
        */

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/delegates/' + identifier, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getDelegateBlocks = function (identifier, page, limit)
    {
        
        /*

        Query Parameters:
        
        (OPTIONAL)

        page	                int	        The number of the page that will be returned.
        limit	                int	        The number of resources per page.

        (REQUIRED)
        
        identifier              string      {username|address|publicKey}
        
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/delegates/' + identifier + '/blocks?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getDelegateVoters = function (identifier, page, limit)
    {

        /*

        Query Parameters:
        
        (OPTIONAL)

        page	                int	        The number of the page that will be returned.
        limit	                int	        The number of resources per page.

        (REQUIRED)
        
        identifier              string      {username|address|publicKey}
        
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/delegates/' + identifier + '/voters?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
      
    qreditApi.prototype.searchDelegates = function (page, limit, body)
    {

/*

ALL BODY & QUERY ITEMS ARE OPTIONAL

Query Parameters:

page	                int	        The number of the page that will be returned.
limit	                int	        The number of resources per page.

Body Options:

** body is a json object

address	                string      The address of the delegate to be retrieved.
publicKey               string	    The public key of the delegate to be retrieved.
username	            string	    The username of the delegate to be retrieved.
usernames	            array	    The usernames of the delegates to be retrieved.
approval	            object	    The approval rate of the delegates to be retrieved.
approval.from	        float	    The lower limit of the approval rate.
approval.to	            float	    The upper limit of the approval rate.
forgedFees	            object	    The forged fees of the delegates to be retrieved.
forgedFees.from	        int	        The lower limit of the forged fees.
forgedFees.to	        int	        The upper limit of the forged fees.
forgedRewards	        object	    The forged rewards of the delegates to be retrieved.
forgedRewards.from	    int	        The lower limit of the forged rewards.
forgedRewards.to	    int	        The upper limit of the forged rewards.
forgedTotal	            object	    The forged total of the delegates to be retrieved.
forgedTotal.from	    int	        The lower limit of the forged total.
forgedTotal.to	        int	        The upper limit of the forged total.
producedBlocks	        object	    The produced blocks count of the delegates to be retrieved.
producedBlocks.from	    int	        The lower limit of the produced blocks count.
producedBlocks.to	    int	        The upper limit of the produced blocks count.
voteBalance	            object	    The vote balance of the delegates to be retrieved.
voteBalance.from	    int	        The lower limit of the vote balance.
voteBalance.to	        int	        The upper limit of the vote balance.

*/

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.post(this.apiURL + '/delegates/search?' + querystring, {json:true, body: body}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Node */
    
    qreditApi.prototype.getNodeConfig = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/node/configuration', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    qreditApi.prototype.getNodeCryptoConfig = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/node/configuration/crypto', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getNodeFees = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/node/fees', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getNodeStatus = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/node/status', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getNodeSyncStatus = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/node/syncing', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Peers */
    
    qreditApi.prototype.getPeers = function (page, limit, port, status, os, version, orderBy)
    {
        
        /*
        
        ALL QUERY ITEMS ARE OPTIONAL

        page	    int	        The number of the page that will be returned.
        limit	    int	        The number of resources per page.
        port	    int	        The port by which the resources will be filtered.
        status	    string	    The status by which the resources will be filtered.
        os	        string	    The operating system by which the resources will be filtered.
        version	    string	    The node version by which the resources will be filtered.
        orderBy	    string	    The column by which the resources will be sorted.

        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (port !== undefined) querystring += 'port=' + port + "&";
        if (status !== undefined) querystring += 'status=' + status + "&";
        if (os !== undefined) querystring += 'os=' + os + "&";
        if (version !== undefined) querystring += 'version=' + version + "&";
        if (orderBy !== undefined) querystring += 'orderBy=' + orderBy + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/peers?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }       
    
    qreditApi.prototype.getPeerByIP = function (ip)
    {
        
        /*
            ip      string  The IP address of the peer to be retrieved.  (REQURIED)
        */

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/peers/' + ip, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Transactions */

    qreditApi.prototype.createTransaction = function (transactions)
    {
    
        /*
        
        transactions is an array of a single or multiple signed transaction objects
        
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

        /* 
        
            Inputs:  (REQUIRED)
            
            id	    string	        The transaction id.
            
        */
        
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
    
    qreditApi.prototype.listTransactions = function (page, limit, type, blockId, id, orderBy)
    {
    
        /* 
        
            Inputs:  (ALL OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            type	    int	        The transaction type to be retrieved.
            blockId	    int	        The block id to be retrieved.
            id	        int	        The transaction id to be retrieved.
            orderBy	    string	    The column by which the resources will be sorted.
            
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (type !== undefined) querystring += 'type=' + type + "&";
        if (blockId !== undefined) querystring += 'blockId=' + blockId + "&";
        if (id !== undefined) querystring += 'id=' + id + "&";
        if (orderBy !== undefined) querystring += 'orderBy=' + orderBy + "&";

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
    
    qreditApi.prototype.listUnconfirmedTransactions = function (page, limit)
    {
    
        /* 
        
            Inputs:  (ALL OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/transactions/unconfirmed?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    qreditApi.prototype.getUnconfirmedTransactionByID = function (id)
    {

        /* 
        
            Inputs:  (REQUIRED)
            
            id	    string	        The transaction id.
            
        */
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/transactions/unconfirmed/' + id, {json:true}, function (error, response, body)
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

ALL BODY & QUERY ITEMS ARE OPTIONAL

Query Parameters:

page	                int	        The number of the page that will be returned.
limit	                int	        The number of resources per page.

Body Options:

** body is a json object

orderBy                 string      ...
id                      string      ...
blockId                 string      ...
type                    int         ...
version                 int         ...
senderPublicKey         string      ...
senderId                string      ...
recipientId             string      ...
ownerId                 string      ...
vendorFieldHex          string      ...
timestamp               object      ...
timestamp.from          int         ...
timestamp.to            int         ...
amount                  object      ...
amount.from             int         ...
amount.to               int         ...
fee                     object      ...
fee.from                int         ...
fee.to                  int         ...

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
    
    qreditApi.prototype.getTransactionTypes = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/transactions/types', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    qreditApi.prototype.getTransactionFees = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/transactions/fees', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Votes */
    
    
    /* Wallets */

    
    return qreditApi;
    
}());

exports.default = qreditApi;
