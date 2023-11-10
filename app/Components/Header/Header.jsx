'use client';
import styles from "./Header.module.css"
import Image from "next/image";
import Link from "next/link";
import header_logo from '@/public/assets/logo.png'
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
                <Link href={"/"} className={"header__nav__link"} >FAQ</Link>
                <Link href={"/"} className={"header__nav__link"} >Help</Link>
                <Link href={"/"} className={"header__nav__link"} >About</Link>
                <Link href={"/Contact"} className={"header__nav__link"} >Contact</Link>
                <Link href={"/Feed"} className={"header__nav__link"}>Feed</Link>
                <Link href={"/AddPicture"} className={"header__nav__link"}>Add Picture</Link>
                <button onClick={toggleNavExpand}
                        className={"header__nav__menu__expander"}
                        style={{display: navExpand?"none":"block"}}  >&#10094;</button>


                <div className="header__nav__mobile" style={{display: navExpand?"flex":"none"}} >
                    <div className={"header__nav__mobile__menu"}>
                        <span>Menu</span>
                        <button onClick={toggleNavExpand}
                                className={"header__nav__mobile__menu__expander"} >
                            &#10095;
                        </button>
                    </div>
                    <Link href={"/Feed"} className={""} onClick={toggleNavExpand} > Feed </Link>
                    <Link href={"/AddPicture"} className={""} onClick={toggleNavExpand} > Add Picture </Link>
                    <Link href={"/"} className={""} onClick={toggleNavExpand} >FAQ</Link>
                    <Link href={"/"} className={""} onClick={toggleNavExpand} >Help</Link>
                    <Link href={"/"} className={""} onClick={toggleNavExpand} >About</Link>
                    <Link href={"/Contact"} className={""} onClick={toggleNavExpand} >Contact</Link>
                    <Link href={"/Settings"} className={""} onClick={toggleNavExpand} > Settings </Link>


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