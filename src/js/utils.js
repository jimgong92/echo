var MAX_CACHE_AGE = 5 * 60 * 1000;
var MAX_WAIT_TIME = 5 *  1000;

var geoOptions = {
  timeout: MAX_WAIT_TIME,
  maximumAge: MAX_CACHE_AGE
};

var geoError = function(err){
  console.error("Error occurred:", err);
}

var getLocation = function(callback){
  var gps = navigator.geolocation;
  if(gps){
    gps.getCurrentPosition(function(position){
      callback({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    }, geoError, geoOptions);
  }
  else return false;
}

module.exports = {
  getLocation: getLocation
};