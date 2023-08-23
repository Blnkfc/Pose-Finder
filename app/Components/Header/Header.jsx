import styles from "./Header.module.css"
import Image from "next/image";
import Link from "next/link";
import header_logo from '@/public/assets/header-logo.png'
import header_settings from '@/public/assets/header-settings.png'



const Header = () => {
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