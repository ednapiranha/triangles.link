'use strict';

(function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var snap = Snap('#back');
  var vertices = [];
  var triangles;
  var grouping = snap.select('g[filter="url(#artifacts)"]');
  var currentTimeOfDay = (new Date()).getHours();
  var redMin;
  var redMax;
  var blueMin;
  var blueMax;
  var green;

  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
    redMin = 150;
    redMax = 120;
    blueMin = 100;
    blueMax = 150;
    green = 120;
  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
    redMin = 70;
    redMax = 60;
    blueMin = 100;
    blueMax = 210;
    green = 185;
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    redMin = 100;
    redMax = 150;
    blueMin = 70;
    blueMax = 50;
    green = 100;
  } else {
    redMin = 50;
    redMax = 20;
    blueMin = 70;
    blueMax = 50;
    green = 10;
  }

  snap.attr({
    width: width,
    height: height
  });

  function createTriangles() {
    for (var x = 0; x <= width; x += width / 4) {
      for (var y = 0; y <= height; y += height / 4) {
        var xp;
        var yp;

        if (x && x != width) {
          xp = x + (Math.floor(Math.random() * (width / 4 + 1)) - (width / 8));
        } else {
          xp = x;
        }

        if (y && y != height) {
          yp = y + (Math.floor(Math.random() * (height / 4 + 1)) - (height / 8));
        } else {
          yp = y;
        }
        vertices.push([xp, yp]);
      }
    }

    triangles = Delaunay.triangulate(vertices);

    for (var i = 0; i < triangles.length; i += 3) {
      drawTriangle(i);
    }
  }

  function drawTriangle(i) {
    var poly = snap.polygon([
      vertices[triangles[i]][0], vertices[triangles[i]][1],
      vertices[triangles[i + 1]][0], vertices[triangles[i + 1]][1],
      vertices[triangles[i + 2]][0], vertices[triangles[i + 2]][1]
    ]).attr({
      fill: randomColor()
    });

    poly.centroid = {
      x: (vertices[triangles[i]][0] + vertices[triangles[i + 1]][0] + vertices[triangles[i + 2]][0]) / 3,
      y: (vertices[triangles[i]][1] + vertices[triangles[i + 1]][1] + vertices[triangles[i + 2]][1]) / 3
    };

    var cir = snap.circle(poly.centroid.x, poly.centroid.y, 1).attr({
      fill: '#21c7cd'
    });

    grouping.add(poly, cir);
  }

  function randomColor() {
    var r = Math.floor(Math.random() * redMin) + redMax;
    var b = Math.floor(Math.random() * blueMin) + blueMax;
    return 'rgb(' + r.toString() + ', ' + green + ',' + b.toString() + ')';
  }

  createTriangles();

  function onResize() {
    grouping.clear();
    vertices = [];
    width = window.innerWidth;
    height = window.innerHeight;
    snap.attr({
      width: width,
      height: height
    });
    createTriangles();
  }

  window.addEventListener('resize', onResize);

  function randomPoly() {
    return Math.floor(Math.random() * (triangles.length / 3));
  }

  function nextPoly() {
    var triSVG = document.querySelectorAll('#back polygon');
    var triTween = new TimelineLite();

    triTween.to(triSVG[randomPoly()], 0.1, {
      fill: randomColor(),
      onComplete: nextPoly
    });
  }
  nextPoly();
})();
