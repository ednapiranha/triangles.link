'use strict';

let currentTimeOfDay = (new Date()).getHours();

exports.generateSky = function () {
  const width = 2400;
  const height = 530;
  const snap = Snap('#back');

  let vertices = [];
  let triangles;
  let grouping = snap.select('g[filter="url(#artifacts)"]');
  let redMin;
  let redMax;
  let blueMin;
  let blueMax;
  let green;

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
    for (let x = 0; x <= width; x += width / 6) {
      for (let y = 0; y <= height; y += height / 6) {
        let xp;
        let yp;

        if (x && x != width) {
          xp = x + (Math.floor(Math.random() * (width / 4)) - (width / 8));
        } else {
          xp = x;
        }

        if (y && y != height) {
          yp = y + (Math.floor(Math.random() * (height / 4)) - (height / 8));
        } else {
          yp = y;
        }
        vertices.push([xp, yp]);
      }
    }

    triangles = Delaunay.triangulate(vertices);

    for (let i = 0; i < triangles.length; i += 3) {
      drawTriangle(i);
    }
  }

  function drawTriangle(i) {
    let poly = snap.polygon([
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

    let cir = snap.polygon(0, 0, poly.centroid.x, poly.centroid.y, poly.centroid.x + 3, poly.centroid.y + 5).attr({
      fill: 'rgba(255, 255, 255, 0.5)'
    });

    grouping.add(poly, cir);
  }

  function randomColor() {
    let r = Math.floor(Math.random() * redMin) + redMax;
    let b = Math.floor(Math.random() * blueMin) + blueMax;
    return 'rgb(' + r.toString() + ', ' + green + ',' + b.toString() + ')';
  }

  createTriangles();

  function randomPoly() {
    return Math.floor(Math.random() * (triangles.length - 2));
  }

  function nextPoly() {
    let polyback = document.querySelectorAll('#back polygon');
    let tween = new TimelineLite();

    try {
      tween.to(polyback[randomPoly()], 0.3, {
        fill: randomColor(),
        onComplete: nextPoly
      });
    } catch (e) { }
  }
  nextPoly();

};

exports.generateMountain = function () {
  let snap = Snap('#mountain');
  let color;

  // mountain color
  if (currentTimeOfDay >= 5 && currentTimeOfDay < 9) {
    color = 'rgba(241, 203, 255, 0.6)';
  } else if (currentTimeOfDay >= 9 && currentTimeOfDay < 17) {
    color = 'rgba(229, 253, 255, 0.6)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(255, 197, 168, 0.6)';
  } else {
    color = 'rgba(157, 150, 213, 0.4)';
  }

  let p = snap.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 25
  });

  p = p.pattern(0, 5, 25, 10);

  snap.paper.polygon('1400.8,422.7 1371.4,293.2 1256.7,148.4 1131.7,174.1 ' +
    '1018.5,87.4 830.2,97.7 689.1,0.6 499.3,119.7 417,87.4 ' +
    '278.8,209.4 209.6,174.1 89.1,271.2 0.8,444.7 1400.8,444.7').attr({ fill: p });
};

exports.generateLand = function () {
  let snap = Snap('#land-upper');
  let color;

  // land color
  if (currentTimeOfDay >= 5 && currentTimeOfDay < 9) {
    color = 'rgba(241, 203, 255, 0.9)';
  } else if (currentTimeOfDay >= 9 && currentTimeOfDay < 17) {
    color = 'rgba(189, 253, 255, 0.9)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(255, 197, 168, 0.9)';
  } else {
    color = 'rgba(157, 150, 213, 0.9)';
  }

  let p = snap.path('M0-15-10,15M15,10,0,25M0-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 55
  });

  p = p.pattern(0, 15, 25, 10);

  snap.paper.polygon('2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 ' +
    '1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 ' +
    '630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500').attr({ fill: p });

  snap = Snap('#land-lower');

  // land color
  if (currentTimeOfDay >= 5 && currentTimeOfDay < 9) {
    color = 'rgba(141, 203, 255, 0.95)';
  } else if (currentTimeOfDay >= 9 && currentTimeOfDay < 17) {
    color = 'rgba(179, 143, 145, 0.95)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(155, 197, 168, 0.95)';
  } else {
    color = 'rgba(157, 150, 213, 0.9)';
  }

  p = snap.path('M10-35-20,5M15,20,50,25M10-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 45
  });

  p = p.pattern(0, 15, 25, 10);

  snap.paper.polygon('2400,500 2400,77 2287.9,131.4 2152.3,48.6 1979,90 1854.6,58.9 ' +
    '1719,90 1532.3,48.6 1421.2,90 1232.3,64.1 1081.2,9.8 919,58.9 779,69.3 ' +
    '630.1,9.8 496.8,69.3 352.3,69.3 227.9,48.6 125.7,90 65.7,48.6 0,131.4 0,500').attr({ fill: p });
};

exports.generateMining = function () {
  let snap = Snap('#mining');
  let color;

  // mining color
  if (currentTimeOfDay >= 5 && currentTimeOfDay < 9) {
    color = 'rgba(141, 143, 215, 0.95)';
  } else if (currentTimeOfDay >= 9 && currentTimeOfDay < 17) {
    color = 'rgba(59, 143, 135, 0.95)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(25, 177, 168, 0.95)';
  } else {
    color = 'rgba(57, 150, 213, 0.9)';
  }

  let p = snap.path('M10-5-20,15M5,20,50,25M10-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 45
  });

  p = p.pattern(0, 5, 15, 25);

  snap.paper.polygon('0,146.2 0,80 143,80 468,122.4 628,80 903,106.5 1083,80 ' +
    '1288,106.5 1453,80 1678,106.5 1833,80 2033,106.5 2143,80 2400,106.5 ' +
    '2400,1680 0,1680 0,106.5').attr({ fill: p });
};
