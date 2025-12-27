import { MoveLeft, MoveRight } from 'lucide-react'
import React, { useState } from 'react'

export const Items = ({ ornamentsList, images, areImgAvailable }) => {
    const [visibleOrnaments, setVisibleOrnmanets] = useState((new Array(5).fill()).map((_, i) => i))

    const moveSlider = (option) => { // "right"/"left"
        if (option === "right") {
            const newLastEle = visibleOrnaments[visibleOrnaments.length - 1] <= (ornamentsList.length - 2) ? visibleOrnaments[visibleOrnaments.length - 1] + 1 : 0
            setVisibleOrnmanets([...visibleOrnaments.slice(1), newLastEle])
        } else if (option === "left") {
            const newFirstEle = visibleOrnaments[0] > 0 ? visibleOrnaments[0] - 1 : ornamentsList.length - 1
            setVisibleOrnmanets([newFirstEle, ...visibleOrnaments.slice(0, visibleOrnaments.length - 1)])
        }
    }

    return (
        <div className='z-10 fixed bottom-10 pointer-events-none left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 my-4 w-[50vw]'>
            <div className='text-xl'>Drag & drop items onto your Christmas Tree!</div>
            <div className='flex w-full justify-between items-center'>
                <button className='pointer-events-auto' onClick={() => moveSlider("left")}><MoveLeft /></button>
                <div className='flex pointer-events-auto w-[80%] justify-between items-center'>
                    {ornamentsList.map((item, index) => {
                        return <div className={`${visibleOrnaments.includes(index) ? "" : "hidden"} h-16 w-16 cursor-grab transition-transform hover:scale-110 duration-300`} key={index}>
                            {areImgAvailable && <div><img src={images.current[index]} alt={item.label} /></div>}
                            <div className='text-sm'>{item.label}</div>
                        </div>
                    })}
                </div>

                <button className='pointer-events-auto' onClick={() => moveSlider("right")}><MoveRight /></button>
            </div>
        </div>
    )
}