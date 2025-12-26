import { MoveLeft, MoveRight } from 'lucide-react'
import React from 'react'

export const Items = () => {
    const items = [
        {
            img: "/ball.png",
            label: "A new ball",
            model:<></>
        },
        {
            img: "/ball.png",
            label: "A recent ball",
            model:<></>
        },
        {
            img: "/ball.png",
            label: "A mysterious ball",
            model:<></>
        },
        {
            img: "/ball.png",
            label: "A chocolate ball",
            model:<></>
        },
        {
            img: "/ball.png",
            label: "A favourite ball",
            model:<></>
        },
        {
            img: "/ball.png",
            label: "A edible ball",
            model:<></>
        }
    ]

    return (
        <div className='z-10 fixed bottom-10 pointer-events-none left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 my-4 w-[50vw]'>
            <div className='text-xl'>Drag & drop items onto your Christmas Tree!</div>
            <div className='flex w-full justify-between items-center pointer-events-auto'>
                <button className=''><MoveLeft /></button>

                {items.map((item, index) => {
                    return <div className='h-16 w-16 cursor-grab transition-transform hover:scale-110 duration-300' key={index}>
                        <div><img src={item.img} alt={item.label} /></div>
                        <div className='text-sm'>{item.label}</div>
                    </div>
                })}

                <button><MoveRight /></button>
            </div>
        </div>
    )
}