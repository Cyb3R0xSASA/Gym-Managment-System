import React from 'react'

const Hero = ({isMain = false}) => {
    return (
        <section className={`hero-polygon ${isMain ? 'min-h-[80vh] md:min-h-[100vh]' : 'min-h-[60vh] md:min-h-[80vh]'}`}>
            <div className='small1-shape'/>
            <div className='outline-shape'/>
            <div className='big1-shape'/>
            <div className='colored1-shape'/>
            <div className='colored2-shape'/>
        </section>
    )
}

export default Hero