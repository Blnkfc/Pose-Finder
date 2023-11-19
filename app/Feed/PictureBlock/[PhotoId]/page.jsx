'use client';
import styles from "./PhotoId.module.css"
import {useStore} from "@/src/store";
import Link from "next/link";
import {useEffect, useState} from "react";


function PicturePage({params}){
    /*  INITIALIZING THE GIVEN LIT OF PHOTOS  */
    const photoList = useStore((state) => state.photoList)
    const setPhotoList = useStore((state) => state.setPhotoList)

    /*  RETRIEVING DATA ABOUT FRUIT MENU  */
    const fruitMenuData = useStore((state) => state.fruitMenu)

    /*  STATE FOR FRUITY MENU DISPLAY  */
    const[listDisplay, setListDisplay] = useState(false)
    /*  STATE FOR BALLS LIST  */
    const[ballsDisplay, setBallsDisplay] = useState(false)
    /*  STATE FOR JUICE LIST  */
    const[juiceDisplay, setJuiceDisplay] = useState(false)
    /*  TOGGLE TO MAKE BALLS APPEAR  */
    const toggleBalls = () => {
        setBallsDisplay(!ballsDisplay)
    }
    /*  TOGGLE TO MAKE JUICE APPEAR  */
    const toggleJuice = () => {
        setJuiceDisplay(!juiceDisplay)

    }
    const ballsList = fruitMenuData.balls
    const juiceList = fruitMenuData.juice
    /*  KIZZMA  */
    const balls = ballsList.map((ballType, index) => (<span key={index} >{ballType}</span> ))
    const juices = juiceList.map((juiceType, index) => (<span key={index}  >{juiceType}</span>))



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

    /*  PARSING INFORMATION ABOUT SELECTORS FROM STATE OF IMAGE  */
    if(imageInfo){
        imageInfo.selectors.forEach((selector) => {
            if(selector.isActive){
                selectorList.push(selector.name)
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
    console.log(imageInfo)
    useEffect(() => {
        imageInfo.selectors.forEach((selector)=>{
            if(selector.name === "Fruity" && selector.isActive){
                setListDisplay(true)
            }
        })
    },[])

    /*  DELETING THE GIVEN PICTURE VIA ID AND UPDATING LOCAL STORAGE  */
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

    console.log(imageInfo.url)
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
                <div className="picture__wrapper__sidebar__description">
                    {imageInfo.description}
                </div>
                <h2>Categories:</h2>
                <div className={"picture__wrapper__sidebar__selectors"}>
                    {selectors}
                </div>
                <div className="picture__wrapper__sidebar__fruitMenu" style={{display:listDisplay?"block":"none"}}>
                    <div className={"picture__wrapper__sidebar__fruitMenu__btn"} >
                        <img src="/assets/pictureBlock-list-balls.png" alt="" onClick={toggleBalls} />
                        <img src="/assets/pictureBlock-list-juice.png" alt="" onClick={toggleJuice} />
                        <span style={{transform:"rotate(180deg)", display:"inline-block"}}>&#10145;</span> Menu
                    </div>
                    <div className="picture__wrapper__sidebar__fruitMenu__list "
                         style={{display:ballsDisplay?"flex":"none"}}
                         onClick={toggleBalls}>
                        <div className="picture__wrapper__sidebar__fruitMenu__list__close" onClick={toggleBalls} >&#10006;</div>
                        {balls}
                    </div>
                    <div className="picture__wrapper__sidebar__fruitMenu__list"
                         style={{display:juiceDisplay?"flex":"none"}}
                         onClick={toggleJuice}>
                        <div className="picture__wrapper__sidebar__fruitMenu__list__close" onClick={toggleJuice} >&#10006;</div>
                        {juices}
                    </div>
                </div>
                <div className="picture__wrapper__sidebar__order">
                    <span>Order here</span>
                    <a href={"https://glovoapp.com/ua/uk/odesa/maomi-ods/?utm_source=google&utm_medium=cpc&utm_campaign=google_search_Nonbrand_UA_ALL_web_DSA_digitalbudget_ukranian&utm_campaignid=20334496701&utm_adgroupid=147768229101&utm_term=%28_term%29&utm_matchtype=%28_matchtype%29&utm_device=%28_device%29&gclid=CjwKCAiA9dGqBhAqEiwAmRpTC3pF-HIMOHtu1hblwz0hT462YBIMfa0yFShWZ2w-7Hp2OTvdxFyuEhoCbT4QAvD_BwE"} >
                        <img src="/assets/glovo-primary.png" alt=""/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PicturePage