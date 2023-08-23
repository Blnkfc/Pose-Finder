'use client'
import PictureBlock from "@/app/Feed/PictureBlock/PictureBlock";
import {useStore} from "@/src/store";
import {useEffect, useState} from "react";


const Feed = (props) => {
    const photoList = useStore((state) => state.photoList )
    const searchList = useStore((state) => state.searchList)
    const [photos, setPhotos] = useState([])


    useEffect(() => {
        setPhotos (
            photoList.map((PhotoUnit) => (<PictureBlock name={PhotoUnit.name} url={PhotoUnit.url} />))
        )
    }, [photoList])



    return (
        <div className={"feed"}>
            {photos}
        </div>
    )
}

export default Feed