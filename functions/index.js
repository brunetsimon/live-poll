/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://votingapp-46f38.firebaseio.com"
});
const express = require('express');
const app = express();
const cors = require('cors')({origin: true});




// Keeps track of the length of the 'likes' child list in a separate property.
exports.countlikechange = functions.database.ref('/polls/{pollsId}/votes/{pushId}').onWrite(
    (change) => {
      const collectionRef = change.after.ref.parent;
      // const countRef = collectionRef.parent.child('ratingCount');

      let increment; 
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }


      let countRef = null;

      switch (change.after.val().rating) {
        case 0:
          countRef = collectionRef.parent.child('ratingCount/0');
          break;
        case 1:
          countRef = collectionRef.parent.child('ratingCount/1');
          break;
        case 2:
          countRef = collectionRef.parent.child('ratingCount/2');
          break;
        case 3:
          countRef = collectionRef.parent.child('ratingCount/3');
          break;
        default:
          break;
      }

      // Return the promise from countRef.transaction() so our function
      // waits for this async event to complete before it exits.
      return countRef.transaction((current) => {
        return (current || 0) + increment;
      }).then(() => {
        return console.log('Counter updated.');
      });
});


app.use(cors);
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch(e) {
    res.status(403).send('Unauthorized');
    return;
  }
};

//app.use(authenticate); 


// GET /api/users
// Get all users
app.get('/api/test', async (req,res) => {
  res.send("Hello Simon");
});
app.get('/api/users', async (req, res) => {

  let userInfo = [];
  try {
    
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map((user) => {
      return {
        uid: user.uid,
        email: user.email
      }
    });
    /* userInfo = admin.auth().listUsers().then((userRecords) => {
      console.log(userRecords);
      
      let usersInfoIn = [];
      for(var i=0; i<userRecords.users.length;i++) {
        usersInfoIn.push({"email": userRecords.users[i].email, "uid": userRecords.users[i].uid});
      }
      return usersInfoIn;
    }).catch((error) => {
      console.log(error);
    }); */

    return res.status(200).send({users});
  } catch(error) {
    console.log('Error getting all users', error.message);
    res.sendStatus(500);
  }
});

exports.api = functions.https.onRequest(app);