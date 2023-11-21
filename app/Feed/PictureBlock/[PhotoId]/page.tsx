'use client';
import styles from "./PhotoId.module.css"
import {useStore} from "../../../../src/store";
import Link from "next/link";
import type {IPhotoUnit, ISearchListUnit} from "../../../interfaceList"
import React from "react";

function PicturePage({params}){
    /*  INITIALIZING THE GIVEN LIT OF PHOTOS  */
    const photoList: IPhotoUnit[] = useStore((state) => state.photoList)
    const setPhotoList = useStore((state) => state.setPhotoList)

    /*  TEMPORARY VARIABLES FOR INFORMATION ABOUT THE GIVEN IMAGE, AND THE LIST OF ACTIVE SELECTORS OF THAT IMAGE  */
    let imageInfo: IPhotoUnit = undefined
    let selectorList: string[]= []
    let selectors: ISearchListUnit[] | React.JSX.Element[] | string

    /*  CHECK FOR GIVEN IMAGE BY ID AND RETRIEVING INFO ABOUT IT  */
    photoList.forEach((photo) => {
        if(JSON.stringify(photo.id)===JSON.stringify(params.PhotoId)){
            return imageInfo=photo
        }
           return imageInfo
            })

    /*  PARSING INFORMATION ABOUT SELECTORS FROM STATE OF IMAGE  */
    if(imageInfo){
        imageInfo.selectors.forEach((selector) => {
            if(selector.isActive){
                selectorList.push(selector.name)
            }
        })
    }

    /*  CHECK FOR EMPTY ARRAY  */
    // @ts-ignore
    if(!selectorList.length < 1)
    {
        selectors = selectorList.map((sel, index) => <span key={index} >{sel}</span>)
    }else {
        selectors = "Categories are not picked"
    }


    /*  DELETING THE GIVEN PICTURE VIA ID AND UPDATING LOCAL STORAGE  */
    const deletePicture = () => {
        if (imageInfo) {
            const index: number = photoList.findIndex((i) => i.id === params.PhotoId);
            if (index !== -1) {
                const updatedPhotoList: IPhotoUnit[] = [...photoList];
                updatedPhotoList.splice(index, 1);
                setPhotoList(updatedPhotoList);
                localStorage.setItem('feed', JSON.stringify(updatedPhotoList));
            }
        }
    };


    return (
        <div className={"picture__wrapper"}>
            <div className={"picture__wrapper__image"} >
                <img src={imageInfo?imageInfo.url:""}
                     alt={imageInfo?imageInfo.name:""}
                     title={imageInfo?imageInfo.name:""}
                />
            </div>
            <div className={"picture__wrapper__sidebar"}>
                <h1>{imageInfo?imageInfo.name:""}</h1>
                <h2>Tags:</h2>
                <div className={"picture__wrapper__sidebar__selectors"}>
                    {selectors}
                </div>
                <div className="picture__wrapper__sidebar__delete">
                    <Link href={"/Feed"} onClick={deletePicture} >DELETE</Link>
                </div>

            </div>
        </div>
    )
}

export default PicturePage