var expect = require('chai').expect;
var request = require('supertest')('http://localhost:5000');

function spec(){

  describe('API', function(){

    var echoObj = {
      'text': 'Test Echo'
    };
    var echoId;

    it('should add an echo to database', function(done){
      request.post('/api/echo')
        .send(echoObj)
        .end(function(err, res){
          var addedEcho = JSON.parse(res.text);
          echoId = addedEcho.id;
          expect(addedEcho.text).to.equal(echoObj.text);
          done();
        });
    });

    it('should retrieve stored echos from the database', function(done){
      request.get('/api/echo/all')
        .end(function(err, res){
          var echos = JSON.parse(res.text);
          expect(echos[0].id).to.equal(echoId);
          expect(echos[0].text).to.equal(echoObj.text);
          done();
        });
    });
    
  });


}

spec()