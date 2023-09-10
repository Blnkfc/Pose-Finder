'use client';
import {useStore} from "@/src/store";
import {useEffect, useState} from "react";
import AddPictureLoadUi from "@/app/AddPicture/AddPictureLoadUi/page";
import AddPictureSidebar from "@/app/AddPicture/AddPictureSidebar/page";


const AddPicture = () => {

    return (
        <div className={"addPicture"}>
            <AddPictureLoadUi />
            <AddPictureSidebar />
        </div>
    )
}

export default AddPicture