(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var foodWalkPoints = require('./data/data.json');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v8',
    center: [75.8345, 11.2664],
    zoom: 12,
    hash: true
});

map.addControl(new mapboxgl.Navigation());

var foodWalkLayer = new mapboxgl.GeoJSONSource({
    data: foodWalkPoints
});

map.on('style.load', function () {
    map.addSource('foodWalkLayer', foodWalkLayer);

    map.addLayer({
        "id": "hover",
        "type": "circle",
        "source": "foodWalkLayer",
        "layout": {
        },
        "paint": {
            "circle-radius": 20,
            "circle-color": "#627BC1",
            "circle-opacity": 0.6,
            "circle-blur": 0.4
        },
        "filter": ["==", "name", ""]
    });

    map.addLayer({
    "id": "foodWalkLayer",
    "interactive": true,
    "type": "circle",
    "source": "foodWalkLayer",
    "layout": {
        "circle-radius": 10,
        "text-field": "{name}",
        "text-size": 8
    },
    "paint": {
        "circle-color": "white"
    }
    });

});

map.on("mousemove", function(e) {
    map.featuresAt(e.point, {
        radius: 5,
        layers: ["foodWalkLayer"]
    }, function (err, features) {
        if (!err && features.length) {
            map.setFilter("hover", ["==", "name", features[0].properties.name]);
            var divId = '#' + features[0].properties.id;
            $(divId).addClass('fill-blue');
        } else {
            map.setFilter("hover", ["==", "name", ""]);
            $('.item').removeClass('fill-blue');
        }
    });
});


map.on('click', function (e) {
    map.featuresAt(e.point, {layer: 'foodWalkLayer', radius: 10, includeGeometry: true}, function (err, features) {
        if (err || !features.length)
            return;

        var feature = features[0];

        new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.name)
            .addTo(map);
    });
});

$('.item').on('mouseover', function(e) {
    var divId = $(this).attr('id');
    map.setFilter("hover", ["==", "id", divId]);
});

$(document).ready(function(){
  $('.cards').slick({
    vertical: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    dots: true
  });
});
},{"./data/data.json":2}],2:[function(require,module,exports){
module.exports={
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Rahmath, Arvind Gosh Road, Big Bazar",
        "dish": "beef biriyani",
         "marker-symbol": "star",
         "marker-color": "red"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.77909946441649,
          11.251627586055184
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Top Form, SM Street, Calicut",
        "dish": "fish biriyani",
         "marker-symbol": "star",
         "marker-color": "red",
         "id": "topform"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.78173875808714,
          11.250091278704733
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Amma Mess, Mavoor Road",
        "dish": "kerala meals",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.79567551612854,
          11.256815193462316
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Paragon, Under CH Overbridge, Kannur Road, Calicut",
        "dish": "anything on the menu",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.77844500541687,
          11.25668366298927
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Patter's, Corporation Circle",
        "dish": "all authentic brahmin veg stuff",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.77217936515808,
          11.254363455564855
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Bombay Hotel, Silk Street",
        "dish": "mutton cutlets",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.77318787574768,
          11.25140661084498
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Zains, Convent Road",
        "dish": "malabari snacks",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.77372431755066,
          11.254531815916435
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Bhaskaran's Milk Sarbath, Kannur Road",
        "dish": "milk sarbath",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.77798366546631,
          11.257236090572235
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Kings Bay, Customs Road",
        "dish": "pretty good fish menu",
        "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.7713532447815,
          11.258425121582624
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Sagar, Mavoor Road",
        "dish": "ghee rice, chicken, fish",
         "marker-symbol": "star",
         "marker-color": "red"

      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          75.78170657157898,
          11.259088030544259
        ]
      }
    }
  ]
}
},{}]},{},[1]);
