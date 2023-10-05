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
    /*  TODO  */
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
    }, []) //HAPPENS ONLY WHE LOADING THE PAGE



    /*  TITLE SETUP  */
    const [title, setTitle] = useState(initialData.name)

    useEffect(() => {
        const titleInput = document.querySelector('input[name=sidebar_title]');
        if (titleInput) {
            titleInput.value = title;
        }
    }, [title]);//HAPPENS ON CHANGE OF THE title

    const retrieveTitle = () => {
        const titleValue = document.getElementById("sidebar_title").value;
        useStore.setState((state) => {
            const updatedAddPicture = state.addPictureState;
            updatedAddPicture.name = titleValue;
            setTitle(titleValue)
            return { addPictureState: updatedAddPicture };
        });
        handleError()
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

    /*  MAPPING SELECTORS INTO THE LIST OF BUTTONS  */
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
        // GETTING THE DATA FROM LOCAL STORAGE
        const storedFeed = localStorage.getItem('feed');

        // PARSE THE DATA TO THE STATE SO IT STAY UPDATED
        if (storedFeed) {
            const parsedFeed = JSON.parse(storedFeed);
            setFeedState(parsedFeed);
        }
    }, []);

    /*  DATA ERROR HANDLING  SETUP  */
    //CREATING THE OBJECT THAT WILL BE ADDED TO THE photoList
    const newPhoto = {
        id: id,
        url: initialData.url,
        name: title,
        selectors: selectorsList
    }

    /*  STATE OF THE ERROR  */
    const [error, setError] = useState(true)
    /*  EXPANDER FOR THE ALERT ABOUT ERROR  */
    const [errorExpand, setErrorExpand] = useState(false)
    /*  ERROR HANDLER FOR NAME AND URL AVAILABILITY  */
    const handleError = () => {
        if (newPhoto.url === "" || newPhoto.name === ""){
            setErrorExpand(true)
        }else{
            setError(false)
            setErrorExpand(false)
        }
    }

    /*  SENDING THE DATA TO THE STATE AND UPDATING LOCAL STORAGE  */
    const postToState = () => {
            const updatedFeed = [...feed];
            updatedFeed.push(newPhoto);
            localStorage.setItem('feed', JSON.stringify(updatedFeed));
            return setFeedState(updatedFeed);
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
                style={{display: errorExpand?"flex":"none"}}
                >
                <p>Url or name for image were not set</p>
                <button onClick={handleError} >⭮</button>
            </div>
            <Link
                onClick={handleError}
                href={"/AddPicture"}
                style={{display: error?"block":"none"}} >Submit</Link>
            <Link
                onClick={postToState}
                href={"/Feed"}
                style={{display: error?"none":"block"}} >Submit</Link>
        </div>
    </div>)
}

export default AddPictureSidebar