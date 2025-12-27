import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'

export function EachBallImg({ nodes, materials, o }) {
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

    return (
        <group scale={2} rotation={[-Math.PI / 2, 0, 0]}>
            <group>
                <group {...(o.label === "Snowspin" && { position: [0, 0, 0.075] })}> {/* {Pushing snowspin up as its position was wrong} */}
                    {Object.keys(o.geometry).map((mesh, index) => {
                        return <mesh key={index} geometry={nodes[mesh]["geometry"]} material={materials[o.geometry[mesh]]} />
                    })}
                </group>
                <mesh geometry={nodes.Gancetto_palline_natalizie_01_0.geometry} material={materials.Materiale_241} position={[0.005, 0, 0.093]} />
            </group>
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')