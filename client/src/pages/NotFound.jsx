import React from 'react'
import PageModel from '../layouts/PageModel'

const NotFound = () => {
    return (
        <div className='relative'>
            <PageModel title={''} subtitle={''} content={''}/>
            <picture>
                <source media="(min-width: 400px)" srcSet="/images/404.png" />
                <img
                    src="/images/404-mob.png"
                    alt="404"
                    className="w-full md:w-1/2 absolute z-10 top-0 left-0 md:translate-x-1/2"
                />
            </picture>
            <div className='flex flex-col items-center gap-[16px]'>
                <h4 className='large-text text-[#272727]  '>أوووبس ! شكلنا ضيعنا الصفحة</h4>
                <a href='/' className='hover-zoom btn-gradient return relative medium-text text-white px-[70px] py-[10px] rounded-[10px]'>إرجع للصفحة الرئيسية</a>
            </div>
        </div>
    )
}

export default NotFound