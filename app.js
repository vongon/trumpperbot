// console.log("Hello World!");
var TwitterPackage = require('twitter');
var KEYS = require('./api_keys');

var secret = {
  consumer_key: KEYS.consumer_key,
  consumer_secret: KEYS.consumer_secret,
  access_token_key: KEYS.access_token_key,
  access_token_secret: KEYS.access_token_secret
  };

var Twitter = new TwitterPackage(secret);

// Posting to Twitter:

// Twitter.post('statuses/update', {status: 'I am not a robot!'},  function(error, tweet, response){
//   if(error){
//     console.log(error);
//   }
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

// Listening to streams:

// Twitter.stream('statuses/filter', {track: '#MAGA'}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//   });

//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });

//Posting a reply:

//make a new Twitter object
// var Twitter = new TwitterPackage(secret);

//NEED TO USE A setTimeout function somewhere so that the app listens to the stream, then waits, then retweets to avoid getting flagged as spam

// we will randomly pick one of these items in this array
var arrOfMagicSayings = [
    "Follow me. Let's take on the #BiasedMedia and #RiggedSystem. #MAGA #TrumpTrain!",
    "Together we're going to be a victory for America! Follow me and let's #MAGA!",
    "It's so important. We can change lives. Tune in at 5:30ET! #RiggedSystem #TrumpTrain",
  // "The security aspect of cyber is very, very tough. And maybe it's hardly doable!",
  // "We have so many things that we have to do better, Lester, and certainly cyber is one of them!",
  // "There's never been anybody in the history of politics in this nation that's been so abusive to women!",
  // "I have a wonderful plan, believe me. I'll have a new legacy in months when the world is broken!",
  // "My strategy to defeat ISIS is secret!",
  // "Lies, I mean are they prosecuted? Does anyone do anything? It'll get me into the Oval Office!"
]
// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: '#WikiLeaks'}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    // calculate the random index (Math.random returns a double between 0 and 1)
    var randomIndex = Math.round(Math.random() * arrOfMagicSayings.length);
   
    //build our reply string grabbing the string in that randomIndex we've calculated
    var reply = "Thank you for your support @" + tweet.user.screen_name + "! " + arrOfMagicSayings[randomIndex];
    console.log(reply);
    //call the post function to tweet something
    //Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){

      //if we get an error print it out
    //  if(error){
    //    console.log(error);
    //  }

      //print the text of the tweet we sent out
    //  console.log(tweetReply.text);
    //});
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});