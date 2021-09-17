var Twit = require('twit')
var client_token = require('./token.json');
const release = new Date('September 28, 2021 12:00:00'); // release of the DLC
let time = new Date(Date.now())

var T = new Twit({
  consumer_key:client_token['consumer_key'],
  consumer_secret:client_token['consumer_secret'],
  access_token:client_token['access_token_key'],
  access_token_secret:client_token['access_token_secret'],
});


time = new Date(Date.now());
let between = release-time;
// Getting the time between now and the release date in milliseconds
let loop_Left = (between/1000/60/22).toFixed(0) - 1;
// Here I get the number of cycles left by dividing the milliseconds
// between/1000 -> Seconds /60 -> Minutes /22 -> Loop/Cycles
// Then I use toFixed(0) to remove decimals
let to_Wait = (between/1_320_000 % 1).toFixed(13) * 1_320_000;
// Here I get the time to wait before sending the first loop message
// Doing this by code prevent from trying to time it with a real clock
setTimeout(tweet,to_Wait);

console.log(between);
console.log(loop_Left);
console.log(to_Wait);

function tweet() {
  if (loop_Left == -500) {
    return;
  };
  T.post('statuses/update', { status:`${loop_Left} cycles left`  }, function(err, data, response) {
  console.log(data)
})
  loop_Left--;
  setTimeout(tweet,1_320_000);
};
