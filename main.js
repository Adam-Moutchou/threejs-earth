import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild(renderer.domElement);

// Allow the camera to orbit around a target
const controls = new OrbitControls( camera, renderer.domElement );


camera.position.set(0, 0.5, 30); // Set camera position

// Adds light
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(15, 25, 55);
scene.add(light);


// Returns that path of all existing models
function getModelsScenePaths() {
    const modelsDir = './assets/models/';
    // The models folders names located inside the 'models' folder
    const modelsNames = ["earth", "stars"];
    const modelsPaths = [];
    
    for(let i=0; i < modelsNames.length; i++) {
        let path = `${modelsDir}${modelsNames[i]}/scene.gltf`;
        modelsPaths.push(path);
    }
    
    console.log(modelsPaths) // For debugging
    
    return modelsPaths;
}

// Initializing the GLTF Loader
const gltfLoader = new GLTFLoader();

let model;

// Load the .GLTF file(model)
function loadModels() {
    const modelsPaths = getModelsScenePaths();

    for(let i=0; i < modelsPaths.length; i++) {
        gltfLoader.load(modelsPaths[i], function(gltf) {
            model = gltf.scene;
            
            scene.add(model);
        
            animate();
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }, 
        
        function (error){
            console.log('an error Occured :(');
            console.log(error);
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Spins the model
    if(model) {
        model.rotation.y += 0.005;
    }
    
    controls.update();
    
    renderer.render(scene, camera);
}


loadModels();