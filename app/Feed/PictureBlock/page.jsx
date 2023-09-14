'use client';
import Link from "next/link";
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
    const selectors = pictureData.selectors.
    map((S, index) =>
        (<div
            key={index}
            className={"pictureBlock__image__info__selector"}
            style={{backgroundColor: S.isActive?"#00c2bf":"#1f1f1f" }} > {S.name} </div>))




    return (
        <div  className={"pictureBlock"}>
            <h3 className={"pictureBlock__name"} >{props.name}</h3>
            <div className={"pictureBlock__image__wrapper"}>
                <div className={"pictureBlock__image__info"} style={{display: expand?"flex":"none"}} >
                    <div className="pictureBlock__image__info__selector__wrapper">
                        {selectors}
                    </div>
                    <button
                     className="pictureBlock__image__expander__down"
                     onClick={toggleExpand} >
                        ⮟
                    </button>
                </div>
                <Link href={`/Feed/PictureBlock/${props.id}`}>
                    <div className="pictureBlock__image" title={props.name}
                         style={{backgroundImage: `url(${props.url})`}}></div>
                </Link>
                <button className="pictureBlock__image__expander__up"
                        onClick={toggleExpand}
                        style={{display: expand?"none":"block"}}
                >⮝</button>
            </div>
        </div>
    )
}
export default PictureBlock