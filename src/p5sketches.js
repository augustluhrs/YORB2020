let sketches = [];
let myCoolSketch, location;

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//
// My cool sketch!
myCoolSketch = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(100, 100, sketch.WEBGL);
  };

  sketch.draw = () => {
    sketch.background(205, 105, 94);
    sketch.rotateY(sketch.millis() / 1000);
    sketch.sphere(40, 16, 3);
  };
};

// create a location for this sketch in the scene:
location = {
  x: -8,
  y: 1.5,
  z: -8,
};
size = {
  x: 1,
  y: 1,
  z: 1
}
rotation = {
  x: 0,
  y: 0,
  z: 0
}

// Add this sketch to the array:
sketches.push({
  sketch: myCoolSketch,
  location: location,
  size: size,
  rotation: rotation
});

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//
// Bouncing Ball Sketch
myCoolSketch = (sketch) => {
  let ballX = 100;
  let ballY = 100;
  let velocityX = sketch.random(-5, 5);
  let velocityY = sketch.random(-5, 5);
  let buffer = 25;

  sketch.setup = () => {
    sketch.createCanvas(400, 400);
    ballX = sketch.width / 2;
    ballY = sketch.height / 2;
    sketch.pixelDensity(1);
    sketch.frameRate(25);
    sketch.rectMode(sketch.CENTER);
    sketch.ellipseMode(sketch.CENTER);
  };

  sketch.draw = () => {
    sketch.background(10, 10, 200);
    ballX += velocityX;
    ballY += velocityY;
    if (ballX >= sketch.width - buffer || ballX <= buffer) {
      velocityX = -velocityX;
    }
    if (ballY >= sketch.height - buffer || ballY <= buffer) {
      velocityY = -velocityY;
    }
    sketch.fill(240, 120, 0);
    sketch.ellipse(ballX, ballY, 50, 50);
  };
};

location = {
  x: -8,
  y: 2,
  z: -18,
};
size = {
  x: 2,
  y: 2,
  z: 0.05
}
rotation = {
  x: 0,
  y: 0,
  z: 0
}
// Add this sketch to the array:
sketches.push({
  sketch: myCoolSketch,
  location: location,
  size: size,
  rotation: rotation
});

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//


myCoolSketch = (sketch) => {
  sketch.setup = ()=> {
    sketch.createCanvas(400, 400);
  }

  sketch.draw = () => {
    sketch.background(127, 0, 150);
    sketch.strokeWeight(3);
    var a = 0;
    var p = [];
    var inc = sketch.TWO_PI / 25.0;
    let blueLineLen, blueLineDest;

    for (var i = 0; i < 41; i++) {
      if (i % 2 !== 1) sketch.stroke('yellow')
      else sketch.stroke('red')
      let x = 60;
      let y = 200;
      let x2 = 300 + sketch.sin(sketch.frameCount * 0.05 + i) * 10;
      let y2 = 42 + sketch.cos(a) + i * 8;
      sketch.line(x, y, x2, y2);
      p[i] = {
        "x": x2,
        "y": y2
      }
      sketch.stroke('cyan');
      if (p[i - 1]) {
        sketch.line(x2 - blueLineDest, y2 - blueLineLen, p[i - 1].x, p[i - 1].y)
      }
      a = a + inc;
    }
    sketch.noFill();
    sketch.ellipse(60, 200, 50);
  }
}
// where should the sketch end up in the scene:
// [-8.774632992681308, 0.5, 16.359285500664296]
location = {
    x: -9,
    y: 1,
    z: 16
}
size = {
  x: 1.5,
  y: 1.5,
  z: 1.5
}
rotation = {
  x: 0,
  y: 0,
  z: 0
}
// Add this sketch to the array:
sketches.push({
  sketch: myCoolSketch,
  location: location,
  size: size,
  rotation: rotation
});

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//

