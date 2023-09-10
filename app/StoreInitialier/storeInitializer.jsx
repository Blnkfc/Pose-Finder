'use client';
import {useRef} from "react";
import {useStore} from "@/src/store";


const StoreInitializer = ({searchList, photoList, addPictureState}) => {


    const initializedPhoto = useRef(false)
    const initializedSearch = useRef(false)
    const initializedAddPicture = useRef(false)



    if(!initializedPhoto.current) {
        useStore.setState({photoList})
        initializedPhoto.current = true
    }
    if(!initializedSearch.current) {
        useStore.setState({searchList})
        initializedSearch.current = true
    }
    if(!initializedAddPicture.current) {
        useStore.setState({addPictureState})
        initializedSearch.current = true
    }


    return null
}

export default StoreInitializer