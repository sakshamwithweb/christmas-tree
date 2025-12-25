import { Loader, Play } from 'lucide-react'
import React from 'react'

const Navbar = ({ setPresent, present }) => {
    return (
        <div className='fixed top-0 left-0 flex justify-between w-full h-[8vh] items-center z-10 px-8 pointer-events-none'>
            <img alt="sakg_christmas" className='w-[6vw]' src='/sakg_christmas.png' />
            <h2 className='text-2xl font-bold'>Decorate Your Christmas Tree</h2>
            <button onClick={() => setPresent(true)} disabled={present} className={`${present ? "bg-gray-900" : "bg-black"} text-white py-2 px-4 rounded-md pointer-events-auto flex items-center gap-2`}> {present ? <Loader size={15} /> : <Play size={15} />} Present</button>
        </div>
    )
}

export default Navbar