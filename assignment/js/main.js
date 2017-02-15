
// We set this to HTTP to prevent 'CORS' issues (this is used ONLY to hardcode the data URL)
// var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json");


/* =====================
  Defining functions:
===================== */

var parseData = function(allAjaxResponseValues) {
  return JSON.parse(allAjaxResponseValues);
};


var makeMarkers = function(parsedVariables, latitutdeField, longitudeField) {
  var interumMarkers = _.map(parsedVariables, function(crimeSpot){
      return L.marker([crimeSpot[latitutdeField], crimeSpot[longitudeField]]);
      }
  );
  return interumMarkers;
};


var plotMarkers = function(markersList) {
  // console.log(markersList);
  _.each(markersList, function(individualMarker){
    individualMarker.addTo(map);
  });
};


/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.
===================== */

var resetMap = function(allMarkers) {
  _.each(allMarkers, function(eachMarker){
    map.removeLayer(eachMarker);
  });
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */

// Filter Function (stretch goal):
// var filterData = function(allParsedDated) {
//   return _.filter(allParsedDated, function(crimeObject){
//     return crimeObject.District == 1;
//   });
// };


/* =====================
 Leaflet setup
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */



/* =====================
  The code here is triggered when you click on the button with ID #my-button
  ALL functions called here will be called EVERY time a click event fires
===================== */
$('button#map-button').click(function(e) {
  /* =====================
    Extracting variables from user input:
  ===================== */
  httpURL = $('#URL').val();
  console.log("httpURL", httpURL);

  latField = $('#latkey').val();
  console.log("latField", latField);

  longField = $('#lonkey').val();
  console.log("longField", longField);

  // variable = $('#boolean')[0].checked; //FOR BOOLEANS

  /* =====================
    Call resetMap function to remove markers from the map and clear out the array of marker
    objects:
  ===================== */
  resetMap(markers);

  /* =====================
    Download the data and call the parse and marker functions to mape the data
    (use .done function to ensure that the functions are NOT called until after
    the data has loaded):
  ===================== */
  var downloadData = $.ajax(httpURL);

  downloadData.done(function(data) {
    var parsed = parseData(data);
    // console.log(parsed);
    // var filtered = filterData(parsed);
    var markers = makeMarkers(parsed, latField, longField);
    plotMarkers(markers);
  });
});
