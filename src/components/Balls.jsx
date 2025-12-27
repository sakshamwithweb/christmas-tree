import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function Balls({ loadedOrnaments }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')
    useEffect(() => {
        if (loadedOrnaments.length > 0) {
            console.log(loadedOrnaments)
        }
    }, [loadedOrnaments])
    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            {loadedOrnaments.map((o, i) => {
                return <group scale={2} key={i}>
                    <group {...(o.label === "Snowspin" && { position: [0, 0, 0.075] })}>{ /* Pushing snowspin up as its position was wrong*/}
                        {Object.keys(o.geometry).map((mesh, index) => {
                            return <mesh key={index} geometry={nodes[mesh]["geometry"]} material={materials[o.geometry[mesh]]} />
                        })}
                    </group>
                    <mesh geometry={nodes.Gancetto_palline_natalizie_01_0.geometry} material={materials.Materiale_241} position={[0.005, 0, 0.093]} />
                </group>
            })}
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')




