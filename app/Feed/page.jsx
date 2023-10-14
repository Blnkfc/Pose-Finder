'use client'
import PictureBlock from "@/app/Feed/PictureBlock/page";
import {useStore} from "@/src/store";
import React, {useEffect, useState} from "react";
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";
import Link from "next/link";


const Feed = () => {
      /*  INITIALIZING FEED(PHOTOLIST) AND SELECTORS FOR SEARCH(SEACRCHLIST)  */
    const photoList = useStore((state) => state.photoList)
    const searchList = useStore((state) => state.searchList)

    /*  OBJECT WITH GENERAL LIST OF SELECTORS TO CHECK FOR ACTIVE SELECTORS LATER  */
    const initialSelectorList = [
        { name: "Male", isActive: false },
        { name: "Female", isActive: false },
        { name: "Hands", isActive: false },
        { name: "Legs", isActive: false },
        { name: "Head", isActive: false },
        { name:  "Face Features", isActive: false},
        { name: "Waist", isActive: false },
        { name: "Full Body", isActive: false },
        { name:  "Upper Body", isActive: false},
        { name:  "Lower Body", isActive: false},
        { name:  "Standing Position", isActive: false},
        { name:  "Sitting Position", isActive: false},
        { name:  "Laying Position", isActive: false},
        { name:  "Moving Position", isActive: false},
        { name:  "Facial Expression", isActive: false}
    ]


    /*  SETTING UP THE LIST TO PHOTOS TO SHOW IN FEED  */
    const [photos, setPhotos] = useState([])


    /*  CHECK FOR ACTIVE SELECTORS  */
    /*  photoList IS THE LIST OF ALL PHOTOS IN FEED, selectorList IS A SET OF SELECTORS FROM THE STATE FORM  */
    /*  bless the openAI for developing chatGPT, I hope you live long and happy life  */
    function feedFilter(photoList, searchList) {
        if (!photoList || !searchList) {
            console.log("Invalid data");
            return [];
        }

        // Get the indices of active selectors in the searchList
        const activeSelectorIndices = searchList
            .map((selector, index) => (selector.isActive ? index : -1))
            .filter((index) => index !== -1);

        // If no selectors are active, return the entire photoList
        if (activeSelectorIndices.length === 0) {
            return photoList;
        }

        // Filter the photoList based on active selectors
        const feedFiltered = photoList.filter((photo) =>
            photo.selectors.some(
                (selector) =>
                    selector.isActive &&
                    activeSelectorIndices.includes(searchList.findIndex((s, index) => s.name === selector.name))
            )
        );

        return feedFiltered;
    }




    /*  INITIALIZING THE LIST OF PHOTOS TO SHOW IN FEED, ONLY HAPPENS ON photoList OR searchList UPDATE  */
    useEffect(() => {
        setPhotos (
            feedFilter(photoList, searchList)
                .map((PhotoUnit, index) => (<PictureBlock
                    key={index}
                    name={PhotoUnit.name}
                    url={PhotoUnit.url}
                    id={PhotoUnit.id}
                    searchlist={searchList} />))
        )
    }, [photoList, searchList])


    const [expand, setExpand] = useState(false)
    const toggleExpand = () => {
        return setExpand(!expand)
    }

    return (
        <div className={"feed__wrapper"}>
            <div className={"feed"}>
                <div
                    className="feed__mobile"
                    onClick={toggleExpand}
                    style={{display: expand?"block":"none", zIndex: expand?"9":"0"}} >
                </div>
                {photos}
            </div>
            <div className="feed__sidebar__mobile" style={{height: expand?"100%":"auto"}}  >
                <button onClick={toggleExpand} style={{display: expand?"none":"block"}} >
                    &#9776;
                </button>
                <div className={"feed__sidebar__mobile__selectors"} style={{display: expand?"block":"none"}} >
                    <FeedSidebar  />
                </div>

            </div>
            <div className="feed__sidebar__pc"><FeedSidebar   /></div>
        </div>
    )
}

export default Feed