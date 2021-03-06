'use strict';

let currentTimeOfDay = (new Date()).getHours();

exports.generateSky = function () {
  const width = 1200;
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
    redMin = 100;
    redMax = 20;
    blueMin = 70;
    blueMax = 80;
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
      x: (vertices[triangles[i]][0] + vertices[triangles[i + 1]][0] + vertices[triangles[i + 2]][0]) / 2,
      y: (vertices[triangles[i]][1] + vertices[triangles[i + 1]][1] + vertices[triangles[i + 2]][1]) / 2
    };

    let cir = snap.polygon(0, 0, poly.centroid.x, poly.centroid.y, poly.centroid.x + 2, poly.centroid.y + 2).attr({
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
  /*
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
  */
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

  let p = snap.path('M10-15-10,5M5,0,0,15M0-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 25
  });

  p = p.pattern(0, 5, 25, 10);

  snap.paper.polygon('1118.6,428.7 1095.1,297.4 1003.5,150.5 903.7,176.6 ' +
    '813.3,88.6 663,99.1 550.3,0.6 398.8,121.4 333.1,88.6 222.8,212.4 ' +
    '167.5,176.6 71.3,275 0.8,451 1118.6,451').attr({ fill: p });
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

  let p = snap.path('M10-15-20,10M15,20,10,5M0-15-30,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 55
  });

  p = p.pattern(0, 15, 25, 10);

  snap.paper.polygon('1200,500 1200,175 1200,37 1059,9.8 1003,55 956.2,26.3 ' +
    '912.4,16.2 887,9.8 815,77 713.3,52.3 681,9.8 623,58.9 498,36 394,15 319,70 ' +
    '245,22 146,21 72,33 0,32 0,236 0,500').attr({ fill: p });

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

  snap.paper.polygon('1200,500 1200,175 1200,37 1059,9.8 1003,55 956.2,26.3 ' +
    '912.4,16.2 887,9.8 815,77 713.3,52.3 681,9.8 623,58.9 498,36 394,15 319,70 ' +
    '245,22 146,21 72,33 0,32 0,236 0,500').attr({ fill: p });
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

  let p = snap.path('M10-5-20,15M5,20,10,5M0-15-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 45
  });

  p = p.pattern(0, 5, 15, 25);

  snap.paper.polygon('-2.8,160.3 -2.8,63.6 140.2,63.6 276.2,133.7 316.2,60.7 ' +
    '366.2,125 472.2,31.5 650.2,14 703.8,107.5 784.2,49 908.2,81.2 948.2,41 ' +
    '1200.4,54.2 1202.8,349.9 1202.8,2400 -2.8,2400 -2.8,102.3').attr({ fill: p });
};
