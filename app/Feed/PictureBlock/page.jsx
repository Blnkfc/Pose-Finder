'use client';
import Link from "next/link";
import {useEffect, useState} from "react";
import {useStore} from "@/src/store"
import Image from "next/image";
import header_logo from "@/public/assets/logo.png";


const PictureBlock = (props) => {
    /*  INITIALIZING DATA FROM FEED  */
    const initialState = useStore((state) => state.photoList)
    /*  RETRIEVING DATA ABOUT NEEDED PICTURE VIA IT'S ID  */
    const pictureData = initialState.find(photo => JSON.stringify(photo.id) === JSON.stringify(props.id))




    /*  RETRIEVING DATA ABOUT LAYOUT  */
    const layoutData = useStore((state) => state.feedLayout)
    const [grid, setGrid] = useState(true); // Default to grid
    useEffect(() => {
        setGrid(layoutData.grid);
    }, [layoutData.grid]);
    /*  SETTING UP A STATE FOR THE POPUP WITH INFORMATION ABOUT THE PICTURE  */



    /*  RETRIEVING SELECTORS AND LISTING THEM WITH STYLING DEPENDING ON THEIR STATE  */
    const selectors =
        pictureData && pictureData.selectors
            ? pictureData.selectors.map((S, index) => (
                <div
                    key={index}
                    className={"pictureBlock__info__selectorList__selector pictureBlock__backgroundSizing"}
                    style={{ backgroundColor: S.isActive ? "#066d42" : "#fff", display:S.isActive?"flex":"none", fontSize:grid?"":"1.5em"}}
                >
                    {S.name}
                </div>
            ))
            : null;


    return (
        <Link href={`/Feed/PictureBlock/${props.id}`}  className={"pictureBlock"} style={{background:`url(${pictureData.url})`}} >
            <div className="pictureBlock__info">
                <div className="pictureBlock__info__title">{pictureData.name}</div>
                <div className="pictureBlock__info__description">{pictureData.description}</div>
                <div className="pictureBlock__info__selectorList">{selectors}</div>
            </div>
        </Link>
    )
}
export default PictureBlock