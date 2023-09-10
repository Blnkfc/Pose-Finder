'use client'
import PictureBlock from "@/app/Feed/PictureBlock/page";
import {useStore} from "@/src/store";
import React, {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";


const Feed = () => {
      /*  INITIALIZING FEED(PHOTOLIST) AND SELECTORS FOR SEARCH(SEACRCHLIST)  */
    const photoList = useStore((state) => state.photoList)
    const searchList = useStore((state) => state.searchList)

    const initialSelectorList = [
        { name: "Male", isActive: false },
        { name: "Female", isActive: false },
        { name: "Hands", isActive: false },
        { name: "Legs", isActive: false },
        { name: "Head", isActive: false },
        { name: "Waist", isActive: false }
    ]


    /*  SETTING UP THE LIST TO PHOTOS TO SHOW IN FEED  */
    const [photos, setPhotos] = useState([])


    /*  CHECK FOR ACTIVE SELECTORS  */
    /*  photoList IS THE LIST OF ALL PHOTOS IN FEED, selectorList IS A SET OF SELECTOR IN GENERAL FORM  */
   function feedFilter (photoList, selectorList) {
       const photoListFiltered = []
       if (JSON.stringify(selectorList) === JSON.stringify(initialSelectorList)) {
          return photoList;
       }else{
           for(let i=0;i<photoList.length;i++){
               const photoSelectors = photoList[i].selectors;
               if (JSON.stringify(photoSelectors) === JSON.stringify(selectorList)) {
                   photoListFiltered.push(photoList[i]);
               }
           }
           return photoListFiltered
       }
   }


    /*  INITIALIZING THE LIST OF PHOTOS TO SHOW IN FEED  */
    useEffect(() => {
        setPhotos (
            feedFilter(photoList, searchList)
                .map((PhotoUnit, index) => (<PictureBlock key={index} name={PhotoUnit.name} url={PhotoUnit.url} id={PhotoUnit.id} searchlist={searchList} />))
        )
    }, [photoList, searchList])



    return (
        <div className={"feed__wrapper"}>
            <div className={"feed"}>
                {photos}
            </div>
            <FeedSidebar className={"feed__sidebar"}  />
        </div>
    )
}

export default Feed