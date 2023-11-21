'use client';
import {useEffect, useState} from "react";
import AddPictureLoadUi from "./AddPictureLoadUi/page";
import AddPictureSidebar from "./AddPictureSidebar/page";


const AddPicture = () => {

    return (
        <div className={"addPicture"}>
            <AddPictureLoadUi />
            <AddPictureSidebar />
        </div>
    )
}

export default AddPicture