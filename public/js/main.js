'use strict';
// [96,325, 216,325, 156,235]
(function() {
  var snap = Snap(100, 100);
  snap.paper.polygon(0,0, 25,50, 50,0).attr({ fill: '#eee', stroke: '#ccc' });
  snap = Snap(100, 100);
  snap.paper.polygon(25,50, 75,50, 50,0).attr({ fill: '#ccc', stroke: '#ccc' });
  snap = Snap(100, 100);
  snap.paper.polygon(0,0, 25,50, 50,0).attr({ fill: '#eee', stroke: '#ccc' });
})();
