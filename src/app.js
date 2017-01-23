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
var fishImageList = [new UI.Image({ size: new Vector2(12, 6), image: 'images/fish1-12x6-left.png'}),
                    new UI.Image({ size: new Vector2(14, 7), image: 'images/fish1-14x7-left.png'}),
                    new UI.Image({ size: new Vector2(16, 8), image: 'images/fish1-16x8-left.png'}),
                    new UI.Image({ size: new Vector2(28, 14), image: 'images/fish1-28x14-left.png'})];
var fishVectorList = [new Vector2(0.5, 0),
                     new Vector2(1, 0),
                     new Vector2(1.5, 0),
                     new Vector2(2, 0)];
var fishPositionList = [new Vector2(0,30),
                       new Vector2(0, 60),
                       new Vector2(0, 90),
                       new Vector2(0, 120)];

var fishImage = new UI.Image({
  size: new Vector2(14, 7),
  image: 'images/fish1-14x7-right.png'
});
var fishVector = new Vector2();
var fishPosition = fishImage.position()
    .addSelf(wind.size())
    .subSelf(fishImage.size())
    .multiplyScalar(0.5);
wind.add(fishImage);
for (var i = 0; i < fishImageList.length; ++i) {
  wind.add(fishImageList[i]);
}
worldUpdate();
wind.show();

wind.on('accelData', function(e) {
  fishVectorUpdate(e);
  //console.log('accelData');
});

function fishVectorUpdate(e) {
  //TODO check vector length
  var verticalMove = e.accels[0].x/300;
  var horizontalMove = -e.accels[0].y/300;
  fishVector.set(verticalMove, horizontalMove);
}

function worldUpdate() {
  fishUpdate();
  fishListUpdate();
  checkCollision();
  setTimeout(worldUpdate, 100);
  //console.log('worldUpdate');
}

function fishUpdate() {
  fishPositionUpdate();
  fishImageUpdate();
}

function fishPositionUpdate() {
  fishPositionUpdateWithVector(fishPosition, fishVector);
  checkFishPositionInsideScreen();
}

function fishPositionUpdateWithVector(position, vector) {
  position.addSelf(vector);
}

function checkFishPositionInsideScreen() {
  if (fishPosition.x < 0) fishPosition.x = 0;
  if (fishPosition.y < 0) fishPosition.y = 0;
  if (fishPosition.x + fishImage.size().x > wind.size().x) fishPosition.x = wind.size().x - fishImage.size().x;
  if (fishPosition.y + fishImage.size().y > wind.size().y) fishPosition.y = wind.size().y - fishImage.size().y;
}

function fishImageUpdate() {
  changeDirectionImage(fishVector, fishImage);
  fishImage.position(fishPosition);
}

function fishListUpdate() {
  fishPositionListUpdate();
  fishImageListUpdate();
}

function fishPositionListUpdate() {
  for (var i = 0; i < fishImageList.length; ++i) {
    fishPositionUpdateWithVector(fishPositionList[i], fishVectorList[i]);
    checkFishPositionListInsideScreen(fishPositionList[i], fishVectorList[i], fishImageList[i]);
  }
}

function checkFishPositionListInsideScreen(position, vector, image) {
    if (position.x < 0) {
      position.x = 0;
      vector.x = -vector.x;
    } else if (position.x + image.size().x > wind.size().x) {
      position.x = wind.size().x - image.size().x;
      vector.x = -vector.x;
    }
}

function fishImageListUpdate() {
  for (var i = 0; i < fishImageList.length; ++i) {
    changeDirectionImage(fishVectorList[i], fishImageList[i]);
    fishImageList[i].position(fishPositionList[i]);
  }
}

function changeDirectionImage(vector, image) {
  //TODO check direction changed
  if (vector.x > 0) {
      image.image(image.image().replace('left', 'right'));
    } else if (vector.x < 0) {
      image.image(image.image().replace('right', 'left'));
    }
}

function checkCollision() {
  for (var i = 0; i < fishImageList.length; ++i) {
    if (fishPosition.x < fishPositionList[i].x + fishImageList[i].size().x && 
        fishPosition.x + fishImage.size().x > fishPositionList[i].x &&
        fishPosition.y < fishPositionList[i].y + fishImageList[i].size().y && 
        fishPosition.y + fishImage.size().y > fishPositionList[i].y) {
      fishImageList[i].remove();
    }
  }
}
