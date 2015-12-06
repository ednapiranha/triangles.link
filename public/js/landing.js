'use strict';

require('../css/shared.css');
require('../css/landing.css');

const menu = require('./menu');

menu.generate();

if (document.querySelector('#landing')) {
  let snap = Snap('#landing');

  // landing pattern
  let p = snap.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 15
  });

  p = p.pattern(0, 15, 10, 5);

  snap.paper.polygon('256.5,18 237,69 213.5,8.5 197,70 168.5,19.5 ' +
    '157.5,85.5 117,7.5 104.5,71.5 74.5,12.5 58,70 ' +
    '19.5,1 6,77.5 33,169 273,172.5 277.5,87.5').attr({ fill: p });
}
