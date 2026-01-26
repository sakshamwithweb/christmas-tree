import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera, Vector3 } from 'three'

export function EachBallImg({ i, o, images, nodes, materials }) {
    const { gl, scene } = useThree()

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio * 0.5)
        const camera = new PerspectiveCamera(20, 1.4, 0.1, 100)
        camera.position.set(i - 5, 0.05, 1)
        camera.lookAt(new Vector3(i - 5, 0.05, 0))
        gl.render(scene, camera)
        const screenshot = gl.domElement.toDataURL()
        images.current.push(screenshot)
        gl.setPixelRatio(window.devicePixelRatio)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <group position={[i - 5, 0, 0]} scale={2} rotation={[-Math.PI / 2, 0, 0]}>
            <group {...(o.label === "Snowspin" && { position: [0, 0, 0.075] })}> {/* {Pushing snowspin up as its position was wrong} */}
                {Object.keys(o.geometry).map((mesh, index) => {
                    return <mesh key={index} geometry={nodes[mesh]["geometry"]} material={materials[o.geometry[mesh]]} />
                })}
            </group>
            <mesh geometry={nodes.Gancetto_palline_natalizie_01_0.geometry} material={materials.Materiale_241} position={[0.005, 0, 0.093]} />
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')