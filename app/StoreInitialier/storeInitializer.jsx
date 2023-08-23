'use client';
import {useRef} from "react";
import {useStore} from "@/src/store";


const StoreInitializer = ({photoList}, {searchList}) => {
    const initialized = useRef(false)
    if(!initialized.current) {
        useStore.setState({photoList})
        useStore.setState({searchList})
        initialized.current = true
    }
    return null
}

export default StoreInitializer