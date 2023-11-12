'use client';
import React, { useEffect, useState } from "react";
import {useStore} from "@/src/store"

import variables from "@/app/variables.module.scss"




const FeedSidebar = () => {
    /*  LIST OF SELECTORS FROM THE STORE  */
    const searchList = useStore((state) => state.searchList)
    const layoutInfo = useStore((state) => state.feedLayout)


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

    const [grid, setGrid] = useState(layoutInfo.grid)
    const [list, setList] = useState(layoutInfo.list)
    const toggleGrid = () => {
        useStore.setState((state) => {
            const updatedLayoutInfo = [state.feedLayout];
            updatedLayoutInfo.grid = true;
            updatedLayoutInfo.list = false;
            return { feedLayout: updatedLayoutInfo };
        });
    }
    const toggleList = () => {
        useStore.setState((state) => {
            const updatedLayoutInfo = [state.feedLayout];
            updatedLayoutInfo.grid = false;
            updatedLayoutInfo.list = true;
            return { feedLayout: updatedLayoutInfo };
        });
    }


    return (
        <div className={"feed__sidebar"}>
            <div className="feed__layoutPicker">
                <h3>Categories</h3>
                <button className={layoutInfo.grid?'feed__layoutPicker__btn__active':"feed__layoutPicker__btn"}
                        onClick={toggleGrid} >
                    <img src="/assets/feed-sidebar-grid.png"
                         alt="Grid"/>
                </button>
                <button className={layoutInfo.grid?'feed__layoutPicker__btn':"feed__layoutPicker__btn__active"}
                        onClick={toggleList} >
                    <img src="/assets/feed-sidebar-list.png"
                         alt="List"/>
                </button>
            </div>
            <div className={"feed__sidebar__categories"}>{categories}</div>
        </div>
    );
};

export default FeedSidebar;
