import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import { Tree } from './components/Tree'
import Navbar from './components/Navbar'

const App = () => {
  const [present, setPresent] = useState(false)

  return (
    <div className='w-screen h-screen'>
      <Navbar setPresent={setPresent} />
      <Canvas>
        <color args={["#626F70"]} attach="background" /> {/* Make it gradient */}
        <ambientLight intensity={3} />
        <Tree />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App