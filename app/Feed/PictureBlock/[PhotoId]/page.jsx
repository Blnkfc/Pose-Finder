'use client';
import styles from "./PhotoId.module.css"
import {useStore} from "@/src/store";
import Link from "next/link";


function PicturePage({params}){
    /*  FETCHING LIST OF ALL PHOTOS  */
    const photoList = useStore((state) => state.photoList)
    const setPhotoList = useStore((state) => state.setPhotoList)
    console.log(params)
    /*  TEMPORARY VARIABLES FOR INFORMATION ABOUT THE GIVEN IMAGE, AND THE LIST OF ACTIVE SELECTORS OF THAT IMAGE  */
    let imageInfo = undefined
    let selectorList = []
    let selectors

    /*  CHECK FOR GIVEN IMAGE BY ID AND RETRIEVING INFO ABOUT IT  */
    photoList.forEach((photo) => {
        if(JSON.stringify(photo.id)===JSON.stringify(params.PhotoId)){
            return imageInfo=photo
        }
           return imageInfo
            })

    /*  PARSING INFORMATION FROM STATE OF IMAGE  */
    if(imageInfo){
        imageInfo.selectors.forEach((image) => {
            if(image.isActive){
                selectorList.push(image.name)
            }
        })
    }

    /*  CHECK FOR EMPTY ARRAY  */
    if(!selectorList.length < 1)
    {
        selectors = selectorList.map((sel, index) => <span key={index} >{sel}</span>)
    }else {
        selectors = "Categories are not picked"
    }



    const deletePicture = () => {
        if (imageInfo) {
            const index = photoList.findIndex((i) => i.id === params.PhotoId);
            if (index !== -1) {
                const updatedPhotoList = [...photoList];
                updatedPhotoList.splice(index, 1);
                setPhotoList(updatedPhotoList);
                localStorage.setItem('feed', JSON.stringify(updatedPhotoList));

            }
        }
    };


    return (
        <div className={"picture__wrapper"}>
            <img src={imageInfo?imageInfo.url:""}
                 alt={imageInfo?imageInfo.name:""}
                 title={imageInfo?imageInfo.name:""}
                 className={"picture__wrapper__image"}/>
            <div className={"picture__wrapper__sidebar"}>
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