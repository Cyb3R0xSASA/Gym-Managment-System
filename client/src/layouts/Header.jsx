import React, { useState } from 'react';
import { Menu , X } from 'lucide-react';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className='w-full absolute top-0 left-0 flex justify-center my-[20px] z-20'>
            <ul className='hidden md:flex items-center gap-[20px] small-text text-white'>
                <li className='header-link'><a href='/'>الرئيسية</a></li>
                <li className='header-link'><a href='/about'>المزيد عنا</a></li>
                <li className='header-link'><a href='/pricing'>الخدمات والأسعار</a></li>
                <li className='header-link'><a href='/partners'>شركاؤنا</a></li>
                <li className='header-link'><a href='/testemonials'>الآراء</a></li>
                <li className='header-link'><a href='/faq'>الأسئلة الشائعة</a></li>
                <li className='header-link'><a href='/contact'>اتصل بنا</a></li>
            </ul>
            <button onClick={()=> {setShowMenu(!showMenu)}} className='flex md:hidden text-white'>
                {showMenu ? <X /> : <Menu />}
            </button>
            <div className={showMenu? 'menu md:hidden w-3/4 absolute top-[30px] left-0 translate-x-1/6 rounded-[20px] text-[#242372] bg-white flex flex-col items-center justify-center z-50 gap-[20px] small-text' : 'hidden'}>
                <ul className='flex flex-col items-center py-[20px] justify-around gap-[10px] medium-text font-semibold'>
                    <li className='header-link'><a href='/'>الرئيسية</a></li>
                    <li className='header-link'><a href='/about'>المزيد عنا</a></li>
                    <li className='header-link'><a href='/pricing'>الخدمات والأسعار</a></li>
                    <li className='header-link'><a href='/partners'>شركاؤنا</a></li>
                    <li className='header-link'><a href='/testemonials'>الآراء</a></li>
                    <li className='header-link'><a href='/faq'>الأسئلة الشائعة</a></li>
                    <li className='header-link'><a href='/contact'>اتصل بنا</a></li>
                </ul>
            </div>
        </header>
    )
}

export default Header