import { IoHome } from "react-icons/io5";
import { BsPostcardFill } from "react-icons/bs";

import { IoSettingsOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react'
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
export default function Aside()
{



    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    };

    useEffect(() => {
        // Update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    return <>

    
    <aside className="asideleft">
            <ul>
                <Link href="/">
                    <li className={activeLink === '/' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/')}>
                        <IoHome />
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link href="/blogs">
                    <li className={activeLink === '/blogs' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/blogs')}>
                       <BsPostcardFill />
                        <span>Blogs</span>
                    </li>
                </Link>
                <Link href="/blogs/addblog">
                    <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/blogs/addblog')}>
                       <MdAddPhotoAlternate />
                        <span>AddBlog</span>
                    </li>
                </Link>
                <Link href="/draft">
                
                    <li className={activeLink === '/draft' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/draft')}>
                       <MdPending />
                        
                        <span>Pending</span>
                    </li>
                   
                </Link>
                 <Link href="/users">
                    <li className={activeLink === '/setting' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/setting')}>
                        <FaUsers />
                        <span>Users</span>
                    </li>
                </Link>
                
                {/* <Link href="/setting">
                    <li className={activeLink === '/setting' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/setting')}>
                        <IoSettingsOutline />
                        <span>Settings</span>
                    </li>
                </Link> */}
            </ul>
        </aside>
    
    
    </>
}