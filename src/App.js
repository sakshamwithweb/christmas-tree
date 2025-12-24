import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Tree } from './components/Tree'
import Tree1 from './components/Tree1'

const App = () => {
  return (
    <div className='text-5xl w-screen h-screen'>
      <Canvas>
        <color args={["pink"]} attach="background" />
        <ambientLight />
        {/* <pointLight/> */}
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color={"blue"} />
        </mesh>
        {/* <Tree /> */}
        <Tree1/>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App