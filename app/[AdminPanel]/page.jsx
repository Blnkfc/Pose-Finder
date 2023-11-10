'use client';

import {useStore} from "@/src/store";
import PictureBlock from "@/app/Feed/PictureBlock/page";
import React from "react";
import styles from "./AdminPanel.css"


const AdminPanel = () => {
    const photoList = useStore((state) => state.photoList)
    const postList = photoList.map((PhotoUnit, index) => (<PictureBlock
        key={index}
        name={PhotoUnit.name}
        description={PhotoUnit.description}
        url={PhotoUnit.url}
        id={PhotoUnit.id} />))
    return (
        <div className={"adminPanel"} >
            <div className="adminPanel__feed">
                <div className="adminPanel__feed__addPost">

                </div>
                {postList}
            </div>
        </div>
    )
}

export default  AdminPanel;