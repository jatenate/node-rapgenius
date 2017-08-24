[![Stories in Ready](https://badge.waffle.io/jatenate/node-rapgenius.png?label=ready&title=Ready)](https://waffle.io/jatenate/node-rapgenius?utm_source=badge)
# rapgenius

An unofficial node.js module for searching RapGenius. Once a proper rapgenius API exists that will be added.

## Installation

    npm install rapgenius

## Usage

    var rapgenius = require('rapgenius');
    rapgenius.search('Kreayshawn', function(results) {
      var r = results[0];
      console.log(r.rapgenius_title); // 'Kreayshawn – Gucci Gucci'
      console.log(r.artist_name);     // 'Kreayshawn'
      console.log(r.song_title);      // 'Gucci Gucci'
      console.log(r.rapgenius_uri);   // '/Kreayshawn-gucci-gucci-lyrics'
      console.log(r.rapgenius_id);    // 50156
    });

## Testing

Tests are in the test directory. Run them using [nodeunit](https://github.com/caolan/nodeunit).
