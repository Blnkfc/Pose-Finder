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
    /*  RETRIEVING DATA ABOUT FRUIT MENU  */
    const fruitMenuData = useStore((state) => state.fruitMenu)

    /*  STATE FOR INDICATING THE FRUIT DRINK  */
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
    const balls = ballsList.map((ballType) => (<span>{ballType}</span> ))
    const juices = juiceList.map((juiceType) => (<span>{juiceType}</span>))



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
                    style={{ backgroundColor: S.isActive ? "#066d42" : "#fff", display:S.isActive?"flex":"none"}}
                >
                    {S.name}
                </div>
            ))
            : null;

    useEffect(() => {
        pictureData.selectors.forEach((selector)=>{
            if(selector.name === "Fruity" && selector.isActive){
                setListDisplay(true)
            }
        })
    },[])
    return (
        <div  className={"pictureBlock"}
              style={{width: grid?"49%":"99%", height: grid?"10em":"17em"}} >

            <div className="pictureBlock__balls pictureBlock__fruitMenu" style={{display:!ballsDisplay?"none":"block"}} >
                <div className="pictureBlock__balls__wrapper ">
                    {balls}
                </div>
                <div className="pictureBlock__balls__menu" onClick={toggleBalls} >x</div>
            </div>
            <div className="pictureBlock__juice pictureBlock__fruitMenu" style={{display:!juiceDisplay?"none":"block"}} >
                <div className="pictureBlock__juice__wrapper">
                    {juices}
                </div>
                <div className="pictureBlock__balls__menu" onClick={toggleJuice} >x</div>
            </div>



            <div className={"pictureBlock__image__wrapper"}>
                <Link
                    href={`/Feed/PictureBlock/${props.id}`}
                    style={{backgroundImage: `url("${props.url}")`, backgroundSize: "contain",
                    backgroundPosition: "center", height: grid?"9.5em":"16em"}} >
                </Link>

                <div className={"pictureBlock__image__info"}  >
                    <h3 style={{fontSize:grid?"1.7em":"3em"}} >{props.name}</h3>
                    <div
                        className="pictureBlock__image__info__description"
                        style={{fontSize:grid?"1em":"1.7em"}}>
                        {props.description}
                    </div>
                    <div className="pictureBlock__image__info__lists" style={{display: listDisplay?"flex":"none"}} >
                        <button className="pictureBlock__image__info__lists__btn" onClick={toggleBalls} >
                            <img src="/assets/pictureBlock-list-balls.png" alt=""/>
                        </button>
                        <button className="pictureBlock__image__info__lists__btn" onClick={toggleJuice} >
                            <img src="/assets/pictureBlock-list-juice.png" alt=""/>
                        </button>
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