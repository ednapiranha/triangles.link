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
    redMin = 180;
    redMax = 255;
    blueMin = 100;
    blueMax = 150;
    green = 120;
  } else if (currentTimeOfDay >= 8 && currentTimeOfDay < 17) {
    redMin = 80;
    redMax = 100;
    blueMin = 100;
    blueMax = 210;
    green = 185;
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    redMin = 100;
    redMax = 150;
    blueMin = 170;
    blueMax = 250;
    green = 100;
  } else {
    redMin = 10;
    redMax = 100;
    blueMin = 10;
    blueMax = 100;
    green = 80;
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

    let cir = snap.polygon(0, 0, poly.centroid.y, poly.centroid.y, poly.centroid.x + 2, poly.centroid.y + 12).attr({
      fill: 'rgba(15, 15, 1, 0.8)'
    });

    grouping.add(poly, cir);
  }

  function randomColor() {
    let r = Math.floor(Math.random() * redMin) + redMax;
    let b = Math.floor(Math.random() * blueMin) + blueMax;
    return 'rgb(' + r.toString() + ', ' + green + ',' + b.toString() + ')';
  }

  createTriangles();
};

exports.generateMountain = function () {
  let snap = Snap('#mountain');
  let color;

  // mountain color
  color = 'rgba(100, 150, 213, 0.4)';

  let p = snap.path('M15-5-10,15M5,1,0,5M0-15-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 5
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
    color = 'rgba(41, 203, 255, 0.6)';
  } else if (currentTimeOfDay >= 9 && currentTimeOfDay < 17) {
    color = 'rgba(29, 113, 115, 0.6)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(185, 0, 180, 0.9)';
  } else {
    color = 'rgba(117, 130, 93, 0.9)';
  }

  let p = snap.path('M10-15-20,10M15,0,12,5M0-15-30,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 55
  });

  p = p.pattern(10, 5, 25, 10);

  snap.paper.polygon('1200,500 1200,175 1200,37 1059,9.8 1003,55 956.2,26.3 ' +
    '912.4,16.2 887,9.8 815,77 713.3,52.3 681,9.8 623,58.9 498,36 394,15 319,70 ' +
    '245,22 146,21 72,33 0,32 0,236 0,500').attr({ fill: p });

  snap = Snap('#land-lower');

  // land color
  color = 'rgba(17, 10, 13, 0.9)';

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
    color = 'rgba(141, 203, 255, 0.6)';
  } else if (currentTimeOfDay >= 9 && currentTimeOfDay < 17) {
    color = 'rgba(129, 113, 115, 0.6)';
  } else if (currentTimeOfDay >= 17 && currentTimeOfDay < 21) {
    color = 'rgba(57, 50, 53, 0.9)';
  } else {
    color = 'rgba(1, 5, 3, 0.8)';
  }

  let p = snap.path('M10-5-20,5M5,2,10,1M10-5-20,15').attr({
    fill: 'none',
    stroke: color,
    strokeWidth: 45
  });

  p = p.pattern(1, 15, 15, 5);

  snap.paper.path('M1202.7,2400H-1.7V112.3C7.1,98.9,22.1,91,36.4,83.7c23.4-11.9,' +
    '46.7-23.8,70.1-35.8c7.9-4.1,16.1-8.2,24.9-9.3c6.3-0.8,12.7-0.1,19.1,0.3c9.9,' +
    '0.6,19.8,0.4,29.7,0.1c6-0.1,11.9-0.3,17.9-0.4c12.4-0.3,24.8-0.6,37.2-0.9' +
    'c50.4-1.2,100.9-2.4,151.3-3.6c38.4-0.9,76.8-1.8,115.1-1.6c40.1,0.2,80.3,1.6,' +
    '120.4,3c7.6,0.3,15.2,0.5,22.8,0.8c25.8,0.9,51.7,1.8,77.5,2.7c19.2,0.7,38.5,' +
    '1.3,57.7,2c28,1,56.1,2,84.1,2.9c44.1,1.5,88.3,3.1,132.4,4.6c27.7,1,55.6,2,' +
    '82.6,8.5c11.4,2.7,22.8,6.6,32.3,13.5c7.1,5.1,13.5,12.1,22.1,13.7c7.3,1.4,' +
    '14.7-1.5,22.1-2.7c17.5-2.8,36.3,4.9,46.8,19.2V2400z').attr({ fill: p });
};
