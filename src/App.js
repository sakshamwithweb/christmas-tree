import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const App = () => {
  return (
    <div className='text-5xl bg-black w-screen h-screen text-white'>
      <Canvas>
        <ambientLight />
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
          <OrbitControls />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App