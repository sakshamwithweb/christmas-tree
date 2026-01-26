import React, { useMemo, useRef } from 'react'
import { DragControls, useGLTF } from '@react-three/drei'
import { Matrix4, Vector2 } from 'three'
import { useThree } from '@react-three/fiber'

const GenerateOrnament = ({ o, nodes, materials, controls, selectedOrnamentMatrix, raycaster, treeRef }) => {
    const { camera } = useThree()
    const matrix = useMemo(() => {
        const m = new Matrix4()
        const cameraPosition = camera?.position
        if (cameraPosition && raycaster.current && treeRef.current) {
            // Here find the center of tree relative to camera
            // Cast a raycast from the center and see where it strickes and wherever it strickes, that's the point
            const rc = raycaster.current
            const coords = new Vector2(0, 0)
            rc.setFromCamera(coords, camera)
            const intersects = rc.intersectObject(treeRef.current)
            const p = intersects[0].point
            m.setPosition(p.x, p.y, p.z)
        }
        return m
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const ref = useRef()

    const handleDragStart = () => {
        if (matrix) selectedOrnamentMatrix.current = matrix
        controls.current.enabled = false
    }
    const handleDragEnd = () => {
        selectedOrnamentMatrix.current = null
        controls.current.enabled = true
    }

    return <DragControls onHover={(e) => { console.log(e) }} ref={ref} matrix={matrix} autoTransform={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

export function Balls({ loadOrnaments, controls, selectedOrnamentMatrix, raycaster, treeRef, deleteOrnament }) {
    const { nodes, materials } = useGLTF('/christmas_balls.glb')

    return (
        <group>
            {loadOrnaments.map((o, i) => {
                return <GenerateOrnament treeRef={treeRef} raycaster={raycaster} selectedOrnamentMatrix={selectedOrnamentMatrix} controls={controls} o={o} key={i} nodes={nodes} materials={materials} />
            })}
        </group>
    )
}

useGLTF.preload('/christmas_balls.glb')
