import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import { Items } from './components/Items'
import { BallImg } from './components/BallImg'
import { Balls } from './components/Balls'
import { Tree } from './components/Tree'
import { Matrix3, Vector2 } from 'three'

const App = () => {
  const [present, setPresent] = useState(false)
  const images = useRef([])
  const [areImgAvailable, setAreImgAvailable] = useState(false)
  const [loadOrnaments, setLoadOrnaments] = useState([])
  const raycaster = useRef()
  const cameraRef = useRef()
  const controls = useRef()
  const coords = useMemo(() => new Vector2(), [])
  const treeRef = useRef()
  const mouseHelper = useRef()
  const selectedOrnamentMatrix = useRef()

  useEffect(() => { /* Checking are images available */
    setInterval(() => {
      if (images.current.length === ornamentsList.length) setAreImgAvailable(true)
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadOrnament = (ornament) => {
    setLoadOrnaments([...loadOrnaments, { ornament: ornament, loaded: false, uid: Math.floor(Math.random() * 10000) }])
  }

  const handlePointerMove = ({ clientX, clientY }) => {
    const rc = raycaster.current
    if (!rc || !treeRef.current) return

    coords.x = (clientX / window.innerWidth) * 2 - 1
    coords.y = -((clientY / window.innerHeight) * 2 - 1)

    rc.setFromCamera(coords, cameraRef.current)

    const intersects = rc.intersectObject(treeRef.current, true)

    if (intersects.length > 0) {
      const p = intersects[0].point;
      mouseHelper?.current.position.copy(p)

      const normalMatrix = new Matrix3().getNormalMatrix(treeRef?.current.matrixWorld)

      const n = intersects[0].face.normal.clone()
      n.applyNormalMatrix(normalMatrix)
      n.multiplyScalar(10)
      n.add(intersects[0].point)
      mouseHelper.current.lookAt(n)

      if (selectedOrnamentMatrix.current) selectedOrnamentMatrix.current.setPosition(p.x, p.y, p.z)
    }
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

      <Canvas onPointerMove={handlePointerMove} gl={{ preserveDrawingBuffer: true }}>
        <color args={["gray"]} attach="background" />

        <group> {/* Lights */}
          <ambientLight intensity={3} />
          <pointLight position={[-10, 0, 0]} decay={0} intensity={5} />
          <pointLight position={[10, 0, 0]} decay={0} intensity={5} />
        </group>

        {!areImgAvailable ? <BallImg images={images} ornamentsList={ornamentsList} /> : <Tree treeRef={treeRef} />}

        <Balls treeRef={treeRef} raycaster={raycaster} selectedOrnamentMatrix={selectedOrnamentMatrix} controls={controls} setLoadOrnaments={setLoadOrnaments} loadOrnaments={loadOrnaments} />

        <raycaster ref={raycaster} />
        <mesh ref={mouseHelper} scale={0.02}>
          <boxGeometry args={[0.1, 0.1, 5]} />
          <meshNormalMaterial />
        </mesh>

        <PerspectiveCamera position={[0, 0, 6]} makeDefault ref={cameraRef} />
        <OrbitControls ref={controls} enablePan={false} />
      </Canvas>
      <Items loadOrnament={loadOrnament} areImgAvailable={areImgAvailable} images={images} ornamentsList={ornamentsList} />
    </div>
  )
}

export default App