//August's IKEA YORB ripple
myCoolSketch = (sketch) => {
  let pixel1, pixel2, pixel3, pixel4, pixel5;
  let ikeaPixels = [];
  let rotations = [0, 90, 180, 270];
  let ikeaLogo;

  //ripple variables
  let cols, rows;
  let pixelSize = 32;
  let pixelGrid = [];

  sketch.preload = () => {
    pixel1 = sketch.loadImage('ikeaBagPixel_1.png');
    pixel2 = sketch.loadImage('ikeaBagPixel_2.png');
    pixel3 = sketch.loadImage('ikeaBagPixel_3.png');
    pixel4 = sketch.loadImage('ikeaBagPixel_4.png');
    pixel5 = sketch.loadImage('ikeaBagPixel_5.png');
    ikeaLogo = sketch.loadImage('YORB_IKEA.png');
  }

  sketch.setup = () => {
    sketch.createCanvas(840,840);
    ikeaPixels = [pixel1, pixel2, pixel3, pixel4, pixel5];
    sketch.frameRate(8);
    sketch.angleMode(sketch.DEGREES);
    sketch.imageMode(sketch.CENTER);

    //set up the grid
    cols = 800/pixelSize;
    rows = 800/pixelSize;
    for(let i = 0; i < cols; i++){
      pixelGrid[i] = [];
      for(let j = 0; j < rows; j++){
        pixelGrid[i][j] = {
          id: [i, j],
          x: (i * pixelSize) + (pixelSize/2) + 20,
          y: (j * pixelSize) + (pixelSize/2) + 20,
          // col: floor(random(8)),
          swatch: 0, 
          hasFlipped: false
        };
      }
    }
    sketch.initGrid(pixelGrid[sketch.floor(cols/2)][sketch.floor(rows/2)], 0);
  }

  sketch.draw = () => {
    sketch.background(255);
    //yellow border
    sketch.fill(255,218,26); //ikea yellow
    sketch.rect(0,0, sketch.width, sketch.height);

    //ripple animation
    //clunky way of getting center pixel, needs odd num of rows/cols
    //also would prob work better to use previousGrid and get new swatch value
    //as an average of surrounding swatch values, but w/e, this works for now
    sketch.rippleGrid(pixelGrid[sketch.floor(cols/2)][sketch.floor(rows/2)]); 

    //then display and reset
    for(let x = 0; x < cols; x++){
      for(let y = 0; y < rows; y++){

        let thisPixel = pixelGrid[x][y];
        sketch.push();
        sketch.translate(thisPixel.x, thisPixel.y);
        sketch.rotate(sketch.random(rotations));
        sketch.image(ikeaPixels[thisPixel.swatch], 0, 0, pixelSize, pixelSize);
        sketch.pop();

        thisPixel.hasFlipped = false; //resetting
      }
    }   

    //ikea logo in center
    sketch.image(ikeaLogo, sketch.width/2, sketch.height/2, 3*sketch.width/4, sketch.height/3);
  }

  sketch.initGrid = (centerPixel, ring) => {
    //set up initial rings
    pixelGrid[centerPixel.id[0]][centerPixel.id[1]].hasFlipped = true;
    let pCol = centerPixel.id[0];
    let pRow = centerPixel.id[1];
    for (let i = pCol - ring; i <= pCol + ring; i++){
      if (i < 0 || i >= cols) continue; //prevent trying to access null array slots
      for (let j = pRow - ring; j <= pRow + ring; j++){
        if(j < 0 || j >= rows) continue;

        let thisPixel = pixelGrid[i][j];
        if(!thisPixel.hasFlipped){
          thisPixel.swatch = ring % ikeaPixels.length;
          thisPixel.hasFlipped = true;
        }
      }
    }
    if(ring + 1 < rows/2){
      sketch.initGrid(pixelGrid[sketch.floor(cols/2)][sketch.floor(rows/2)], ring+1);
    } else {
      // console.log("done init grid");
    }
  }

  sketch.rippleGrid = (centerPixel) => {
    let pCol = centerPixel.id[0];
    let pRow = centerPixel.id[1];

    //cycle through the 8 surrounding pixels
    for (let i = pCol - 1; i <= pCol + 1; i++){
      if (i < 0 || i >= cols) continue; //prevent trying to access null array slots
      for (let j = pRow - 1; j <= pRow + 1; j++){
        if(j < 0 || j >= rows) continue;
        if(!pixelGrid[i][j].hasFlipped){
          pixelGrid[i][j] = sketch.ripplePixelOut(pixelGrid[i][j]);
          //then continue out in all the other directions
          sketch.rippleGrid(pixelGrid[i][j]);
        }
      }
    }
  }

  //flipped so now animating from center out
  sketch.ripplePixelOut = (p) => {
    //make individual changes to color and hasFlipped
    if(p.swatch > 0){
      p.swatch--
    } else {
      p.swatch = ikeaPixels.length - 1;
    }
    p.hasFlipped = true;

    return p;
  }
}
// // where should the sketch end up in the scene:
// location = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// size = {
//   x: 1,
//   y: 1,
//   z: 1
// }
// rotation = {
//   x: 0,
//   y: 0,
//   z: 0
// }
// Add this sketch to the array:
// sketches.push({
//   sketch: myCoolSketch,
//   location: location,
//   size: size,
//   rotation: rotation
// });
//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//



