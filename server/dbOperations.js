var mysql = require('mysql');
var language = require('./language');

 var db_config = {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'chowder',
      database : 'soma_bora',
 };

/*var db_config = {
      host     : 'us-cdbr-iron-east-05.cleardb.net',
      user     : 'b84936a1aea5b7',
      password : 'c3a2695d',
      database : 'heroku_ffc2322730cc125',
 };*/
 

    var connection;

    function handleDisconnect() {

      connection = mysql.createConnection(db_config);

      connection.connect(function(err) {
        if(err) {
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }  else{
          console.log("Successfully connected to Db");
        }                                   // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
      connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    }

    var getIdentifyImageQuestions = function(data,callback){
        language.getIdentifyImageQuestions(connection,data,function(result){
           callback(result); 
        });
    }
    var getSelectPicQuestions = function(data,callback){
        language.getSelectPicQuestions(connection,data,function(result){
           callback(result); 
        });
    }
     var getFillGapQuestions = function(data,callback){
        language.getFillGapQuestions(connection,data,function(result){
           callback(result); 
        });
    }
    
    handleDisconnect();
    
exports.getIdentifyImageQuestions = getIdentifyImageQuestions;
exports.getSelectPicQuestions = getSelectPicQuestions;  
exports.getFillGapQuestions = getFillGapQuestions;


    
    

