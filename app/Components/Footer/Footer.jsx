import styles from "./Footer.module.css"
import Link from "next/link";
import Image from "next/image";
import footer_logo from "@/public/assets/logo.png";


const Footer = () => {
    return (
        <div className={"footer"}>
            <div className="footer__info">
                <Link href={"/"}>About</Link>
                <Link href={"/Contact"}>Contact</Link>
                <Link href={"/"} className={"footer__info__logo"}>
                    <Image
                        src={footer_logo}
                        alt={"Logo"}
                        style={{
                            width: '100%',
                            height: 'auto',}}/>
                </Link>
                <Link href={"/"}>FAQ</Link>
                <Link href={"/"}>Help</Link>
            </div>
        </div>
    )
}

export default Footer