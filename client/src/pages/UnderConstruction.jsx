import React from 'react'
import PageModel from '../layouts/PageModel'

const UnderConst = () => {
    return (
        <div className='relative'>
            <PageModel 
                title={''} 
                subtitle={''} 
                content={<img src="/images/under-const.png" alt="404" className="w-full max-w-[700px]"/>}  
                topG={0}
            />
            <div className='flex flex-col items-center gap-[16px]'>
                <h4 className='large-text text-[#272727] '>
                        شغالين على حاجة جديدة وهنرجعلك قريب
                </h4>
                <a href='/' 
                    className='hover-zoom btn-gradient return 
                    relative medium-text text-white 
                    px-[70px] py-[10px] rounded-[10px]'>
                        إرجع للصفحة الرئيسية
                </a>
            </div>
        </div>
    )
}

export default UnderConst