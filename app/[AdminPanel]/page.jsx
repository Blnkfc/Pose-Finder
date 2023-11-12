'use client';

import {useStore} from "@/src/store";
import PictureBlock from "@/app/Feed/PictureBlock/page";
import React, {useEffect, useState} from "react";
import styles from "./AdminPanel.css"
import crypto from "crypto";
import Link from "next/link";
import {usePathname} from "next/navigation";


const AdminPanel = () => {
    const photoList = useStore((state) => state.photoList)
    const setPhotoList = useStore((state) => state.setPhotoList)

    useEffect(() => {
        // GETTING THE DATA FROM LOCAL STORAGE
        const storedFeed = localStorage.getItem('feed');

        // PARSE THE DATA TO THE STATE SO IT STAY UPDATED
        if (storedFeed) {
            const parsedFeed = JSON.parse(storedFeed);
        }
    }, []);
    /*  DELETING THE GIVEN PICTURE VIA ID AND UPDATING LOCAL STORAGE  */
    function deletePicture (PhotoId) {
        const index = photoList.findIndex((i) => i.id === PhotoId);
        if (index !== -1) {
            const updatedPhotoList = [...photoList];
            updatedPhotoList.splice(index, 1);
            setPhotoList(updatedPhotoList);
            localStorage.setItem('feed', JSON.stringify(updatedPhotoList));
        }
    }


    const postList = photoList.map((PhotoUnit, index) => (
        <div key={index} style={{display:"inline", position:"relative"}} >
            <PictureBlock
                key={index}
                name={PhotoUnit.name}
                description={PhotoUnit.description}
                url={PhotoUnit.url}
                id={PhotoUnit.id}
            />
            <div className={"adminPanel__feed__options"} >
                <img src="/assets/adminPanel-edit.png" alt=""/>
                <img src="/assets/adminPanel-delete.png" alt="" onClick={() => deletePicture(PhotoUnit.id)} />
            </div>
        </div>
        ))

    const [generatedLink, setGeneratedLink] = useState("")
    useEffect(() => {
        let crypto = require("crypto")
        setGeneratedLink(crypto.randomBytes(40).toString('hex'));
    }, [])
    const pathname = usePathname()

    return (
        <div className={"adminPanel"} >
            <div className="adminPanel__feed">
                <Link href={`./${pathname}/${generatedLink}`}  className="adminPanel__feed__addPost" >
                    <img src="/assets/adminPanel-addPost.png" alt="" className="adminPanel__feed__addPost__img"/>
                </Link>
                {postList}
            </div>
        </div>
    )
}

export default  AdminPanel;