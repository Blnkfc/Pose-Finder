'use client'
import PictureBlock from "@/app/Feed/PictureBlock/page";
import {useStore} from "@/src/store";
import React, {useEffect, useState} from "react";
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";


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
   /*function feedFilter (photoList, selectorList) {
       const photoListFiltered = []
       let indexList = []
       let activeSelectorsList = []
       for (let i = 0; i < searchList.length; i++){
           if(selectorList[i].isActive){
               indexList.push(i)
               return indexList
           }
       }

       if (JSON.stringify(selectorList) === JSON.stringify(initialSelectorList)) {
          return photoList;
       }
       console.log("af")
       for(let i=0;i<photoList.length;i++){
           const photoSelectors = photoList[i].selectors;
           for(let j=0;j<indexList;j++){
               if(photoSelectors[indexList[j]].isActive === true){
                   activeSelectorsList.push(photoSelectors[indexList[j]])
                   console.log(activeSelectorsList)
               }
           }
           if (selectorList.includes(activeSelectorsList)) {
               photoListFiltered.push(photoList[i]);
           }
           activeSelectorsList = []
       }

       return photoListFiltered
   }*/
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