import React from 'react'
import Hero from '../layouts/Hero'

const paddingC = ['md:pt-[80px]', 'md:pt-[150px]', 'md:pt-[200px]',];

const PageModel = ({title, subtitle, content, topG}) => {
    return (
        <div className={`relative flex flex-col items-center min-h-[60vh] md:min-h-[80vh] pt-[100px] ${paddingC[topG]} text-white`}>
            <Hero/>
            <div className='flex flex-col items-center justify-start gap-[15px] md:gap-[25px] z-10 min-w-[330px]'>
                <h1 className='super-title-text text-center max-w-[250px] md:max-w-[700px]'>{title}</h1>
                <p className='large-text text-center text-[#E6E8EC] max-w-[230px] md:max-w-[500px]'>{subtitle}</p>
                {content}
            </div>
        </div>
    )
}

export default PageModel