// myCoolSketch = (sketch) => {
//     // add sketch 'definition' here
// }
// // where should the sketch end up in the scene:
// location = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// size = {
//   x: 1,
//   y: 1,
//   z: 1
// }
// rotation = {
//   x: 0,
//   y: 0,
//   z: 0
// }
// Add this sketch to the array:
// sketches.push({
//   sketch: myCoolSketch,
//   location: location,
//   size: size,
//   rotation: rotation
// });
//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//



// myCoolSketch = (sketch) => {
//     // add sketch 'definition' here
// }
// // where should the sketch end up in the scene:
// location = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// size = {
//   x: 1,
//   y: 1,
//   z: 1
// }
// rotation = {
//   x: 0,
//   y: 0,
//   z: 0
// }
// Add this sketch to the array:
// sketches.push({
//   sketch: myCoolSketch,
//   location: location,
//   size: size,
//   rotation: rotation
// });
//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//



// myCoolSketch = (sketch) => {
//     // add sketch 'definition' here
// }
// // where should the sketch end up in the scene:
// location = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// size = {
//   x: 1,
//   y: 1,
//   z: 1
// }
// rotation = {
//   x: 0,
//   y: 0,
//   z: 0
// }
// Add this sketch to the array:
// sketches.push({
//   sketch: myCoolSketch,
//   location: location,
//   size: size,
//   rotation: rotation
// });
//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//



// myCoolSketch = (sketch) => {
//     // add sketch 'definition' here
// }
// // where should the sketch end up in the scene:
// location = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// size = {
//   x: 1,
//   y: 1,
//   z: 1
// }
// rotation = {
//   x: 0,
//   y: 0,
//   z: 0
// }
// Add this sketch to the array:
// sketches.push({
//   sketch: myCoolSketch,
//   location: location,
//   size: size,
//   rotation: rotation
// });

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//



// myCoolSketch = (sketch) => {
//     // add sketch 'definition' here
// }
// // where should the sketch end up in the scene:
// location = {
//     x: 0,
//     y: 0,
//     z: 0
// }
// size = {
//   x: 1,
//   y: 1,
//   z: 1
// }
// rotation = {
//   x: 0,
//   y: 0,
//   z: 0
// }
// Add this sketch to the array:
// sketches.push({
//   sketch: myCoolSketch,
//   location: location,
//   size: size,
//   rotation: rotation
// });

//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//*//




// this makes the sketches available to the scene:
module.exports = sketches;
