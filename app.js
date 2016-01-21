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