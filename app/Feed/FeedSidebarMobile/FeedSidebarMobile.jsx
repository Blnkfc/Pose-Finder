'use client';
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";
import styles from "./FeedSidebarMobile.module.css"
import React, {useState} from "react";

const FeedSidebarMobile = () => {

    const [expand, setExpand] = useState(false)
    const toggleExpand = () => {
        return setExpand(!expand)
    }


    return (<div className="feed__nav__mobile" style={{height: expand?"100%":"auto"}}  >
        <button onClick={toggleExpand} className={"feed__nav__mobile__sidebar__btn"} style={{display: expand?"none":"block"}} >
            &#9776;
        </button>
        <div className="feed__nav__mobile__searchBar">
            <button>
                <img src="/assets/feed-nav-mobile-search.png" alt=""/>
            </button>
            <input type="text"/>
        </div>
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