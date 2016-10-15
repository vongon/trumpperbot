var TwitterPackage = require('twitter');
var random = require("random-js")();
var KEYS = require('./api_keys');
var arrOfMagicSayings = [
  "Click here and RT if you want to send a message to the #BiasedMedia! https://goo.gl/yMQjzZ #TrumpTrain",
  "Follow my account. Let's take on the #BiasedMedia and this #RiggedSystem. #MAGA #TrumpTrain!",
  "Together we're going to be a victory for America! RT this and spread the word and #MAGA!",
  "It's so important. We can change lives. https://goo.gl/3TXKOa #RiggedSystem #TrumpTrain",
  "The security aspect of cyber is very, very tough. And maybe it's hardly doable! https://goo.gl/f3qXJF",
  "We have so many things that we have to do better! Certainly cyber is one of them! https://goo.gl/wIir0Y",
  "There's never been anybody in the history of US politics so abusive to women! #WomenForTrump!"
  "#WomenForTrump: RT this and get the word out there! https://goo.gl/dQCRmR",
  "I'm counting on you to RT and get this out there https://goo.gl/4utLRA #TrumpTrain",
  "I need everyone on the #TrumpTrain to RT this and get this spread! https://goo.gl/S1gLTe #MAGA"
  "I'll have a new legacy in months after the world is broken! https://goo.gl/f3qXJF",
  "I need your help getting this out far and wide! #TrumpTrain #WikiLeaks https://goo.gl/f3qXJF",
  "My strategy to defeat #ISIS is secret! Click here, RT and spread this! https://goo.gl/f3qXJF",
  "Help me spread truth on #CrookedHillary and 2nd Amendment! RT this! https://goo.gl/Zn6CSv",
  "Lies! Will you get me in Oval Office? RT this and get the word out! https://goo.gl/eiIM0Z",
  "Corrupt #BiasedMedia don't want this 2 spread! Help get it out there! https://goo.gl/xNeVic"
  "#WomenForTrump: #BiasedMedia trying 2 keep this from spreading! RT it and #MAGA! https://goo.gl/dQCRmR",
  "#TrumpTrain: let's send a message to the #BiasedMedia and spread this far and wide: https://goo.gl/wIir0Y",
  "I need #TrumpsArmy 2 send a message to the #BiasedMedia. RT and share! https://goo.gl/wIir0Y",
  "#CrookedHillary and 2nd Amendment truth here! RT and share! https://goo.gl/Zn6CSv"

];
var secret = {
  consumer_key: KEYS.consumer_key,
  consumer_secret: KEYS.consumer_secret,
  access_token_key: KEYS.access_token_key,
  access_token_secret: KEYS.access_token_secret
  };
var TWEET_FREQUENCY_MIN = 30*1000; //min range of tweet frequency in milliseconds, using range in hopes to humanize the bot and not get banned
var TWEET_FREQUENCY_MAX = 60*1000; //max range of tweet frequency in milliseconds, using range in hopes to humanize the bot and not get banned
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