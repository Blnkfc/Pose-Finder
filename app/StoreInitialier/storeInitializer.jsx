'use client';
import {useRef} from "react";
import {useStore} from "@/src/store";


const StoreInitializer = ({searchList, photoList, addPictureState, authorisation, feedLayout, fruitMenu, FAQList, contactsList}) => {


    const initializedPhoto = useRef(false)
    const initializedSearch = useRef(false)
    const initializedAddPicture = useRef(false)
    const initializedAuthorisation = useRef(false)
    const initializedFeedLayout = useRef(false)
    const initializedFruitMenu = useRef(false)
    const initializedFAQList = useRef(false)
    const initializedContactsList = useRef(false)


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
        initializedAddPicture.current = true
    }
    if(!initializedAuthorisation.current) {
        useStore.setState({authorisation})
        initializedAuthorisation.current = true
    }
    if(!initializedFeedLayout.current) {
        useStore.setState({feedLayout})
        initializedFeedLayout.current = true
    }
    if(!initializedFruitMenu.current) {
        useStore.setState({fruitMenu})
        initializedFruitMenu.current = true
    }
    if(!initializedFAQList.current) {
        useStore.setState({FAQList})
        initializedFAQList.current = true
    }
    if(!initializedContactsList.current) {
        useStore.setState({contactsList})
        initializedContactsList.current = true
    }


    return null
}

export default StoreInitializer