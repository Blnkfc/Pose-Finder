'use client';
import React, { useEffect, useState } from "react";
import {useStore} from "@/src/store"

const FeedSidebar = (props) => {
    /*  SEARCH LIST REFERENCE FROM THE STORE  */
    const searchList = useStore((state) => state.searchList)


    /*  SETTING STATE FOR LIST OF ACTIVE CATEGORIES  */
    const [activeCategoryList, setActiveCategoryList] = useState(searchList)

    /*  ON CLICK HANDLER FOR STATE CHANGES, TOGGLES STATE OF CATEGORIES  */
    const toggleCategory = (index) => {
        useStore.setState((state) => {
            const updatedSearchList = [...state.searchList];
            updatedSearchList[index].isActive = !updatedSearchList[index].isActive;
            return { searchList: updatedSearchList };
        });
    };
    /*  LISTING ALL EXISTING CATEGORIES  */
    const categories = activeCategoryList.map((C, index) => {
        return(
            <button
                key={index}
                style={
                {backgroundColor: C.isActive?"#00c2bf":"#1f1f1f", color: C.isActive?"#fff":"#cfcfcf" }
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
