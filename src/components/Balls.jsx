import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector2 } from 'three'
import { useThree } from '@react-three/fiber'


const GenerateOrnament = ({ o, nodes, materials, reference }) => {
    return <object3D {...(reference && { ref: reference })} name={o.ornament.label} rotation={[-Math.PI / 2, 0, 0]} scale={2}>
        <object3D {...(o.ornament.label === "Snowspin" && { position: [0, 0, 0.075] })}>{ /* Pushing snowspin up as its position was wrong*/}
            {Object.keys(o.ornament.geometry).map((mesh, index) => {
                return <mesh key={index} geometry={nodes[mesh]["geometry"]} material={materials[o.ornament.geometry[mesh]]} />
            })}
        </object3D>
        <mesh geometry={nodes.Gancetto_palline_natalizie_01_0.geometry} material={materials.Materiale_241} position={[0.005, 0, 0.093]} />
    </object3D>
}

export function Balls({ loadOrnaments, raycaster, setLoadOrnaments, selectedBall, setSelectedBall }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')
    const { gl, camera } = useThree()
    const parentRef = useRef()
    const ballsRef = useRef([])

    useEffect(() => {
        if (!selectedBall) return
        selectedBall.ornament.scale.set(2.5, 2.5, 2.5)
        // selectedBall.ornament.position.set(1, 1, 1)
    }, [selectedBall])

    const handleBallClick = ({ x, y }) => {
        const rc = raycaster.current

        const coords = new Vector2()
        coords.x = (x / gl.domElement.clientWidth) * 2 - 1
        coords.y = -((y / gl.domElement.clientHeight) * 2 - 1)
        rc.setFromCamera(coords, camera)

        const intersections = rc.intersectObject(parentRef.current, true)
        if (intersections.length > 0) {
            let selected = intersections[0].object.parent
            if (selected.name.length === 0) selected = selected.parent
            const selectedRef = ballsRef.current.find((ball) => ball.ornament.uuid === selected.uuid)
            if (selectedBall) {
                selectedBall.ornament.scale.set(2, 2, 2)
                setSelectedBall()
            }
            else setSelectedBall(selectedRef)
        }
    }

    return (
        <group ref={parentRef} onClick={handleBallClick} >
            {loadOrnaments.map((o, i) => {
                if (!o.loaded) {
                    setLoadOrnaments(loadOrnaments.map((lO) => {
                        if (lO.uid === o.uid) lO['loaded'] = true
                        return lO
                    }))
                    return <GenerateOrnament o={o} key={i} nodes={nodes} materials={materials} reference={(r) => {
                        if (r) ballsRef.current.push({ ornament: r, uid: o.uid })
                    }} />
                } else {
                    return <GenerateOrnament o={o} key={i} nodes={nodes} materials={materials} reference={null} />
                }
            })}
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')




