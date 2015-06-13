var expect = require('chai').expect;
var request = require('supertest')('http://localhost:5000');

function spec(){

  describe('API', function(){

    var echoObj = {
      'text': 'Test Echo',
      'date': new Date(),
      'lon': 37.7768,
      'lat': -122.4897
    };
    var echoId;

    it('should add an echo to database', function(done){
      request.post('/api/echo')
        .send(echoObj)
        .end(function(err, res){
          
          var addedEcho = JSON.parse(res.text);
          var addedText = addedEcho.text;
          var addedDate = new Date(addedEcho.date).toISOString().substring(0,20);
          var addedLon = addedEcho.lon;
          var addedLat = addedEcho.lat;

          echoId = addedEcho.id;
          expect(addedText).to.equal(echoObj.text);
          expect(addedDate).to.equal(echoObj.date.toISOString().substring(0,20));
          expect(addedLon).to.equal(echoObj.lon);
          expect(addedLat).to.equal(echoObj.lat);
         
          done();
        });
    });

    it('should retrieve stored echos from the database', function(done){
      request.get('/api/echo/all')
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
    
  });


}

spec()