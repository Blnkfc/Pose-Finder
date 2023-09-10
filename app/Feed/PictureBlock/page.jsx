'use client';
import Image from "next/image";
import header_logo from "@/public/assets/header-logo.png";
import Link from "next/link";
import {serverActionReducer} from "next/dist/client/components/router-reducer/reducers/server-action-reducer";
import {useEffect, useRef, useState} from "react";
import {useStore} from "@/src/store"


const PictureBlock = (props) => {
    const initialState = useStore((state) => state.photoList)
    const pictureData = initialState.find(photo => JSON.stringify(photo.id) === JSON.stringify(props.id))

    const [expand,setExpand] = useState(false)
    const toggleExpand = () => {
        console.log(expand)
        return setExpand(!expand)
    }
    const arrowUp = "▲"
    const arrowDown = "▼"

    const selectors = pictureData.selectors.
    map((S) =>
        (<div
            className={"pictureBlock__image__info__selector"}
            style={{backgroundColor: S.isActive?"#00c2bf":"#1f1f1f" }} > {S.name} </div>))




    return (
        <div  className={"pictureBlock"}>
            <h3 className={"pictureBlock__name"} >{props.name}</h3>
            <div className={"pictureBlock__image__wrapper"}>
                <div className={"pictureBlock__image__info"} style={{display: expand?"flex":"none"}} >{selectors} </div>
                <Link href={`/Feed/PictureBlock/${props.id}`}>
                    <div className="pictureBlock__image" title={props.name} style={{backgroundImage: `url(${props.url})`}}></div>
                </Link>
                <button className="pictureBlock__image__expander"
                        value={expand?arrowUp:arrowDown}
                        onClick={toggleExpand}></button>
            </div>
        </div>
    )
}
export default PictureBlock