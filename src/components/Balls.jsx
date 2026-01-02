import React, { useMemo, useRef } from 'react'
import { DragControls, useGLTF } from '@react-three/drei'
import { Matrix4 } from 'three'

const GenerateOrnament = ({ o, nodes, materials, controls, selectedOrnamentMatrix }) => {
    const matrix = useMemo(() => new Matrix4(), [])
    const ref = useRef()

    const handleDragStart = () => {
        if (matrix) selectedOrnamentMatrix.current = matrix
        controls.current.enabled = false
    }

    const handleDragEnd = () => {
        selectedOrnamentMatrix.current = null
        controls.current.enabled = true
    }

    return <DragControls ref={ref} matrix={matrix} autoTransform={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <object3D name={o.ornament.label} rotation={[-Math.PI / 2, 0, 0]} scale={2}>
            <object3D {...(o.ornament.label === "Snowspin" && { position: [0, 0, 0.075] })}>{ /* Pushing snowspin up as its position was wrong*/}
                {Object.keys(o.ornament.geometry).map((mesh, index) => {
                    return <mesh key={index} geometry={nodes[mesh]["geometry"]} material={materials[o.ornament.geometry[mesh]]} />
                })}
            </object3D>
            <mesh geometry={nodes.Gancetto_palline_natalizie_01_0.geometry} material={materials.Materiale_241} position={[0.005, 0, 0.093]} />
        </object3D>
    </DragControls>
}

export function Balls({ loadOrnaments, setLoadOrnaments, controls, selectedOrnamentMatrix }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')
    const parentRef = useRef()

    return (
        <group ref={parentRef}>
            {loadOrnaments.map((o, i) => {
                setLoadOrnaments(loadOrnaments.map((lO) => {
                    if (lO.uid === o.uid) lO['loaded'] = true
                    return lO
                }))
                return <GenerateOrnament selectedOrnamentMatrix={selectedOrnamentMatrix} controls={controls} o={o} key={i} nodes={nodes} materials={materials} />
            })}
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')
