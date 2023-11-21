'use client'
import PictureBlock from "./PictureBlock/page";
import {useStore} from "../../src/store";
import React, {useEffect, useState} from "react";
import FeedSidebar from "./FeedSidebar/FeedSidebar";
import Link from "next/link";
import FeedSidebarMobile from "./FeedSidebarMobile/FeedSidebarMobile";
import type {IPhotoUnit, ISearchListUnit} from "../interfaceList";


const Feed = () => {
    /*  CREATING INTERFACES  */
      /*  INITIALIZING FEED(PHOTOLIST) AND SELECTORS FOR SEARCH(SEACRCHLIST)  */
    const photoList: IPhotoUnit[] = useStore((state) => state.photoList)
    const searchList: ISearchListUnit[] = useStore((state) => state.searchList)

    /*  OBJECT WITH GENERAL LIST OF SELECTORS TO CHECK FOR ACTIVE SELECTORS LATER  */
    const initialSelectorList: ISearchListUnit[] = [
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
    function feedFilter(photoList: IPhotoUnit[], searchList: ISearchListUnit[]) {
        if (!photoList || !searchList) {
            console.log("Invalid data");
            return [];
        }
        // Get the indices of active selectors in the searchList
        const activeSelectorIndices: number[] = searchList
            .map((selector, index) => (selector.isActive ? index : -1))
            .filter((index) => index !== -1);

        // If no selectors are active, return the entire photoList
        if (activeSelectorIndices.length === 0) {
            return photoList;
        }

        // Filter the photoList based on active selectors
        const feedFiltered: IPhotoUnit[] = photoList.filter((photo) =>
            activeSelectorIndices.every((activeIndex) =>
                photo.selectors.some(
                    (selector) =>
                        selector.isActive &&
                        searchList[activeIndex].name === selector.name
                )
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
            <FeedSidebarMobile />
            <div className={"feed"}>
                {photos}
            </div>
            <div className="feed__sidebar__pc"><FeedSidebar /></div>
        </div>
    )
}

export default Feed