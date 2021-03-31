
//Consts
const REGION = 'us-east-1';
const USERPOOLID = 'us-east-1_YourUserPoolID';
const CLIENTID = "appclientId-noclientsecret";

//Initiate SDK
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({REGION});

async function authUser (username, password) {           

  var params = {
      AuthFlow: "ADMIN_USER_PASSWORD_AUTH", /* required */
      ClientId: CLIENTID, /* required */
      UserPoolId: USERPOOLID, /* required */
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    };
    
    
    
  try {
    const authUserResult = await cognito.adminInitiateAuth(params).promise();
    console.log ('listUserResult:', authUserResult);
    return authUserResult;
  }
  catch (err) {
    console.log ('authUser error:', err);
    return null;
  }
}


exports.handler = async (event) => {

  const data = await authUser ("test", "yourpwd");
   
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
      
  return response;
};

