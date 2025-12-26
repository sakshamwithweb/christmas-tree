import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import {Items} from './components/Items'
import { Ball } from './components/Balls.'

const App = () => {
  const [present, setPresent] = useState(false)
  // const [ornaments, setOrnaments] = useState([])
  const ornaments = useRef([])

  return (
    <div className='w-screen h-screen'>
      <Navbar present={present} setPresent={setPresent} />
      <Canvas>
        <color args={["#626F70"]} attach="background" />
        <ambientLight intensity={3} />
        <pointLight position={[-10, 0, 0]} decay={0} intensity={5} />
        <pointLight position={[10, 0, 0]} decay={0} intensity={5} />
        {/* <Tree /> */}
        <Ball ornaments={ornaments} position={[0.48,0.15,0.31]} />
        <OrbitControls enableDamping />
        <gridHelper />
      </Canvas>
      <Items />
    </div>
  )
}

export default App