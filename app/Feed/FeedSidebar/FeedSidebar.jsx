'use client';
import React, { useEffect, useState } from "react";
import {useStore} from "@/src/store"

const FeedSidebar = (props) => {
    const searchList = useStore((state) => state.searchList)

    const initialCategoryActive = [
        { name: "Male", isActive: false },
        { name: "Female", isActive: false },
        { name: "Hands", isActive: false },
        { name: "Legs", isActive: false },
        { name: "Head", isActive: false },
        { name: "Waist", isActive: false },
    ];
    const [activeCategoryList, setActiveCategoryList] = useState(initialCategoryActive)
    const toggleCategory = (index) => {
        const activeCategoryListCopy = [...activeCategoryList]
        activeCategoryListCopy[index].isActive = !activeCategoryListCopy[index].isActive
        setActiveCategoryList(activeCategoryListCopy)
        console.log(activeCategoryListCopy[index].isActive)
    }


    const categories = activeCategoryList.map((C, index) => {
        return(
            <button
                style={
                {backgroundColor: C.isActive?"red":"white"}
            }
                onClick={() => {
                    toggleCategory(index)
                }}>
                {C.name}
            </button>
        )
    })


    return (
        <div>
            <h3>Categories</h3>
            <div className={"feed__sidebar__categories"}>{categories}</div>
        </div>
    );
};

export default FeedSidebar;
