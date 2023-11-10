'use client';
import React, { useEffect, useState } from "react";
import {useStore} from "@/src/store"

import variables from "@/app/variables.module.scss"




const FeedSidebar = () => {
    /*  LIST OF SELECTORS FROM THE STORE  */
    const searchList = useStore((state) => state.searchList)


    /*  SETTING STATE FOR LIST OF ACTIVE CATEGORIES  */
    const [activeCategoryList, setActiveCategoryList] = useState(searchList)

    /*  ON CLICK HANDLER FOR CATEGORY STATE CHANGES, TOGGLES STATE OF CATEGORIES FALSE\TRUE  */
    const toggleCategory = (index) => {
        useStore.setState((state) => {
            const updatedSearchList = [...state.searchList];
            updatedSearchList[index].isActive = !updatedSearchList[index].isActive;
            return { searchList: updatedSearchList };
        });
    };


    /*  LISTING ALL EXISTING CATEGORIES AND STYLING DEPENDING ON THE STATE OF CATEGORY  */
    const categories = activeCategoryList.map((C, index) => {
        return(
            <button
                key={index}
                style={
                {backgroundColor: C.isActive?"#066d42":"#fff", color: C.isActive?"#fff":"#000"}
            }
                onClick={() => {
                    toggleCategory(index)
                }}>
                {C.name}
            </button>
        )
    })


    return (
        <div className={"feed__sidebar"}>
            <h3>Categories</h3>
            <div className={"feed__sidebar__categories"}>{categories}</div>
        </div>
    );
};

export default FeedSidebar;
