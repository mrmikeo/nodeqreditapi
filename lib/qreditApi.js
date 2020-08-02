/*
* A Promised NodeJS Module for connecting with the Qredit V2 API
*/

const request = require("request");
const Big = require('big.js');

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
    
    qreditApi.prototype.listBlocks = function (page, limit, id, height, orderBy)
    {

        /*
        
            The Public API may be used to query for blocks. This dataset contains millions of blocks; thus for analytical purposes, we recommend you use the Elasticsearch plugin or query the database directly.
        
            (OPTIONAL)
        
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            id	        string	    The identifier of the block to be retrieved.
            height	    int	        The height of the block to be retrieved.
            orderBy	    string	    The column by which the resources will be sorted.

            The orderBy parameter supports the following values: id, height, previous_block, payload_hash, generator_public_key, timestamp

        */
        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (id !== undefined) querystring += 'id=' + id + "&";
        if (height !== undefined) querystring += 'height=' + height + "&";
        if (orderBy !== undefined) querystring += 'orderBy=' + orderBy + "&";

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
        
            request.get(this.apiURL + '/blocks?height=' + height, {json:true}, function (error, response, body)
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
        
            Instead of deserializing the block's payload; you can also obtain the transactions of each block as proper transaction objects directly.
        
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
        
            It is possible to filter for specifics blocks using the search resource. Filtering for blocks at the Node side is a lot more efficient than requesting a large payload and filtering it at the client side.

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
        
            You can obtain all Delegates through this paginated API. Note that all registered Delegates are returned in this response, not just the top 51 forging Delegates.

            If a Delegate Node is offline, it is still returned through this API; as the delegate resource is not concerned with the actual nodes, only with the on-chain registrations and wallets.

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
        
            You can query for a specific delegate by username, address, and public key; thus the following queries will result in an identical response. Note that public keys are always known for delegates, as they have previously transmitted a registration transaction. This is not the case for regular wallets.

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
        
            The delegate resource allows you to obtain blocks from a specific Delegate. This is the equivalent of searching for blocks using the generatorPublicKey.

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
        
            Obtaining the voters of a Delegate is trivial as well. This endpoint returns active voters. To acquire historical voters, it is better to query the database directly.

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

            For fine-grained searches, use the search endpoint.

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
        
        /*
        
            Used to access a Node's configuration and the network it is attached to (identified by the nethash).
            
        */

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
        
        /*
        
            Used to access a Node's configuration for the @qredit/crypto package that handles all cryptography operations.

        */

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
    
    qreditApi.prototype.getNodeFeeStats = function ()
    {
        
        /*
        
            Used to access a Node's fee statistics.

        */

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
        
        /*
        
            The status allows for health checking, showing if the node is in sync with the network.

        */
        
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
        
        /*
        
             The syncing resource is very much alike node/status, providing information on the syncing progress. If a node is not syncing but significantly behind in blocks, it might be time to perform a check.

        */

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
        
            Returns all peers known by the Node. These are not necessarily all peers; only public Nodes appear here.
        
            Inputs:  (OPTIONAL)

            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            port	    int	        The port by which the resources will be filtered.
            status	    string	    The status by which the resources will be filtered.
            os	        string	    The operating system by which the resources will be filtered.
            version	    string	    The node version by which the resources will be filtered.
            orderBy	    string	    The column by which the resources will be sorted.
            
            The orderBy parameter supports the following value: version

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
        
            Specific peers can be found by IP address. Note that a peer may have their Public API disabled, and thus they are only reachable by the internal p2p API.

            Inputs:  (REQUIRED)
            
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
        
            Creating the correct payload for a transaction is non-trivial, as it requires cryptographic functions and a specific serialization protocol. Our crypto SDKs provide the functionality needed in most major programming languages. https://www.github.com/qredit/

            Inputs:  (REQUIRED)
        
            transactions    array       an array of a single or multiple signed transaction objects
        
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
        
            Obtaining a transaction by ID does not require advanced logic; as the API does not return a serialized transaction, but a nicer DTO.
        
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
        
            The paginated API is used to query for multiple transactions. You can apply filters through the query parameter to search for specific transactions.
        
            Inputs:  (ALL OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            type	    int	        The transaction type to be retrieved.
            blockId	    int	        The block id to be retrieved.
            id	        int	        The transaction id to be retrieved.
            orderBy	    string	    The column by which the resources will be sorted.
            
            The orderBy parameter supports the following values: id, block_id, type, version, timestamp, amount, fee
            
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
        
            Unconfirmed transactions have not been incorporated in the blockchain, but reside in the mempool. Although usually the mempool is cleared within minutes, during high network load a transaction with a low fee will live here for a considerable time. If you have set the transaction with a fee of near zero, it might not be picked up by a Delegate and will time out.
        
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
        
            As with confirmed transactions, you may query for unconfirmed transactions directly.
        
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

            For fine-grained searches, use the search endpoint. Note that unless you use specific body parameters, the response might contain a large number of transactions (hundreds of thousands). It is best to filter as many transactions node side, instead of dissecting the response client side.

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
        
        /*
        
            The transaction types are network specific. Qredit currently supports eight different types, but BridgeChains may define more or less if needed for their business purpose.

        */

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
        
        /*
        
            NOTE: This only returns NON-DYNAMIC Fees
            
            The static transaction fees are significantly higher than the dynamic transaction fees. Use the node resource to find dynamic fees, and prefer using these.
   
        */

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
    
    qreditApi.prototype.listVotes = function (page, limit, orderBy)
    {
    
        /* 
        
            All voting transactions may be obtained through this API. This is the equivalent of transactions/search with the body parameter type: 3.
        
            Inputs:  (ALL OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            orderBy	    string	    The column by which the resources will be sorted.
            
            The orderBy parameter supports the following values: id, blockId, fee, sender, senderPublickey, recipient, confirmations, timestamp
            
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (orderBy !== undefined) querystring += 'orderBy=' + orderBy + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/votes?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getVoteByID = function (id)
    {

        /* 
        
            Votes may be retrieved using their transaction ID. Note the asset field, which contains the votes object. The first character of each item in the array indicates if it was a vote: +, or unvote: -, followed by the public key of the Delegate.
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the vote to be retrieved
            
        */
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/votes/' + id, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    /* Wallets */
    
    qreditApi.prototype.listWallets = function (page, limit, orderBy)
    {
    
        /* 
        
            A paginated API is provided to obtain all wallets, including empty ones.
        
            Inputs:  (ALL OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            orderBy	    string	    The column by which the resources will be sorted.
            
            The orderBy parameter supports the following values: address, balance, username, vote
            
        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        if (orderBy !== undefined) querystring += 'orderBy=' + orderBy + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    qreditApi.prototype.getWalletByID = function (id)
    {

        /* 
        
            Specific wallets can be obtained either by their publicKey or address.
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the wallet to be retrieved (either publicKey or address)
            
        */
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/' + id, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    

    qreditApi.prototype.getWalletBalance = function (id)
    {

        /* 
        
            Specific wallets can be obtained either by their publicKey or address.
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the wallet to be retrieved (either publicKey or address)
            
        */
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/' + id, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                if (body.data && body.data.balance)
                {
                    var expon = new Big('1e-8');
				    var humanbalance = new Big(body.data.balance).times(expon).toFixed(8);
                    resolve(humanbalance);
                }
                else
                {
                    resolve("0");
                }
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getWalletTransactions = function (id, page, limit)
    {

        /* 
        
            All transactions belonging to a wallet can be obtained using this API. Equivalent to transactions/search with parameters senderId and recipientId.
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the wallet to be retrieved (either publicKey or address)

            Inputs:  (OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            
        */

        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/' + id + '/transactions?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getWalletReceivedTransactions = function (id, page, limit)
    {

        /* 
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the wallet to be retrieved (either publicKey or address)

            Inputs:  (OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            
        */

        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/' + id + '/transactions/received?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getWalletSentTransactions = function (id, page, limit)
    {

        /* 
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the wallet to be retrieved (either publicKey or address)

            Inputs:  (OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            
        */

        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/' + id + '/transactions/sent?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }

    qreditApi.prototype.getWalletVotes = function (id, page, limit)
    {

        /* 
        
            Returns all votes made by the wallet. Often users create a new wallet instead of recasting their vote, as the former was historically cheaper.
        
            Inputs:  (REQUIRED)
            
            id	    string	        The identifier of the wallet to be retrieved (either publicKey or address)

            Inputs:  (OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            
        */
        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/' + id + '/votes?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.getTopWallets = function (page, limit)
    {

        /* 

            Sort the wallets by their balance.

            Inputs:  (OPTIONAL)
            
            page	    int	        The number of the page that will be returned.
            limit	    int	        The number of resources per page.
            
        */
        
        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/wallets/top?' + querystring, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                resolve(body);
                                                        
            });
            
        });

    }
    
    qreditApi.prototype.searchWallets = function (page, limit, body)
    {

        /*

            Searching for specific wallets is possible as well. A direct database query usually is more performant when the query expression becomes complicated.


            ALL BODY & QUERY ITEMS ARE OPTIONAL

            Query Parameters:

            page	                int	        The number of the page that will be returned.
            limit	                int	        The number of resources per page.

            Body Options:

            ** body is a json object

            address	                string	    ...
            publicKey	            string	    ...
            secondPublicKey	        string	    ...
            vote	                string	    ...
            username	            string	    ...
            balance	                object	    ...
            balance.from	        int	        ...
            balance.to	            int	        ...
            votebalance	            object	    ...
            votebalance.from	    int	        ...
            votebalance.to	        int	        ...

        */

        var querystring = "";
        
        if (page !== undefined) querystring += 'page=' + page + "&";
        if (limit !== undefined) querystring += 'limit=' + limit + "&";
        
        return new Promise((resolve, reject) => {
        
            request.post(this.apiURL + '/wallets/search?' + querystring, {json:true, body: body}, function (error, response, body)
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
