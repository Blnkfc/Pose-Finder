'use client'
import PictureBlock from "@/app/Feed/PictureBlock/page";
import {useStore} from "@/src/store";
import React, {useEffect, useState} from "react";
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";
import Link from "next/link";
import FeedSidebarMobile from "@/app/Feed/FeedSidebarMobile/FeedSidebarMobile";




const Feed = () => {
      /*  INITIALIZING FEED(PHOTOLIST) AND SELECTORS FOR SEARCH(SEACRCHLIST)  */
    const photoList = useStore((state) => state.photoList)
    const searchList = useStore((state) => state.searchList)

    useEffect(() => {
        // GETTING THE DATA FROM LOCAL STORAGE
        const storedFeed = localStorage.getItem('feed');
        // PARSE THE DATA TO THE STATE SO IT STAY UPDATED
        if (storedFeed) {
            const parsedFeed = JSON.parse(storedFeed);
        }
    }, []);
    /*  OBJECT WITH GENERAL LIST OF SELECTORS TO CHECK FOR ACTIVE SELECTORS LATER  */
    const initialSelectorList = [
        { name: "Special", isActive: false },
        { name: "Milky", isActive: false },
        { name: "Powder", isActive: false },
        { name: "Tapioca", isActive: false },
        { name: "Syrup", isActive: false },
        { name: "Juice balls", isActive: false},
        { name: "Food", isActive: false }
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
                    description={PhotoUnit.description}
                    searchlist={searchList}
                />))
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