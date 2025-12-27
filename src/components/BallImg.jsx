import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { EachBallImg } from "./EachBallImg.jsx"

export function BallImg({ ornamentsList }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')
    const { gl, scene } = useThree()

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio * 0.5)
        const camera = new PerspectiveCamera(20, 1.4, 0.1, 100)
        camera.position.setZ(1)
        camera.position.setY(0.05)
        gl.render(scene, camera)
        const screenshot = gl.domElement.toDataURL()
        gl.setPixelRatio(window.devicePixelRatio)
        console.log(screenshot)
    }, [gl, scene])

    const current = [ornamentsList[9]]
    return (
        <group dispose={null}>
            {current.map((o, i) => {
                return <EachBallImg key={i} nodes={nodes} materials={materials} o={o} />
            })}
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')