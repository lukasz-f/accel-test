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
var fishImage = new UI.Image({
  size: new Vector2(14, 7)
});
var fishVector = new Vector2();
var fishPosition = fishImage.position()
    .addSelf(wind.size())
    .subSelf(fishImage.size())
    .multiplyScalar(0.5);
fishUpdate();
wind.add(fishImage);
wind.show();

wind.on('accelData', function(e) {
  fishVectorUpdate(e);
  console.log('accelData');
});

function fishVectorUpdate(e) {
  var verticalMove = e.accels[0].x/300;
  var horizontalMove = -e.accels[0].y/300;
  fishVector.set(verticalMove, horizontalMove);
}

function fishUpdate() {
  fishPositionUpdate();
  fishImageUpdate();
  console.log('fishUpdate');
  setTimeout(fishUpdate, 50);
}

function fishPositionUpdate() {
  fishPosition.addSelf(fishVector);
  checkFishPositionInsideScreen();
  fishImage.position(fishPosition);
}

function checkFishPositionInsideScreen() {
  if (fishPosition.x < 0) fishPosition.x = 0;
  if (fishPosition.y < 0) fishPosition.y = 0;
  if (fishPosition.x > wind.size().x) fishPosition.x = wind.size().x;
  if (fishPosition.y > wind.size().y) fishPosition.y = wind.size().y;
}

function fishImageUpdate() {
  if (fishVector.x > 0) {
    fishImage.image('images/fish-right-14x7-1.png');
  } else if (fishVector.x < 0) {
    fishImage.image('images/fish-left-14x7-1.png');
  }
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