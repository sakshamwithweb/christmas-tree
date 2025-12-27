import React from 'react'
import { useGLTF } from '@react-three/drei'
import { EachBallImg } from "./EachBallImg.jsx"

export function BallImg({ ornamentsList }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')
    return (
        <group dispose={null}>
            {ornamentsList.map((o, i) => {
                return <EachBallImg i={i} key={i} nodes={nodes} materials={materials} o={o} />
            })}
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')