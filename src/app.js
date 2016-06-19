/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

Accel.config({
  rate: 100,
  samples: 20
});

var wind = new UI.Window({
  backgroundColor: 'black'
});
var rect = new UI.Rect({
  size: new Vector2(10, 10),
  backgroundColor: 'white'
});
var rectVect = new Vector2();
var rectPos = rect.position()
    .addSelf(wind.size())
    .subSelf(rect.size())
    .multiplyScalar(0.5);
rectPosition();
wind.add(rect);
wind.show();

wind.on('accelData', function(e) {
  rectPosUpdate(e);
  console.log('accelData in');
});

function rectPosUpdate(e) {
  var verticalMove = e.accels[0].x/100;
  var horizontalMove = -e.accels[0].y/100;
  rectVect.set(verticalMove, horizontalMove);
}

function rectPosition() {
  rectPos.addSelf(rectVect);
  rect.position(rectPos);
  console.log('rectPosition in');
  setTimeout(rectPosition, 50);
}

/*
main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    backgroundColor: 'black'
  });
  var radial = new UI.Radial({
    size: new Vector2(140, 140),
    angle: 0,
    angle2: 300,
    radius: 20,
    backgroundColor: 'cyan',
    borderColor: 'celeste',
    borderWidth: 1,
  });
  var textfield = new UI.Text({
    size: new Vector2(140, 60),
    font: 'gothic-24-bold',
    text: 'Dynamic\nWindow',
    textAlign: 'center'
  });
  var windSize = wind.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  wind.add(radial);
  wind.add(textfield);
  wind.show();
});
*/
//simply.impl.accelConfig(Accel.config());