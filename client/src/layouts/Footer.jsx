import React from 'react'

const Footer = () => {
    return (
        <footer className='footer-polygon h-[90vh] md:h-[80vh]'>
            <div className='big-shape'></div>
            <div className='small-shape'></div>
            <div className='container max-w-[1000px] z-10 md:mb-[50px]'>
                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-[20px] px-[20px] py-[40px]">
                    <div className='flex flex-col items-start justify-start gap-[5px] md:gap-[10px]'>
                        <h3 className='title-text font-semibold'>ترينيكس</h3>
                        <p className='normal-text max-w-[120px] md:max-w-[180px]'>ليصلك كل جديد تابعنا على منصات التواصل الاجتماعى</p>
                        <ul className='flex items-center gap-[10px] md:gap-[16px] mt-[10px] md:mt-[15px]'>
                            <li className='social-icon'><a href="#" target='_blanck'><img alt='social media icon' src='/icons/linkedin.png'width={30}/></a></li>
                            <li className='social-icon'><a href="#" target='_blanck'><img alt='social media icon' src='/icons/facebook.png'width={30}/></a></li>
                            <li className='social-icon'><a href="#" target='_blanck'><img alt='social media icon' src='/icons/youtube.png'width={30}/></a></li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start gap-[5px] md:gap-[10px]'>
                        <h3 className='large-text font-semibold'>تواصل معنا</h3>
                        <p className='normal-text max-w-[120px] md:max-w-[160px]'>لأى استفسارات الرجاء التواصل معنا على الوسائل التالية</p>
                        <ul className='flex flex-col items-start gap-[5px] mt-[10px] md:mt-[15px]'>
                            <a href='#' className='normal-text max-w-[120px] md:max-w-[160px] underline'>0000000000 20+</a>
                            <a href='#' className='normal-text max-w-[120px] md:max-w-[160px] underline'>info@trainix.site</a>
                        </ul>
                    </div>

                    <div className='flex flex-col items-start gap-[5px] md:gap-[10px]'>
                        <h3 className='large-text font-semibold'>الصفحات</h3>
                        <ul className='flex flex-col items-start gap-[5px] transition-all duration-300 normal-text'>
                            <li><a href='#'>عن ترينيكس</a></li>
                            <li><a href='#'>الخدمات والأسعار</a></li>
                            <li><a href='#'>شركاؤنا الأوفياء</a></li>
                            <li><a href='#'>أراء العملاء</a></li>
                            <li><a href='#'>الأسئلة الشائعة</a></li>
                            <li><a href='#'>اتصل بنا</a></li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex justify-center border-t-[1px] border-white/30 pt-[20px] md:py-[40px]">
                    <span className='normal-text'>© حقوق النشر 2025 - كل الحقوق محفوظة لشركة ترينيكس</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer