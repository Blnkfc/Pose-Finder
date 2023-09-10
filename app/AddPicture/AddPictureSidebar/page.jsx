'use client';
import {useEffect, useState} from "react";
import {useStore} from "@/src/store";


const AddPictureSidebar = () => {
    /*  INITIAL DATA FOR THE ADDPICTURE PAGE  */
    const initialData = useStore((state) => state.addPictureState)
    const feed = useStore((state) => state.photoList)
    const [feedState, setFeedState] = useState(feed)
    const cleanDataSet = JSON.stringify(initialData)

    /*  TITLE SETUP  */

    const [title, setTitle] = useState(initialData.title)

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
            updatedAddPicture.inputValue = titleValue;
            setTitle(titleValue)
            return { addPictureState: updatedAddPicture };
        });
    }


    /*  SELECTOR SETUP  */

    /*  DEFAULT VALUE OF SELECTORS  */
    const selectorsInitial = initialData.selectors
    /*  STATE FOR THE EASIER VALUE MANIPULATION LATER  */
    const [selectorsList, setSelectorsList] = useState(selectorsInitial)

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
                    {backgroundColor: S.isActive?"red":"white"}
                }
                onClick={() => {
                    toggleSelector(index)
                }}>
                {S.name}
            </button>)
    })

    /*  ADDITION TO STATE SETUP  */


    const [id, setId] = useState(initialData.id)
    useEffect(() => {
        setId(Math.random().toString(36).slice(2, 7));
    }, []);

    const newPhoto = {
        id: id,
        url: initialData.inputValue,
        name: title,
        selectors: selectorsList
    }
    const postToState = () => {
        retrieveTitle()
        const updatedFeed = [...feed]
        updatedFeed.push(newPhoto)
        console.log(feedState)
        setFeedState(updatedFeed)
    }


    return ( <div className="addPicture__sidebar">
        <div className="addPicture__sidebar__title">
            <input type="text" id={"sidebar_title"} />
        </div>
        <div className="addPicture__sidebar__selectors">{selectors}</div>
        <div className="addPicture__sidebar__submit" onClick={postToState}>
            <button>submit</button>
        </div>
    </div>)
}

export default AddPictureSidebar