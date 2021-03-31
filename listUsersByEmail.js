
//Consts
const REGION = 'us-east-1';
const USERPOOLID = 'us-east-1_YourUserpoolId';

//Initiate SDK
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({REGION});

async function searchUserByEmail (emailAddress) {           
  const params = {
    UserPoolId: USERPOOLID, 
    Filter: "email = \""+emailAddress+"\"",
    Limit: '30'
  };

  try {
    const listUserResult = await cognito.listUsers(params).promise();
    console.log ('listUserResult:', listUserResult);
    return listUserResult;
  }
  catch (err) {
    console.log ('listUser error:', err);
    return null;
  }
}

exports.handler = async (event) => {

  const data = await searchUserByEmail ("solariswu@gmail.com");
   
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
      
  return response;
};

