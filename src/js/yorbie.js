/*
*
*
*/
import * as THREE from "three";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const yorbieModel = require('../assets/models/yorbie.glb');






export class Yorbie {
    constructor (scene, position) {

        this.scene = scene;
        this.model = yorbieModel;
        this.position = position;
        this.modelLoader = new GLTFLoader();
        this.yorbie;
        this.loadYorbie(this.model);
    // this code will be called once inside of the 'addYORBParts()' function
    // in the yorb.js file
    
    // let geometry = new THREE.BoxGeometry(1,1,1);
    // let material = new THREE.MeshNormalMaterial();
    
    // myMesh = new THREE.Mesh(geometry, material);

    // scene.add(myMesh);
    }

    loadYorbie(modelPath) {
        this.modelLoader.load(
            modelPath,
            (gltf) => {
                this.yorbie = gltf.scene;
                this.yorbie.position.set(this.position.x, this.position.y, this.position.z)
                this.yorbie.scale.set(.005, .005, .005);
                this.yorbie.lookAt(new Vector3(15,0,-2))
                this.yorbie.traverse((child) => {
                    if (child.isMesh) {
                        // child.material = _material
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                })
                this.scene.add(this.yorbie);
            },
            undefined,
            function (e) {
                // log('trying to load yorbie');
                console.error(e);
            }
        )
    }

    updateYorbie(lookTarget){
        // console.log(this.yorbie.rotation);
        // console.log(lookTarget);
        this.yorbie.lookAt(lookTarget);
        // console.log(this.yorbie.rotation);
        this.yorbie.position.set = this.yorbie.position.lerp(lookTarget, .05);
        

    }
}