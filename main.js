
const XMLHttpRequest = require('xhr2');
const request = require('request');
const $ = require('jquery');
const secret = require('./Secret.js');

var playlist_url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
var user_id = secret.user_id();
var playlist_url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
var playlist_id = secret.playlist_id();
var playlist_items_url = 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks';

//getPlaylist(access_Token);
//getPlaylistItems(access_Token);
refresh(getPlaylistItems);
//getPlaylist(access);



function getPlaylist(access_token)
{
  request({url : playlist_url+ "?offset=4&limit=1", headers: {"Authorization": "Bearer " + access_token}}, function(err, res) {
    if(res)
    {
      const obj = JSON.parse(res.body);
      console.log(obj);
      console.log(obj.items[0])
    }
  })
}

function getPlaylistItems(access_token)
{
  var numberOfSongs = 289;
  var offset = 0;
  var limitOfitems = 1;
  request({url : playlist_items_url+ "?market=US&fields=items(track(external_urls%2C%20artists(name)%2C%20name%2Calbum(images)))&limit=" + limitOfitems+ "&offset=" + offset, headers: {"Authorization": "Bearer " + access_token}}, function(err, res) {
    if(res)
    {
      const obj = JSON.parse(res.body);

      for(var i = 0; i < limitOfitems; i++)
      {
        console.log(obj.items[i].track.album.images[0].url);
        console.log(obj.items[i].track.artists[0].name);
        console.log(obj.items[i].track.name);
      }
    }
  })
}

function refresh(callback){
  var query = 'https://accounts.spotify.com/api/token';
  var refresh_token = secret.refresh_token();
  var base_64 = secret.base_64();
  var access_token;


  var authOptions =
  {
    url: 'https://accounts.spotify.com/api/token',
    headers:
    {
      'Authorization': 'Basic ' + base_64
    },
    form:
    {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body)
  {
    if (!error && response.statusCode === 200)
    {
      access_token = body.access_token;
      callback(access_token);
    }
  });

}
