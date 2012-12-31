# rapgenius

An unofficial node.js module for searching RapGenius. Once a proper rapgenius API exists that will be added.

## Installation

    npm install rapgenius

## Usage

    var rapgenius = require('rapgenius');
    rapgenius.search('Kreayshawn', function(results) {
      var r = results[0];
      console.log(r.rapgenius_title);
      console.log(r.artist_name);
      console.log(r.song_title);
      console.log(r.rapgenius_uri);
      console.log(r.rapgenius_id);
    });

## Testing

Tests are in the test directory. Run them using [nodeunit](https://github.com/caolan/nodeunit).
