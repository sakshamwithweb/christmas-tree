import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { Tree } from './components/Tree'
import Navbar from './components/Navbar'
import Items from './components/Items'
import { Ball } from './components/Balls.'

const App = () => {
  const [present, setPresent] = useState(false)

  return (
    <div className='w-screen h-screen'>
      <Navbar present={present} setPresent={setPresent} />
      <Canvas>
        <color args={["#626F70"]} attach="background" /> {/* Make it gradient */}
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} decay={0} intensity={2} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={2} />
        {/* <Tree /> */}
        <Ball />
        <OrbitControls enableDamping />
      </Canvas>
      <Items />
    </div>
  )
}

export default App