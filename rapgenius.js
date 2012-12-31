var querystring = require('querystring')
  , http = require('http')
  , HOST = 'rapgenius.com'
  , SEARCH_PATH = '/search/quick?';

/**
 * Searches rapgenius for query. Returns an array where each element has:
 *  - rapgenius_title
 *  - artist_name
 *  - song_title
 *  - rapgenius_uri
 *  - rapgenius_id (rapgenius.com/songs/{rapgenius_id} redirects to rapgenius.com{rapgenius_uri})
 */
exports.search = function(query, cb) {
  var options = {
    'host': HOST,
    'path': SEARCH_PATH + querystring.stringify({'q': query}),
    'headers': {'Accept': '*/*, application/x-javascript, text/javascript, text/html, application/xml, text/xml'}
  }

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunk) {
      str += chunk;
    })

    response.on('end', function() {
      cb(parse_search_response(str));
    })
  }

  http.request(options, callback).end();
}

/**
 * Exposed for testing.
 */
var parse_search_response = exports.parse_search_response = function(response) {
  var lines = response.split("\n");

  var results = [];

  for (i in lines) {
    var line = lines[i];
    if (line === '') {
      continue; // skip empty lines
    }
    var split = line.split('|');
    
    var rapgenius_title = split[0]; // ie: 'Kreayshawn – Gucci Gucci'
    var rapgenius_uri   = split[1]; // ie: '/Kreayshawn-gucci-gucci-lyrics'
    var rapgenius_id    = split[2]; // ie: 50156

    // Try to extract artist_name and song_title from rapgenius_title.
    var artist_name = song_title = '';
    var title_split_index = rapgenius_title.indexOf(' – ');
    if (title_split_index > 0) {
      artist_name = rapgenius_title.substring(0, title_split_index);
      song_title = rapgenius_title.substring(title_split_index + 3);
    }

    results.push({
      'rapgenius_title': rapgenius_title,
      'artist_name': artist_name,
      'song_title': song_title,
      'rapgenius_uri': rapgenius_uri,
      'rapgenius_id': rapgenius_id
    })
  }

  return results;
}
