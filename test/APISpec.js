var expect = require('chai').expect;
var request = require('supertest')('http://localhost:5000');

function spec(){

  describe('API', function(){

    var echoObj = {
      'text': 'Test Echo',
      'date': new Date()
    };
    var echoId;

    it('should add an echo to database', function(done){
      request.post('/api/echo')
        .send(echoObj)
        .end(function(err, res){
          var addedEcho = JSON.parse(res.text);
          echoId = addedEcho.id;
          expect(addedEcho.text).to.equal(echoObj.text);
          expect(addedEcho.date).to.equal(echoObj.date);
          done();
        });
    });

    it('should retrieve stored echos from the database', function(done){
      request.get('/api/echo/all')
        .end(function(err, res){
          var echos = JSON.parse(res.text).results;
          var last = echos[echos.length - 1];
          expect(last.id).to.equal(echoId);
          expect(last.text).to.equal(echoObj.text);
          expect(last.date).to.equal(echoObj.date);
          done();
        });
    });
    
  });


}

spec()