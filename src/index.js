// THREE.js Environment is made up of 5 things:
// - Renderer (what the user sees)
// - Scene (the data)
// - Camera (the perspective)
// - Meshes (the objects in the 3D world)
// - Lights

// console.log(process.env.API_KEY);

const THREE = require("three");
const orbit = require("three-orbitcontrols");

function createRenderer() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d");
  renderer.setPixelRatio(window.devicePixelRatio);

  let output = document.querySelector("#output");

  output.appendChild(renderer.domElement);

  return renderer;
}

function createScene() {
  return new THREE.Scene();
}

function createCamera() {
  let camera = new THREE.PerspectiveCamera(
    45, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near value
    1000 // Far value
  );

  camera.position.set(-30, 40, 30); // x(red), y(green), z(blue)
  camera.lookAt(0, 0, 0);

  return camera;
}

function createAxesHelper() {
  let axesHelper = new THREE.AxesHelper(40);
  return axesHelper;
}

function getRandomColor() {
  let colors = [
    "dodgerblue",
    "tomato",
    "limegreen",
    "rebeccapurple",
    "gold",
    "lavender",
    "lightcoral",
    "papayawhip",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}

function createCube() {
  // Geometry - The actual shape/skeleton of the object
  let geometry = new THREE.BoxGeometry(4, 4, 4);

  // Material - The colour/how it interacts with light
  let material = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  }); // Material that will respond to light

  // Create a mesh by combining the geometry and material
  let mesh = new THREE.Mesh(geometry, material);

  // Return it, so that we can add it to the scene
  return mesh;
}

function createSphere() {
  let geo = new THREE.SphereGeometry(4, 30, 30); // Geometry
  let mat = new THREE.MeshBasicMaterial({
    color: getRandomColor(),
  }); // Material that won't respond to light
  let mesh = new THREE.Mesh(geo, mat); // Mesh

  return mesh; // Return the mesh
}

function createLight() {
  let light = new THREE.PointLight("white", 1.2);
  return light;
}

function createLightHelper(light) {
  let helper = new THREE.PointLightHelper(light);
  return helper;
}

let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

let controls = new orbit(camera, renderer.domElement);

light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

sphere.position.x = 20;

let cubes = [];
let cubeCount = 500;

for (let i = 1; i <= cubeCount; i += 1) {
  let c = createCube();
  c.position.x = Math.random() * 400 - 200; // Puts cube on x-axis some where between -200 and 200
  c.position.y = Math.random() * 400 - 200; // Puts cube on x-axis some where between -200 and 200
  c.position.z = Math.random() * 400 - 200; // Puts cube on x-axis some where between -200 and 200
  cubes.push(c);
}

scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper, ...cubes); // ... spread operator that helps to add all elements in the cubes array
renderer.render(scene, camera);

function animate() {
  //   cube.position.x += 0.1;
  //   cube.scale.x += 0.1;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  cubes.forEach(function (c) {
    c.rotation.x += 0.01;
    c.rotation.y += 0.01;
    c.rotation.z += 0.01;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate); // Call animate as soon as possible
}

animate();
