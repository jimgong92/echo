var expect = require('chai').expect;
var request = require('supertest')('http://localhost:5000');

function spec(){

  describe('API', function(){



    var echoObj = {
      'text': 'Test Echo',
      'date': new Date(),
      'lon': -122.4897,
      'lat': 37.7768,
      'wRadius': -1
    };
    var echoId;

    var whisperObj = {
      'text': 'Whispered Echo',
      'date': new Date(),
      'lon': -123,
      'lat': 37.7768,
      'wRadius': 5
    };

    it('should add an echo to database', function(done){
      request.post('/api/echo')
        .send(echoObj)
        .end(function(err, res){

          var addedEcho = JSON.parse(res.text);
          var addedText = addedEcho.text;
          var addedDate = new Date(addedEcho.date).toISOString().substring(0,20);
          var addedLon = addedEcho.lon;
          var addedLat = addedEcho.lat;
          var addedWRad = addedEcho.wRad;

          echoId = addedEcho.id;
          expect(addedText).to.equal(echoObj.text);
          expect(addedDate).to.equal(echoObj.date.toISOString().substring(0,20));
          expect(addedLon).to.equal(echoObj.lon);
          expect(addedLat).to.equal(echoObj.lat);
          expect(addedWRad).to.equal(echoObj.wRad);

          done();
        });
    });

    it('should retrieve stored echos from the database', function(done){
      request.get('/api/echo')
        .end(function(err, res){

          var echos = JSON.parse(res.text).results;
          var last = echos[echos.length - 1];
          var gotId = last.id;
          var gotText = last.text;
          var gotDate = new Date(last.date).toISOString().substring(0,20);
          var gotLon = last.lon;
          var gotLat = last.lat;

          expect(gotId).to.equal(echoId);
          expect(gotText).to.equal(echoObj.text);
          expect(gotDate).to.equal(echoObj.date.toISOString().substring(0,20));
          expect(gotLon).to.equal(echoObj.lon);
          expect(gotLat).to.equal(echoObj.lat);

          done();
        });
    });

    it('should retrieve echos within specified radius', function(done){
      var searchRad = 50;
      var user = {
        lon: echoObj.lon + 0.1,
        lat: echoObj.lat - 0.5
      };
      var getParams = 'lon=' + user.lon + '&lat=' + user.lat + '&radius=' + searchRad;
      request.get('/api/echo?' + getParams)
        .end(function(err, res){

          var echos = JSON.parse(res.text).results;
          var last = echos[echos.length - 1];
          var gotId = last.id;
          var gotText = last.text;
          var gotDate = new Date(last.date).toISOString().substring(0,20);
          var gotLon = last.lon;
          var gotLat = last.lat;

          expect(gotId).to.equal(echoId);
          expect(gotText).to.equal(echoObj.text);
          expect(gotDate).to.equal(echoObj.date.toISOString().substring(0,20));
          expect(gotLon).to.equal(echoObj.lon);
          expect(gotLat).to.equal(echoObj.lat);

          done();
        });
    });

    it('should not retrieve echos outside of specified radius', function(done){
      var searchRad = 50;
      var user = {
        lon: 0,
        lat: 0
      };
      var getParams = 'lon=' + user.lon + '&lat=' + user.lat + '&radius=' + searchRad;
      request.get('/api/echo?' + getParams)
        .end(function(err, res){

          var echos = JSON.parse(res.text).results;
          expect(echos.length).to.equal(0);

          done();
        });
    });

    it('should add whispered echos', function(done){
      request.post('/api/echo')
        .send(whisperObj)
        .end(function(err, res){

          var addedEcho = JSON.parse(res.text);
          var addedText = addedEcho.text;
          var addedDate = new Date(addedEcho.date).toISOString().substring(0,20);
          var addedLon = addedEcho.lon;
          var addedLat = addedEcho.lat;
          var addedWRad = addedEcho.wRad;

          echoId = addedEcho.id;
          expect(addedText).to.equal(whisperObj.text);
          expect(addedDate).to.equal(whisperObj.date.toISOString().substring(0,20));
          expect(addedLon).to.equal(whisperObj.lon);
          expect(addedLat).to.equal(whisperObj.lat);
          expect(addedWRad).to.equal(whisperObj.wRad);

          done();
        });
      
    });
    
  });


}

spec()