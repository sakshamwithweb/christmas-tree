import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import { Items } from './components/Items'
import { Ball } from './components/Balls'
import { BallImg } from './components/BallImg'

const App = () => {
  const [present, setPresent] = useState(false)

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
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <color args={["white"]} attach="background" />
        <ambientLight intensity={3} />
        <pointLight position={[-10, 0, 0]} decay={0} intensity={5} />
        <pointLight position={[10, 0, 0]} decay={0} intensity={5} />
        {/* <Tree /> */}
        {/* <Ball ornamentsList={ornamentsList} position={[0.48, 0.15, 0.31]} /> */}
        <BallImg ornamentsList={ornamentsList} />
        <OrbitControls enableDamping />
        {/* <gridHelper /> */}
      </Canvas>
      <Items ornamentsList={ornamentsList} />
    </div>
  )
}

export default App