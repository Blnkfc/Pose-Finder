'use client';
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";
import styles from "./FeedSidebarMobile.module.css"
import React, {useState} from "react";
import {useStore} from "@/src/store";

const FeedSidebarMobile = () => {
    const layoutInfo = useStore((state) => state.feedLayout)
    const [expand, setExpand] = useState(false)
    const toggleExpand = () => {
        return setExpand(!expand)
    }

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


    return (<div className="feed__nav__mobile" style={{height: expand?"100%":"auto"}}  >
        <button onClick={toggleExpand} className={"feed__nav__mobile__sidebar__btn"} style={{display: expand?"none":"block"}} >
            &#9776;
        </button>
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
        <div
            className="feed__mobile"
            onClick={toggleExpand}
            style={{display: expand?"block":"none", zIndex: expand?"9":"0"}} >
        </div>
        <div className={"feed__nav__mobile__selectors"} style={{display: expand?"block":"none"}} >
            <FeedSidebar  />
        </div>
    </div>)
}

export default FeedSidebarMobile