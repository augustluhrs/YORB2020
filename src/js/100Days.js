import { Vector3 } from "three"
import * as THREE from 'three'

import debugModule from 'debug'
const log = debugModule('YORB:100DaysGallery')

const {AsyncNedb} = require('nedb-async');

const testLinks = [
    ["https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129771102_172565317903921_8963306056365422869_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=EOmLsa3Nm6IAX-l8dV6&tp=1&oh=04894bb8d93b8e87ef1644377698893c&oe=601F5AA4","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129496253_745472642729400_2979908031349605450_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=veYMiKO09JwAX8ykUVy&tp=1&oh=40714fd893c874225816b9fb19831b6b&oe=6020BE8E","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129173301_830536747797199_3300187799722435798_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=6hX_T_dsGUMAX98AT1M&tp=1&oh=9ba140db70cd3042528ed12df4232b06&oe=601F9DFA","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/128847084_2786656798275429_2544653050288040250_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=fuuTX49JIT4AX9rspf5&tp=1&oh=39c37a33090d19c724e5719687023f51&oe=601E973B","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129717739_764729500793421_3824621950941653630_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=r0QlUOyVVI8AX-n5ucz&tp=1&oh=adcd03e21be7ec049afd80ffd914c910&oe=601F57D4","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/128859579_784683118748075_1417964362507447870_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=VW_nWxWBMA8AX_uTwga&tp=1&oh=fc4fff5a5cac013abed820c239415855&oe=60200B37","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/129757257_754002432129780_2024236094541114682_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=NR-RS2C62VAAX_xIVca&tp=1&oh=19db2b071ce8c22a72da2627e9f6685a&oe=60215D33"],
    ["https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/96946702_3088474341214360_2806874340001197113_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=n58D6CQUBnYAX9EihTt&tp=1&oh=0f8eeca45d29f57b95337e4214c0a717&oe=601F1BAA","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/96528258_2865496480214202_5933048801290201796_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=t-GMz9FMtpgAX_KWLIi&tp=1&oh=6b87f3eaf8c39943691d10614aea0ead&oe=601E6F81","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/97239471_166148571540318_4503873148909694748_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=-ZBQxW6vXi0AX_RM1pV&tp=1&oh=7c0bf637d16e22e7f6717d9c8df0ebfd&oe=602154C4","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/98103790_172060270823967_5081431427271494489_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=AcftuGqmXhMAX-e1hw_&tp=1&oh=4cbd3b4c343d413b66f7330890c2f385&oe=601FACF7"],
    ["https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/60859330_354277701803365_2627649346990175660_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=-BLbn1PfWIcAX8-hMDm&tp=1&oh=e3c8e3f5f3424ee23c081bcd7ba96263&oe=6020C7BB","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/61307600_121351745748375_8015350839975645099_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=7vGrfyh35DAAX8TQ2Tk&tp=1&oh=77f0a835221be89a16a8e8923d5aa8dd&oe=601F6FD7","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/61007416_901482146889236_7031972543905891810_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=bW1OwoZKugIAX8HZ1M8&tp=1&oh=30e2b1d85372dab7f9ee894f426bb964&oe=601F353D"],
    ["https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/59483137_293013761637241_6919104078959228835_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=lo2JVd8bDLEAX-bSoKw&tp=1&oh=2e115c33c23134a4fbb7d478162428c8&oe=601E241C","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/58809703_324319048242421_2940496488137283514_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=5ZJWfK7LmDkAX9eLlTr&tp=1&oh=f6fbcd2daf5f19ef9240d2afc8091ba8&oe=601DD279"],
    ["https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/55742633_587080988439344_46306404217687397_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=reT_0gAvwvkAX_6CfaB&tp=1&oh=c6851409abc5764c2824f1c5a71d6921&oe=602083E2","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/56606539_399961357491371_4402278464316000256_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=L-FACppKH7MAX_kCCP6&tp=1&oh=ee0ca2a87e6f589f1baf0bef4795bdbe&oe=60200725","https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/54512096_375165669738495_8698128148925373165_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=ye3xqLQ4Cs8AX9gnkgO&tp=1&oh=08b48a5299fdd87ecbffa3ce55094162&oe=601DD0B3"],
    ["https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/117425065_600693937311996_5965875193126251966_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=FNuzB8USJJ4AX9iMO76&tp=1&oh=779309baa20790c9e6c6cda0ea3a0755&oe=601DB581"]
]

