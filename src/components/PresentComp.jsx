import { useThree } from '@react-three/fiber'
import React, { useEffect } from 'react'

const PresentComp = ({ present, setPresent }) => {
    const { gl } = useThree()
    useEffect(() => {
        if (present) {
            gl.domElement.toBlob((blob) => {
                if (!blob) return
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a');
                link.href = url
                link.setAttribute("download", "present.png")
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                setPresent(false)
            }, "image/png")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [present])
    return <></>
}

export default PresentComp