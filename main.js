import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import space from "./public/8k_stars_milky_way.jpg";
import earthtex from "./public/8k_earth_daymap.jpg";
import moontex from "./public/8k_moon.jpg";
import suntex from "./public/8k_sun.jpg";
import mercurytex from "./public/8k_mercury.jpg";
import venustex from "./public/4k_venus_atmosphere.jpg";
import marstex from "./public/8k_mars.jpg";
import jupitertex from "./public/8k_jupiter.jpg";
import saturntex from "./public/8k_saturn.jpg";
import uranustex from "./public/2k_uranus.jpg";
import neptunetex from "./public/2k_neptune.jpg";
import saturnRingtex from "./public/8k_saturn_ring_alpha.png";
import uranusringtex from "./public/uranusringcolour.jpg";
import plutotex from "./public/plutomap2k.jpg";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
//rendering area
renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.setZ(30);

// document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
control.update();

const light = new THREE.PointLight(0xffffff, 5000, 30000);
light.position.set(1, 1, 1);
scene.add(light);

const lighthelper = new THREE.PointLightHelper(light);
scene.add(lighthelper);

// const ambientlight = new THREE.AmbientLight(0x333333, 1000); // soft white light
// scene.add(ambientlight);

const addstars = () => {
  const geometry = new THREE.SphereGeometry(0.25, 32, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //randfloatspread(generate -100 to 100)
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(100).fill().forEach(addstars);

const spaceTexture = new THREE.TextureLoader().load(space);
scene.background = spaceTexture;

const suntexture = new THREE.TextureLoader().load(suntex);
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(16, 30, 30),
  new THREE.MeshBasicMaterial({ map: suntexture })
);
scene.add(sun);
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([
//   space,space,space,space,space,space
// ]);

const TextureLoader = new THREE.TextureLoader();
const Planet = (size, planetTex, position, ring) => {
  const planetGeography = new THREE.SphereGeometry(size, 30, 30);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: TextureLoader.load(planetTex),
  });
  const mesh = new THREE.Mesh(planetGeography, planetMaterial);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerRad, ring.outerRad, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: TextureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringM = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringM);
    ringM.position.x = position;
    ringM.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
};

const mercury = Planet(3.2, mercurytex, 28);
const venus = Planet(5.8, venustex, 44);
const mars = Planet(4, marstex, 78);
const earth = Planet(6, earthtex, 63);
const jupiter = Planet(12, jupitertex, 100);

const saturn = Planet(10, saturntex, 138, {
  innerRad: 10,
  outerRad: 20,
  texture: saturnRingtex,
});
const uranus = Planet(7, uranustex, 176, {
  innerRad: 7,
  outerRad: 12,
  texture: uranusringtex,
});
const neptune = Planet(7, neptunetex, 200);
const pluto = Planet(2.8, plutotex, 216);

// const Moon = new THREE.Mesh(
//   new THREE.SphereGeometry(2, 30, 30),
//   new THREE.MeshStandardMaterial({ map: TextureLoader.load(moontex) })
// );
// const moonObj = new THREE.Object3D();
// moonObj.add(Moon)
// scene.add(moonObj)
// earth.add(moonObj)
// Moon.position.setZ(5);


// Mercury, Mars, Venus, Earth, Neptune, Uranus, Saturn and Jupiter
// const earthtexture = TextureLoader.load(earthtex);
// const earths = new THREE.Mesh(
//   new THREE.SphereGeometry(5, 32, 16),
//   new THREE.MeshStandardMaterial({ map: earthtexture })
// );
// const earthObj = new THREE.Object3D();
// earthObj.add(earths);
// scene.add(earthObj);
// sun.add(earthObj)
// earth.position.setZ(100);

function animate() {
  // requestAnimationFrame(animate);
  //Axis Rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  mars.mesh.rotateY(0.018);
  earth.mesh.rotateY(0.02);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  //Rotation Around the Sun
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  mars.obj.rotateY(0.008);
  earth.obj.rotateY(0.01);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  control.update();
  renderer.render(scene, camera);
}
// animate();

//renderer
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
