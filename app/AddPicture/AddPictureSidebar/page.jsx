'use client';
import {useEffect, useState} from "react";
import {useStore} from "@/src/store";
import Link from "next/link";


const AddPictureSidebar = () => {
    /*  INITIAL DATA FOR THE NEW PICTURE OBJECT  */
    const [initialData, setInitialData] = useState(useStore((state) => state.addPictureState))
    const feed = useStore((state) => state.photoList)
    const setFeedState = useStore((state) => state.setPhotoList);

    /*  CLEAN DATA SET FOR RESTORING STARTING POSITION OF THE PAGE  */
    const cleanDataSet = {
        pictureId: "",
        name: "",
        url: "",
        selectors: [
            { name: "Male", isActive: false },
            { name: "Female", isActive: false },
            { name: "Hands", isActive: false },
            { name: "Legs", isActive: false },
            { name: "Head", isActive: false },
            { name: "Waist", isActive: false }
        ]}

    /*  ID SETUP  */
    const [id, setId] = useState(initialData.pictureId)
    useEffect(() => {
        const newId = Math.random().toString(36).slice(2,7)
        setId(newId)
    }, [])

    /*  TITLE SETUP  */

    const [title, setTitle] = useState(initialData.name)

    useEffect(() => {
        const titleInput = document.querySelector('input[name=sidebar_title]');
        if (titleInput) {
            titleInput.value = title;
        }
    }, [title]);

    const retrieveTitle = () => {
        const titleValue = document.getElementById("sidebar_title").value;
        useStore.setState((state) => {
            const updatedAddPicture = state.addPictureState;
            updatedAddPicture.name = titleValue;
            setTitle(titleValue)
            return { addPictureState: updatedAddPicture };
        });
    }


    /*  SELECTOR SETUP  */

    /*  DEFAULT VALUE OF SELECTORS  */
    /*  STATE FOR THE EASIER VALUE MANIPULATION LATER  */
    const [selectorsList, setSelectorsList] = useState(initialData.selectors)

    /*  FUNCTION FOR CHANGING THE VALUE OF GIVEN SELECTOR TO OPPOSITE  */
    const toggleSelector = (index) => {
        /*  COPY THE INITIAL DATA TO PREVENT MUTABILITY  */
        const updatedSelectorsList = [...selectorsList];
        /*  REVERSING THE BOOL VALUE OF THE SELECTOR  */
        updatedSelectorsList[index].isActive = !updatedSelectorsList[index].isActive;
        return setSelectorsList(updatedSelectorsList)
    }

    /*  MAPPING SELECTORS INO THE LIST OF BUTTONS  */
    const selectors = selectorsList.map((S, index) => {
        return(
            <button
                key={index}
                style={
                    {backgroundColor: S.isActive?"#00c2bf":"#1f1f1f"}
                }
                onClick={() => {
                    toggleSelector(index)
                }}>
                {S.name}
            </button>)
    })

    /*  ADDITION TO STATE SETUP  */


    useEffect(() => {
        // Load the data from local storage
        const storedFeed = localStorage.getItem('feed');

        // Parse the data and set it to the state
        if (storedFeed) {
            const parsedFeed = JSON.parse(storedFeed);
            setFeedState(parsedFeed);
        }
    }, []);

    /*  DATA ERROR HANDLING  SETUP  */
    const newPhoto = {
        id: id,
        url: initialData.url,
        name: title,
        selectors: selectorsList
    }


    const [error, setError] = useState(false)
    const [path, setPath] = useState("/AddPicture   ")
    const toggleError = (error) => {
        setError(!error)
    }
    const handleError = () => {
        if(JSON.stringify(newPhoto.url) || JSON.stringify(newPhoto.name) === ""){
            toggleError()
            setPath("/Feed")
        }
        console.log(newPhoto.url)
        console.log(newPhoto.name)
        console.log(JSON.stringify(newPhoto.url) || JSON.stringify(newPhoto.name) === "")
    }



    const postToState = () => {
        if (newPhoto.name || newPhoto.url === "") {
            toggleError()
        }else{
            const updatedFeed = [...feed];
            updatedFeed.push(newPhoto);
            localStorage.setItem('feed', JSON.stringify(updatedFeed));
            return setFeedState(updatedFeed);

        }
    }


    return ( <div className="addPicture__sidebar">
        <div className="addPicture__sidebar__title">
            <p>Enter the title:</p>
            <input type="text" id={"sidebar_title"} onChange={retrieveTitle} />
        </div>
        <p>Choose the tags <br/> according to your image (optional)</p>
        <div className="addPicture__sidebar__selectors">{selectors}</div>
        <div className="addPicture__sidebar__submit" >
            <div
                className="addPicture__sidebar__submit__error"
                style={{display: error?"flex":"none"}}>
                <p>Url or name for image were not set</p>
                <button onClick={handleError} >⭮</button>
            </div>
            <Link  onClick={postToState} href={path} >Submit</Link>
        </div>
    </div>)
}

export default AddPictureSidebar