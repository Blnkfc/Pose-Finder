'use client';
import Image from "next/image";
import header_logo from "@/public/assets/header-logo.png";


const PictureBlock = (props) => {
    return (
        <div className={"pictureBlock"}>
            <h3 className={"pictureBlock__name"} >{props.name}</h3>
            <div>
                <img src={props.url} alt={props.name} title={props.name} className={"pictureBlock__image"} />
            </div>
        </div>
    )
}
export default PictureBlock