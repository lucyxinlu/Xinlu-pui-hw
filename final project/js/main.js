

//Here are some resources that I've used as a reference:
//ThREE library documentation---https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
//Example that I've found online---https://blog.csdn.net/yinge0508/article/details/123272175

// set the renderer
let renderer;
width=document.getElementById('container').clientWidth;
height=document.getElementById('container').clientHeight;
function rendererSetting(){


    // width=document.getElementById('container').clientWidth;
    // height=document.getElementById('container').clientHeight;

    renderer=new THREE.WebGLRenderer({antialias:true});
    
    renderer.setSize(width,height);

    document.getElementById('container').appendChild(renderer.domElement);
    
    renderer.setClearColor(0x000000,1.0);
}

// rendererSetting()





// set camera
let camera;
let controls;
function cameraSetting(){

    camera=new THREE.PerspectiveCamera(45,width/height,0.1,1000);
    // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    controls=new THREE.OrbitControls(camera,renderer.domElement);
    
    camera.position.x=0;
    camera.position.y=5;
    camera.position.z=20;
    // controls.update();

    // camera.up.x=0;
    // camera.up.y=1;
    // camera.up.z=0;
    // camera.lookAt({x:0,y:0,z:0});

}
// controls.addEventlisterner("change", renderer)
function onWindowResize(){
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width,height);
}

// set scene;
let scene;
function sceneSetting(){
    
    scene=new THREE.Scene();
    let textureLoader=new THREE.TextureLoader();
    let select=document.querySelector("#background");
  let choice=select.options[select.selectedIndex].value;
  console.log(choice);
    let texture=textureLoader.load(choice);
    scene.background=texture
}
// set light;
let light;

function lightSetting(){
    light=new THREE.DirectionalLight(0xffffff,1.0,0);
    light.position.set(200,200,200);
    scene.add(light);

}

var group = new THREE.Group();
    let N = 512; 
// set the color picker
let colorInput=document.querySelector("#color");
let hexInput= document.querySelector('#hex');

colorInput.addEventListener("input",()=>{
  let color=colorInput.value;
  console.log("changed");
  hexInput.value=color;
  myFunction();
});
// set the object on the scene

function objectSetting(){

   group = new THREE.Group();
  // let N = 512;  
  let select=document.querySelector("#patternChoice");
  let value=select.options[select.selectedIndex].value;
  console.log(value);
  console.log(hexInput.value);
    if (value=="bar"){
      for (let i = 0; i < N / 2; i++) {
        let object = new THREE.BoxGeometry(1, 1, 6); //create bar pattern 
        let material = new THREE.MeshPhongMaterial({color: hexInput.value}); //the material
        console.log(hexInput.value);
        let mesh = new THREE.Mesh(object, material); //create the object
        mesh.position.set(2 * i - N / 2 * 1, 0, 0)
        group.add(mesh)
        material.needsUpdate = true

      }
    }else if(value=="bowknot"){
      for (let i = 0; i < N / 2; i++) {
        const object = new THREE.TorusKnotGeometry( 1, 1, 3, 4 );//create bowknot pattern
        let material = new THREE.MeshPhongMaterial({color: hexInput.value}); //the material
        let mesh = new THREE.Mesh(object, material); //create the object
        mesh.position.set(2 * i - N / 2 * 0.1, 0, 0)
        group.add(mesh)
        material.needsUpdate = true

      }
    }else if(value=="traingle"){
      for (let i = 0; i < N / 2; i++) {
        let object=new THREE.CircleGeometry(2,3,0); //create traingle pattern
        let material = new THREE.MeshToonMaterial({color: hexInput.value}); //the material
        let mesh = new THREE.Mesh(object, material); //create the object
        mesh.position.set(2 * i - N / 2 * 0.2, 0, 0)
        group.add(mesh)
        material.needsUpdate = true
      }
    }else if(value=="ring"){
      for (let i = 0; i < N / 2; i++) {
        const object = new THREE.RingGeometry( 0.5, 1, 15);//create ring pattern
        let material = new THREE.MeshToonMaterial({color: hexInput.value}); //material
        let mesh = new THREE.Mesh(object, material); //create the object
        mesh.position.set(2 * i - N / 2 * 0.2, 0, 0)
        group.add(mesh)
        material.needsUpdate = true
      }
    }
    scene.add(group)   
}

var analyser = null; // declare the analyser
function render() {
    console.log('rendering')
     //excute the render
    requestAnimationFrame(render); 
    controls.update();

    renderer.render(scene, camera);
    if (analyser != null) {
    

      var arr = analyser.getFrequencyData();
      group.children.forEach((elem, index) => {
        elem.scale.y = arr[index] / 80
        elem.material.color.r = arr[index] / 200;
        
      });
    }
    window.addEventListener('resize', onWindowResize, true);
   
  }

// excute the visualization part

function _play(){ 
    rendererSetting();
    cameraSetting();
    sceneSetting();
    lightSetting();
    objectSetting();
    renderer.clear();
    render();
}

// get the audio file input and its frequency data
const listener = new THREE.AudioListener();
const audio = new THREE.Audio( listener );


document.querySelector( '#thefile' ).addEventListener( 'change', function ( event ) {

	const files = event.target.files;
  console.log(files);
  const reader = new FileReader();
  console.log(reader);
	
  reader.onload = function( file ) {

    var arrayBuffer = file.target.result;
		
		listener.context.decodeAudioData( arrayBuffer, function ( audioBuffer ) {

			audio.setBuffer( audioBuffer );

		} );
    analyser = new THREE.AudioAnalyser(audio,2*N);
  }

  reader.readAsArrayBuffer( files[ 0 ] );

}, false );



// create the button for pause and stop
let play=document.querySelector("#playBtn");
let numOfClick=0;
play.addEventListener('click',function(){
   numOfClick=numOfClick+1;
   if (numOfClick<=1){
    _play();
    audio.play();
   }else{
     render();
     audio.play();
   }
    
})
    


let pause=document.querySelector("#pauseBtn");
pause.addEventListener('click',function(){
  audio.pause();
})

function myFunction(){
  if (audio.isPlaying){
    cameraSetting();
    sceneSetting();
    lightSetting();
    objectSetting();
    renderer.clear();
    render();
  }
}


// if ((audio.isPlaying==true)&& ()){
//   render();

// }

