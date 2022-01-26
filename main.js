var request = require('request');







var user_id = "40z48brb5l3c0wv4fyz3ttt0f";
var playlist_url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
var user_id = "parkerzmartin";
var playlist_url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
var takeAchillPill_id = '2ZQ51ANaNmhM2YfKsjmCFa';
var playlist_items_url = 'https://api.spotify.com/v1/playlists/' + takeAchillPill_id+ '/tracks';

//getPlaylist(access_Token);
getPlaylistItems(access_Token);

function getPlaylist(access_token) {
  request({url : playlist_url+ "?offset=4&limit=1", headers: {"Authorization": "Bearer " + access_token}}, function(err, res) {
    if(res){
      const obj = JSON.parse(res.body);
      console.log(obj);
      console.log(obj.items[0])
      }
  })
}

function getPlaylistItems(access_token) {
  request({url : playlist_items_url+ "?market=US&fields=items(track(external_urls%2C%20artists(name)%2C%20name%2Calbum(images)))&limit=1", headers: {"Authorization": "Bearer " + access_token}}, function(err, res) {
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
