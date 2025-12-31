import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { Items } from './components/Items'
import { BallImg } from './components/BallImg'
import { Balls } from './components/Balls'
import { Return } from 'three/tsl'
import { Vector3 } from 'three'

const App = () => {
  const [present, setPresent] = useState(false)
  const images = useRef([])
  const [areImgAvailable, setAreImgAvailable] = useState(false)
  const [loadOrnaments, setLoadOrnaments] = useState([])
  const raycaster = useRef()
  const [selectedBall, setSelectedBall] = useState()
  const cameraRef = useRef()
  const vec = new Vector3();
  const pos = new Vector3();
  // const num = useRef(0)

  useEffect(() => { /* Checking are images available */
    setInterval(() => {
      if (images.current.length === ornamentsList.length) setAreImgAvailable(true)
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadOrnament = (ornament) => {
    setLoadOrnaments([...loadOrnaments, { ornament: ornament, loaded: false, uid: Math.floor(Math.random() * 10000) }])
  }

  const handleMouseMove = ({ clientX, clientY }) => { // Sync in with the ball
    if (!selectedBall) return

    // Get mouse coords (between -1 and 1)
    const x = (clientX / window.innerWidth) * 2 - 1
    const y = - ((clientY / window.innerHeight) * 2 - 1)

    // Convert mouse coords into ball position
    vec.set(x, y, 0); // Make 3d vector for mouse
    vec.unproject(cameraRef.current); // Cnvrt to real world coords
    vec.sub(cameraRef.current.position).normalize(); // Subtract camera position to convert the world point into a ray direction from the camera, then normalize it
    var distance = - cameraRef.current.position.z / vec.z; // ray equation = P(t) = cameraPosition + vec * t || t tells How far travel from camera position. We wanna travel z = 0, so P(t) = 0, 0 =  cameraPosition + vec * t, - cameraPosition =  vec * t, hence: -cameraPosition / vec = t
    pos.copy(cameraRef.current.position).add(vec.multiplyScalar(distance))

    // Assign the position to ball
    // num.current += 0.01
    selectedBall.ornament.position.set(pos.x, pos.y, pos.z)
  }

  const ornamentsList = useMemo(() => [ // Got from Balls.jsx
    {
      "label": "Ruby",
      "geometry": {
        "Pallina_natalizia_01_0": "Materiale_220",
        "Pallina_natalizia_01_1": "Materiale_221"
      }
    },
    {
      "label": "Crimson",
      "geometry": {
        "Pallina_natalizia_02_0": "Materiale_220",
        "Pallina_natalizia_02_1": "Materiale_226",
        "Pallina_natalizia_02_2": "Materiale_231",
        "Pallina_natalizia_02_3": "Materiale_221"
      }
    },
    {
      "label": "Goldwave",
      "geometry": {
        "Pallina_natalizia_03_0": "Materiale_234",
        "Pallina_natalizia_03_1": "Materiale_221"
      }
    },
    {
      "label": "Lilac",
      "geometry": {
        "Pallina_natalizia_04_0": "Materiale_228",
        "Pallina_natalizia_04_1": "Materiale_227",
        "Pallina_natalizia_04_2": "Materiale_229",
        "Pallina_natalizia_04_3": "Materiale_224"
      }
    },
    {
      "label": "Goldtwist",
      "geometry": {
        "Pallina_natalizia_05_0": "Materiale_226",
        "Pallina_natalizia_05_1": "Materiale_233",
        "Pallina_natalizia_05_2": "Materiale_221"
      }
    },
    {
      "label": "Nebula",
      "geometry": {
        "Pallina_natalizia_06_0": "Materiale_223",
        "Pallina_natalizia_06_1": "Materiale_224"
      }
    },
    {
      "label": "Frost",
      "geometry": {
        "Pallina_natalizia_07_0": "Materiale_220",
        "Pallina_natalizia_07_1": "Materiale_225",
        "Pallina_natalizia_07_2": "Materiale_230",
        "Pallina_natalizia_07_3": "Materiale_221"
      }
    },
    {
      "label": "Sapphire",
      "geometry": {
        "Pallina_natalizia_08_0": "Materiale_238",
        "Pallina_natalizia_08_1": "Materiale_221"
      }
    },
    {
      "label": "Peppermint",
      "geometry": {
        "Pallina_natalizia_09_0": "Materiale_236",
        "Pallina_natalizia_09_1": "Materiale_237"
      }
    },
    {
      "label": "Plum",
      "geometry": {
        "Pallina_natalizia_10_0": "Materiale_235",
        "Pallina_natalizia_10_1": "Materiale_224"
      }
    },
    {
      "label": "Obsidian",
      "geometry": {
        "Pallina_natalizia_11_0": "Materiale_224"
      }
    },
    {
      "label": "Snowspin",
      "geometry": {
        "Pallina_natalizzia_12_0": "Materiale_224",
        "Pallina_natalizzia_12_1": "Materiale_229",
        "Pallina_natalizzia_12_2": "Materiale_239",
        "Pallina_natalizzia_12_3": "Materiale_240"
      }
    }
  ], [])

  return (
    <div className='w-screen h-screen'>
      <Navbar present={present} setPresent={setPresent} />

      <Canvas onPointerMove={handleMouseMove} gl={{ preserveDrawingBuffer: true }}>
        <color args={["gray"]} attach="background" />

        <group> {/* Lights */}
          <ambientLight intensity={3} />
          <pointLight position={[-10, 0, 0]} decay={0} intensity={5} />
          <pointLight position={[10, 0, 0]} decay={0} intensity={5} />
        </group>

        {!areImgAvailable ? <BallImg images={images} ornamentsList={ornamentsList} /> : <></>} {/* <Tree /> */}

        <Balls selectedBall={selectedBall} setSelectedBall={setSelectedBall} setLoadOrnaments={setLoadOrnaments} raycaster={raycaster} loadOrnaments={loadOrnaments} />


        <raycaster ref={raycaster} />

        <PerspectiveCamera position={[0, 0, 5]} makeDefault ref={cameraRef} />
        <gridHelper />
        <OrbitControls enableDamping />
      </Canvas>
      <Items loadOrnament={loadOrnament} areImgAvailable={areImgAvailable} images={images} ornamentsList={ornamentsList} />
    </div>
  )
}

export default App