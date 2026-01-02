import React, { useMemo } from 'react'
import Slider from 'react-slick'

export const Items = ({ ornamentsList, images, areImgAvailable, loadOrnament }) => {
    var settings = useMemo(() => {
        return {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 8,
            slidesToScroll: 2,
            draggable: false
        }
    }, [])

    return (
        <div className='z-10 fixed bottom-10 pointer-events-none left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 my-4 w-[50vw]'>
            <div className='text-xl'>Click then drag and drop items on your Christmas Tree!</div>
            <Slider className='flex pointer-events-auto w-full justify-between items-center' {...settings}>
                {ornamentsList.map((item, index) => {
                    return <div onClick={() => loadOrnament(item)} className="cursor-pointer transition-transform hover:scale-110 duration-300" key={index}>
                        {areImgAvailable && <div><img src={images.current[index]} alt={item.label} /></div>}
                        <div className='text-sm text-center'>{item.label}</div>
                    </div>
                })}
            </Slider>
        </div>
    )
}