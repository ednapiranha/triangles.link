'use strict';

(function () {
  /*
   * sky generation
   */
  var width = 2400; //window.innerWidth;
  var height = 530; //window.innerHeight;
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

  // sky color
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
    for (var x = 0; x <= width; x += width / 8) {
      for (var y = 0; y <= height; y += height / 8) {
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

    var cir = snap.polygon(0, 0, poly.centroid.x, poly.centroid.y, poly.centroid.x + 3, poly.centroid.y + 5).attr({
      fill: 'rgba(255, 255, 255, 0.5)'
    });

    grouping.add(poly, cir);
  }

  function randomColor() {
    var r = Math.floor(Math.random() * redMin) + redMax;
    var b = Math.floor(Math.random() * blueMin) + blueMax;
    return 'rgb(' + r.toString() + ', ' + green + ',' + b.toString() + ')';
  }

  createTriangles();

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

  /*
   * mountain generation
   */
  snap = Snap('#mountain');
  var color;

  // mountain color
  if (currentTimeOfDay >= 5 && currentTimeOfDay < 8) {
    color = 'rgba(241, 203, 255, 0.6)';
  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
    color = 'rgba(229, 253, 255, 0.6)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(255, 197, 168, 0.6)';
  } else {
    color = 'rgba(157, 150, 213, 0.4)';
  }

  var p = snap.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 25
  });

  p = p.pattern(0, 5, 25, 10);

  snap.paper.polygon('1400.8,422.7 1371.4,293.2 1256.7,148.4 1131.7,174.1 ' +
            '1018.5,87.4 830.2,97.7 689.1,0.6 499.3,119.7 417,87.4 ' +
            '278.8,209.4 209.6,174.1 89.1,271.2 0.8,444.7 1400.8,444.7').attr({ fill: p });
})();
