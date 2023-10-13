'use client';
import styles from "./Header.module.css"
import Image from "next/image";
import Link from "next/link";
import header_logo from '@/public/assets/header-logo.png'
import header_settings from '@/public/assets/header-settings.png'
import {useState} from "react";



const Header = () => {
    const [navExpand, setNavExpand] = useState(false)
    const toggleNavExpand = () => {
        return setNavExpand(!navExpand)
    }
    return (
        <div className={"header"}>
            <Link href={"/"} className={"header__logo"}>
                <Image
                src={header_logo}
                alt={"Logo"}
                style={{
                    width: '100%',
                    height: 'auto',}}/>
            </Link>
            <div className={"header__nav"}>
                <Link href={"/Feed"} className={"header__nav__link"}>Feed</Link>
                <Link href={"/AddPicture"} className={"header__nav__link"}>Add Picture</Link>
                <button onClick={toggleNavExpand} >&#10094;</button>
                <div className="header__nav__mobile" style={{display: navExpand?"flex":"none"}} >
                    <button onClick={toggleNavExpand} >&#10095;</button>
                    <div className={"header__nav__mobile__menu"}>Menu</div>
                    <Link href={"/Feed"} className={""}> Feed <span>&#9783;</span></Link>
                    <Link href={"/AddPicture"} className={""}> Add Picture <span>&#10009;</span></Link>
                    <Link href={"/Settings"} className={""}>
                        Settings <span>&#9881;</span>
                    </Link>
                </div>
                <Link href={"/Settings"} className="header__nav__settings">
                    <Image
                        src={header_settings}
                        alt={"Logo"}
                        style={{
                            width: '100%',
                            height: 'auto',}}/>
                </Link>
            </div>
        </div>
    )
}

export default Header