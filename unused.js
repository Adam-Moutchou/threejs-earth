function createSkyBox() {
    const sphereGeometry = new THREE.SphereGeometry(500, 500, 500);

    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({ map: textureLoader.load('/assets/space-skybox/space_ft.png'), side: THREE.BackSide });
    
    console.log(material); // For debugging

    const skyBox = new THREE.Mesh( sphereGeometry, material );

    scene.add(skyBox);
}

createSkyBox();