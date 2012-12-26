var rapgenius = require('../rapgenius');

exports.test_parse_response = function(test) {
  // parse no results -------------------------------------
  var results = rapgenius.parse_search_response('');
  console.log("RESULTS: " + results)
  test.equal(results.length, 0);

	// parse single result ----------------------------------
  var results = rapgenius.parse_search_response(
    'Kreayshawn – Gucci Gucci|/Kreayshawn-gucci-gucci-lyrics|50156');

  test.equal(results.length, 1);

  var r = results[0];
  test.equal(r.rapgenius_title, 'Kreayshawn – Gucci Gucci');
  test.equal(r.artist_name, 'Kreayshawn');
  test.equal(r.song_title, 'Gucci Gucci');
  test.equal(r.rapgenius_uri, '/Kreayshawn-gucci-gucci-lyrics');
  test.equal(r.rapgenius_id, 50156);

  // parse multiple results -------------------------------
  var results = rapgenius.parse_search_response(
    'Kreayshawn – Gucci Gucci|/Kreayshawn-gucci-gucci-lyrics|50156\n'
  + 'Kreayshawn – Go Hard (La.La.La)|/Kreayshawn-go-hard-lalala-lyrics|82380');

  test.equal(results.length, 2);

  var r = results[0];
  test.equal(r.rapgenius_title, 'Kreayshawn – Gucci Gucci');
  test.equal(r.artist_name, 'Kreayshawn');
  test.equal(r.song_title, 'Gucci Gucci');
  test.equal(r.rapgenius_uri, '/Kreayshawn-gucci-gucci-lyrics');
  test.equal(r.rapgenius_id, 50156);

  var r = results[1];
  test.equal(r.rapgenius_title, 'Kreayshawn – Go Hard (La.La.La)');
  test.equal(r.artist_name, 'Kreayshawn');
  test.equal(r.song_title, 'Go Hard (La.La.La)');
  test.equal(r.rapgenius_uri, '/Kreayshawn-go-hard-lalala-lyrics');
  test.equal(r.rapgenius_id, 82380);

  // parse poorly formatted rapgenius_title
  var results = rapgenius.parse_search_response(
    'Kreayshawn Gucci Gucci|/Kreayshawn-gucci-gucci-lyrics|50156');

  test.equal(results.length, 1);

  var r = results[0];
  test.equal(r.rapgenius_title, 'Kreayshawn Gucci Gucci');
  test.equal(r.artist_name, '');
  test.equal(r.song_title, '');
  test.equal(r.rapgenius_uri, '/Kreayshawn-gucci-gucci-lyrics');
  test.equal(r.rapgenius_id, 50156);

  test.done();
}

exports.test_search = function(test) {
  var cb = function(results) {
    console.log(results);

    test.equal(results.length, 10);

    test.done();
  }

  rapgenius.search('Kanye', cb);
}