export class DaysGallery {
    constructor(scene, location) {
        this.scene = scene
        this.location = {}
        // this.db = new AsyncNedb({filename: "YORB2020/src/assets/images/100Days/test.db", autoload: true})
        // console.log('db: ' + this.db)
        //location classrooms or outside (default)
        if (location == 'classrooms'){
            console.log('no classroom mode yet')
            return
        } else {
            this.location.center = new Vector3(40.5, 0, 0);
            this.location.width = 2; //x
            this.location.depth = 2; //z
            this.location.height = 10; //y
        }

        //create gallery canvases based on db links

    }

    // async setupGrid(){
    setupGrid(){
        // console.log('set up gallery grid')
        // let bDocs = await this.db.asyncFind({type: 'B'});
        // console.log('after db load: ' + bDocs.length)
        //laborious way for now
        let index = 0;
        let xIndex = 0;
        let yIndex = 0;
        let zIndex = 0;
        // for (let b of bDocs){ //for each post b, find photos p
            // for (let p of b.links.imgs) { //just photos for now

        for (let b of testLinks){
            // log('b: ' + JSON.stringify(b));
            for (let p of b){
                //loading photo from url
                const photoTexture = new THREE.TextureLoader().load(p)
                // const photoTexture = new THREE.TextureLoader().load("https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/55742633_587080988439344_46306404217687397_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=reT_0gAvwvkAX_6CfaB&tp=1&oh=c6851409abc5764c2824f1c5a71d6921&oe=602083E2")

                //set up photo cube
                const photoGeometry = new THREE.BoxGeometry(1,1,1)
                const photoMaterial = new THREE.MeshBasicMaterial({map: photoTexture})
                var dayCanvas = new THREE.Mesh(photoGeometry, photoMaterial)

                //go along the grid set up in this.location
                if (index % (this.location.width * this.location.depth) == 0) {
                    yIndex++
                    xIndex = 0
                    zIndex = 0
                } else if (index % this.location.width == 0) {
                    xIndex = 0
                    zIndex++
                } else {
                    xIndex++
                }
                // log('index: ' + index + " " + xIndex + " " + yIndex + " " + zIndex)
                index++
            

                dayCanvas.position.set(
                    this.location.center.x + xIndex,
                    this.location.center.y + yIndex,
                    this.location.center.z + zIndex
                    )

                //add to scene
                this.scene.add(dayCanvas)
            }
        }
    }

    setupTest(){ //add to the scene

        // create the video element from url
        let protoVideo = document.createElement( 'video' )
        protoVideo.setAttribute('id', 'protoVideo')
        protoVideo.src = "https://scontent-lga3-1.cdninstagram.com/v/t50.2886-16/125367180_843826916364667_3564841615660490363_n.mp4?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=ImHrFkZ1GVkAX_-q_Ug&oe=5FB6A187&oh=51e86203ab5bf76414f27be6b0110138"
        protoVideo.load() // must call after setting/changing source
        protoVideo.loop = true
        protoVideo.play()

        //loading video into texture
        const protoVideoTexture = new THREE.VideoTexture( document.getElementById('protoVideo'))


        //loading photo from url
        // const protoTexture = new THREE.TextureLoader().load("https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/125364127_1230307457348884_674277153923938623_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=twpkkEj5BDAAX_svcnq&tp=18&oh=883284a6619ab238bde83e5cb291814f&oe=5FDD0EEE")
        const protoTexture = new THREE.TextureLoader().load("https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/55742633_587080988439344_46306404217687397_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=reT_0gAvwvkAX_6CfaB&tp=1&oh=c6851409abc5764c2824f1c5a71d6921&oe=602083E2")

        //set up proto cube
        const protoGeometry = new THREE.BoxGeometry(1,1,1)
        const protoMaterial = new THREE.MeshBasicMaterial({map: protoVideoTexture})
        // const protoMaterial = new THREE.MeshBasicMaterial({map: protoTexture})


        var dayProto = new THREE.Mesh(protoGeometry, protoMaterial)

        dayProto.position.set(
            4.5,
            .5,
            0.5
        )
        // dayProto.position.set(this.location.center);

        this.scene.add(dayProto)
        console.log("PROTOTYPE ADDED")
    }

  
}