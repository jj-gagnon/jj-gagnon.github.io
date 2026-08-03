

/*
no AA -> 125**2
SSAA -> 33**2 at sample level 4 (what is unbiased)
smaa -> 120**2 but doesnt look good. has no settings. 
TAA -> 120**2 doesnt look goood. isnt for this scenario

okay there are other things to try but they are compicated. 
smaa from another library
fxaa






*/

import * as THREE from 'three';


import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { SSAARenderPass } from 'three/addons/postprocessing/SSAARenderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
import Stats from 'three/addons/libs/stats.module.js';
// import { color } from 'three/src/nodes/tsl/TSLCore.js';


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function main() {


    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer(
        {
            canvas: document.querySelector("canvas"),
            // precision: "lowp",
            // antialias: false,
            // maxSamples: 32
        });
    resizeRendererToDisplaySize(renderer)


    let fov = 30
    const aspect = renderer.domElement.width / renderer.domElement.height; // the canvas default


    const near = 0.1;
    const far = 10000000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // let orth_h = 10/2
    // let orth_w = orth_h * aspect
    // const camera = new THREE.OrthographicCamera(orth_w,orth_w*-1,orth_h,orth_h*-1,0.1, 100000)



    let z = 10 / (2 * Math.tan(THREE.MathUtils.degToRad(fov * 0.5)))
    console.log(z)
    camera.position.z = z


    let height = 10
    let width = height * aspect


    const scene = new THREE.Scene();

    {

        const color = 0xFFFFFF;
        const intensity = 3;
        // const light = new THREE.DirectionalLight(color, intensity); //dont need this for NormalMaterial
        // const light = new THREE.(color, intensity);
        // light.position.set(- 1, 2, 4);
        // scene.add(light);

    }
    var total_pixels = innerHeight * innerWidth
    console.log("total pixels")
    console.log(total_pixels)


    const box_size = 0.3;
    // let num_cubes = Math.pow(100
    // , 2)
    let num_cubes = total_pixels / 55
    let r = 40

    const geometry = new THREE.BoxGeometry(box_size, box_size, box_size);

    
    const material = new THREE.MeshNormalMaterial(); // greenish blue
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff88}); // greenish blue
    
    // const cube = new THREE.Mesh(geometry, material);
    let i_cubes = new THREE.InstancedMesh(geometry, material, num_cubes)
    scene.add(i_cubes)

    let dummy = new THREE.Object3D()

    let new_cube
    for (let i = 0; i < num_cubes; i++) {

        dummy.matrix.identity().decompose(dummy.position, dummy.quaternion, dummy.scale)

        // new_cube = cube.clone()
        // new_cube.translateX((width / num_cubes) * i)
        // new_cube.translateY((height / num_cubes) * j * -1)
        dummy.translateX(Math.random() * width - width / 2)
        dummy.translateY(Math.random() * height - height / 2)
        dummy.updateMatrix()

        i_cubes.setMatrixAt(i, dummy.matrix)

    }
    dummy.matrix.identity().decompose(dummy.position, dummy.quaternion, dummy.scale)
    i_cubes.setMatrixAt(0, dummy.matrix)



    // let s = THREE.MathUtils.randFloat(0.1, 1)
    // new_cube.scale.setScalar(s)
    // new_cube.translateZ(((box_size*s) - box_size) / -2)

    // scene.add(new_cube);





    const composer = new EffectComposer(renderer);


    const ssaaRenderPass = new SSAARenderPass(scene, camera); // SSAA
    composer.addPass(ssaaRenderPass);
    ssaaRenderPass.sampleLevel = 4
    ssaaRenderPass.unbiased = true
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // composer.addPass(new RenderPass(scene, camera));
    // let smaaPass = new SMAAPass();
    // composer.addPass(smaaPass);
    // const outputPass = new OutputPass();
    // composer.addPass(outputPass);

    // const TaaRenderPass = new TAARenderPass(scene, camera); // TAA
    // composer.addPass(TaaRenderPass);
    // const outputPass = new OutputPass();
    // composer.addPass(outputPass);


    // renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(1);


    let matrix = new THREE.Matrix4()



    resizeCanvasToDisplaySize();


    function render(time) {
        stats.update()

        time *= 0.001; // convert time to seconds
        let rot = time / r
        for (let i = 0; i < num_cubes; i++) {

            i_cubes.getMatrixAt(i, matrix);
            matrix.decompose(dummy.position, dummy.rotation, dummy.scale);

            // dummy.rotation.x = rot
            // dummy.rotation.y = rot * 1.5
            // dummy.rotation.z = rot * 2

            dummy.rotation.set(rot, rot * 1.5, rot * 3)

            dummy.updateMatrix();
            i_cubes.setMatrixAt(i, dummy.matrix);

            // rot += 0.000001

        }
        i_cubes.instanceMatrix.needsUpdate = true;

        renderer.render(scene, camera);
        // composer.render()

        requestAnimationFrame(render);

    }

    requestAnimationFrame(render);











    function resizeCanvasToDisplaySize() {
        const canvas = renderer.domElement;
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // adjust displayBuffer size to match
        if (canvas.width !== width || canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // update any render target sizes here
        }
    }

}

main();
