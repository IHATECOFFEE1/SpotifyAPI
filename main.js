
var XMLHttpRequest = require('xhr2');
var request = require('request');

var playlist_url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
var user_id = "fill here";
var playlist_url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
var playlist_id = 'fill here';
var playlist_items_url = 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks';
var blah;

//getPlaylist(access_Token);
//getPlaylistItems(access_Token);
//refresh();
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
  var limitOfitems = 1;
  request({url : playlist_items_url+ "?market=US&fields=items(track(external_urls%2C%20artists(name)%2C%20name%2Calbum(images)))&limit=" + limitOfitems, headers: {"Authorization": "Bearer " + access_token}}, function(err, res) {
    if(res){
      const obj = JSON.parse(res.body);

      for(var key in obj.items[0])
        console.log(key);

      console.log("------");

      for(var key in obj.items[0].track)
      console.log(key);
      }
  })
}

function refresh(callback){
  var query = 'https://accounts.spotify.com/api/token';
  var refresh_token = "fill here";
  var base_64 = "fill here";
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
