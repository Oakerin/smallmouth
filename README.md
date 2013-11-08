![LargeMouth an open BAAS](smallmouth.png) [![Build Status](https://travis-ci.org/blittle/smallmouth.png?branch=master)](https://travis-ci.org/blittle/smallmouth)
==========

The Client Library for [LargeMouth BAAS](https://github.com/blittle/largemouth)

##Motivation
[Firebase](http://firebase.com) is a Backend As A Service (BAAS) which allows developers to quickly build applications without worrying about the communication layer between the server and client. Firebase is awesome but the backend remains entirely proprietary. LargeMouth / SmallMouth attempt to recreate the Firebase api as an open-source project. Idealy a Firebase app could be easily moved to SmallMouth and vice versa. 

LargeMouth is built on top of [Socket.io](http://socket.io/) and [NodeJS](http://nodejs.org/). 

##Installing
SmallMouth can be installed using the client JavaScript package manager [Bower](http://bower.io/)

```bash
bower install smallmouth
```

##Example
###Creating Resources
Create a new resource just as you would with FireBase, except make the server referenced is a running instance of LargeMouth.
```javascript
	var chats = new SmallMouth.Resource('http://localhost:3000/chats');
```

SmallMouth aggresively stores content within local storage on the client. As resources are created and data is saved, initially 
everything is stored locally before being saved to the server. Because all data is stored locally on the client, SmallMouth can be used as an entirely clientside store (note make sure a modern browser is used). Create a client side data structure by not including a server when instantiating a new resource:
```javascript
	var chats = new SmallMouth.Resource('/chats');

	chats.on('value', function(snapshot) {
		console.log(snapshot.val());	
	});
```
See a more [complete example](example/index.html) with AngularJS.
##Road map
LargeMouth is under active development with the following roadmap. If interested in contributing, please fork the project!

 - Complete the Firebase JavaScript api
 - Build the security layers
 - Implement a database layer for MongoJS and LevelDB (currently the project is entirely in-memory)
 - Build a plugin api
 - Allow for custom defining custom events

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/blittle/smallmouth/trend.png)](https://bitdeli.com/free "Bitdeli Badge")