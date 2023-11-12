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
                    className={"pictureBlock__image__info__selector"}
                    style={{ backgroundColor: S.isActive ? "#066d42" : "#fff", color: S.isActive ?"#fff21qew":"#000" }}
                >
                    {S.name}
                </div>
            ))
            : null;

    return (
        <div  className={"pictureBlock"}
              style={{width: grid?"49%":"99%", height: grid?"10em":"17em"}} >
            <div className={"pictureBlock__image__wrapper"}>
                <Link
                    href={`/Feed/PictureBlock/${props.id}`}
                    style={{backgroundImage: `url("${props.url}")`, backgroundSize: "contain",
                    backgroundPosition: "center", height: grid?"9.5em":"16em"}} >
                </Link>
                <div className={"pictureBlock__image__info"}  >
                    <h3>{props.name}</h3>
                    <div className="pictureBlock__image__info__description">
                        {props.description}
                    </div>
                    <div className="pictureBlock__image__info__selector__wrapper">
                        {selectors}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default PictureBlock