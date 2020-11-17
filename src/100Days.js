const THREE = require("./libs/three.min.js");

export class Days {
  constructor(scene, camera, controls) {
      this.scene = scene;
      this.camera = camera;
      this.controls = controls;

  }

  setup(){ //add to the scene

    // create the video element from url
    let protoVideo = document.createElement( 'video' );
    protoVideo.setAttribute('id', 'protoVideo');
    protoVideo.src = "https://scontent-lga3-1.cdninstagram.com/v/t50.2886-16/125367180_843826916364667_3564841615660490363_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=ImHrFkZ1GVkAX_-q_Ug&oe=5FB6A187&oh=51e86203ab5bf76414f27be6b0110138";
    protoVideo.load(); // must call after setting/changing source
    protoVideo.loop = true;
    protoVideo.play();

    //loading video into texture
    const protoVideoTexture = new THREE.VideoTexture( document.getElementById('protoVideo'));


    //loading photo from url
    const protoTexture = new THREE.TextureLoader().load("https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/125364127_1230307457348884_674277153923938623_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=twpkkEj5BDAAX_svcnq&tp=18&oh=883284a6619ab238bde83e5cb291814f&oe=5FDD0EEE")

    //set up proto cube
    const protoGeometry = new THREE.BoxGeometry(1,1,1);
    // const protoMaterial = new THREE.MeshBasicMaterial({map: protoVideoTexture});
    const protoMaterial = new THREE.MeshBasicMaterial({map: protoTexture});


    var dayProto = new THREE.Mesh(protoGeometry, protoMaterial);

    dayProto.position.set(
        60.5,
        .5,
        0.5
    );

    this.scene.add(dayProto);
    console.log("PROTOTYPE ADDED")
  }
}