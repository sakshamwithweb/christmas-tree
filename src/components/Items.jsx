import { MoveLeft, MoveRight } from 'lucide-react'
import React from 'react'

export const Items = ({ ornamentsList }) => {
    return (
        <div className='z-10 fixed bottom-10 pointer-events-none left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 my-4 w-[50vw]'>
            <div className='text-xl'>Drag & drop items onto your Christmas Tree!</div>
            <div className='flex w-full justify-between items-center pointer-events-auto'>
                <button className=''><MoveLeft /></button>

                {ornamentsList.map((item, index) => {
                    return <div className='h-16 w-16 cursor-grab transition-transform hover:scale-110 duration-300' key={index}>
                        <div><img src="/ball.png" alt={item.label} /></div>
                        <div className='text-sm'>{item.label}</div>
                    </div>
                })}

                <button><MoveRight /></button>
            </div>
        </div>
    )
}