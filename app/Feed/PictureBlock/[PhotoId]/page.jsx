'use client';
import styles from "./PhotoId.module.css"
import {useStore} from "@/src/store";


function PicturePage({params}){
    /*  FETCHING LIST OF ALL PHOTOS  */
    const photoList = useStore((state) => state.photoList)

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
    imageInfo.selectors.forEach((image) => {
        if(image.isActive){
            selectorList.push(image.name)
        }
    })

    /*  CHECK FOR EMPTY ARRAY  */
    if(!selectorList.length < 1)
    {
        selectors = selectorList.map((sel, index) => <span>{sel}</span>)
    }else {
        selectors = "Categories are not picked"
    }



    return (
        <div className={"picture__wrapper"}>
            <img src={imageInfo.url} alt={imageInfo.name} title={imageInfo.name} className={"picture__wrapper__image"}/>
            <div className={"picture__wrapper__sidebar"}>
                <h2>Tags:</h2>
                <div className={"picture__wrapper__sidebar__selectors"}>
                    {selectors}
                </div>
            </div>
        </div>
    )
}

export default PicturePage