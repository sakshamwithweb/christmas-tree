import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Color, Vector2 } from 'three'
import { useThree } from '@react-three/fiber'

export function Balls({ loadedOrnaments, raycaster }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')
    const { gl, camera } = useThree()
    const ballsRef = useRef()

    useEffect(() => {
        if (loadedOrnaments.length > 0) {
            console.log(loadedOrnaments)
        }
    }, [loadedOrnaments])

    const handleBallClick = ({ x, y }) => {
        const rc = raycaster.current

        const coords = new Vector2()
        coords.x = (x / gl.domElement.clientWidth) * 2 - 1
        coords.y = -((y / gl.domElement.clientHeight) * 2 - 1)
        rc.setFromCamera(coords, camera)

        const intersections = rc.intersectObject(ballsRef.current, true)
        if (intersections.length > 0) {
            // intersections.forEach((currentObj, index) => {
            //     const selected = currentObj.object
            //     console.log(selected)
            //     const color = new Color("red")
            //     selected.material.color = color
            // })
            let selected = intersections[0].object.parent
            if (selected.name.length === 0) selected = selected.parent
            console.log(selected)
        }
    }

    return (
        <group ref={ballsRef} onPointerMove={handleBallClick} >
            {loadedOrnaments.map((o, i) => {
                return <group name={o.label} rotation={[-Math.PI / 2, 0, 0]} scale={2} key={i}>
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




