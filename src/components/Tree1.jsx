import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

const Tree1 = () => {
    const model = useLoader(GLTFLoader, "/tree1.glb")

    useEffect(() => {
        if (!model?.scene) return
        console.log(model)
    }, [model])
    return <primitive object={model.scene} />
}

export default Tree1