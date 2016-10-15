var TwitterPackage = require('twitter');
var random = require("random-js")();
var KEYS = require('./api_keys');
var arrOfMagicSayings = [
  "Follow me. Let's take on the #BiasedMedia and #RiggedSystem. #MAGA #TrumpTrain!",
  "Together we're going to be a victory for America! Follow me and let's #MAGA!",
  "It's so important. We can change lives. Tune in at 5:30ET! #RiggedSystem #TrumpTrain",
  "The security aspect of cyber is very, very tough. And maybe it's hardly doable!",
  "We have so many things that we have to do better, Lester, and certainly cyber is one of them!",
  "There's never been anybody in the history of politics in this nation that's been so abusive to women!",
  "I have a wonderful plan, believe me. I'll have a new legacy in months when the world is broken!",
  "My strategy to defeat ISIS is secret!",
  "Lies, I mean are they prosecuted? Does anyone do anything? It'll get me into the Oval Office!"
];
var secret = {
  consumer_key: KEYS.consumer_key,
  consumer_secret: KEYS.consumer_secret,
  access_token_key: KEYS.access_token_key,
  access_token_secret: KEYS.access_token_secret
  };
var TWEET_FREQUENCY_MIN = 10000; //min range of tweet frequency in milliseconds, using range in hopes to humanize the bot and not get banned
var TWEET_FREQUENCY_MAX = 30000; //max range of tweet frequency in milliseconds, using range in hopes to humanize the bot and not get banned
var LAST_TWEET = {};
var PENDING_TWEET = {};

var Twitter = new TwitterPackage(secret);
Twitter.stream('statuses/filter', {track: '#WikiLeaks'}, function(stream) {
  stream.on('data', function(tweet) {
    PENDING_TWEET = tweet;
    console.log('[twitterbot] new tweet streamed!');
  });
  stream.on('error', function(error) {
    console.log(error);
  });
});

var RecursivePoster = function(){
  setTimeout(function(){
    if(LAST_TWEET.id_str == PENDING_TWEET.id_str){
      console.log('[RecursivePoster] no new tweets detected, skipping');
      return RecursivePoster();
    }
    var tweet = PENDING_TWEET;
    var reply = "Thank you for your support @" + tweet.user.screen_name + "! " + random.pick(arrOfMagicSayings);
    Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){
      if(error){
        console.log(error);
      }
      console.log('[RecursivePoster] posted reply:', tweetReply.text);
      LAST_TWEET = tweet;
      RecursivePoster();
    });  
  }, random.integer(TWEET_FREQUENCY_MIN, TWEET_FREQUENCY_MAX));
};
RecursivePoster();