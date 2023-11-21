'use client';
import styles from "./addPost.css"
import {useEffect, useState} from "react";
import {useStore} from "@/src/store";
import Link from "next/link";
import {usePathname} from "next/navigation";

const AddPost = () => {
    const [initialData, setInitialData] = useState(useStore((state) => state.addPictureState))
    const feed = useStore((state) => state.photoList)
    const setFeedState = useStore((state) => state.setPhotoList);
    const authorisationData = useStore((state) => state.authorisation)
    /*  CURRENT PATH  */
    const path = usePathname()


    /*  LOAD SETUP  */
    const [link, setLink] = useState(initialData.url)

    /*  SETTING VALUE FOR INPUT ACCORDING TO STATE, HAPPENS ON link CHANGE  */
    useEffect(() => {
        const loadInput = document.querySelector('input[name=load_link]');
        if (loadInput) {
            loadInput.value = link;
        }
    }, [link]);

    /*  CHECKER THAT WILL SHOW THE TAG WHILE INPUT IS EMPTY  */
    const [expand, setExpand] = useState(true)

    /*  RETRIEVING LINK VALUE AND UPDATING THE STORE  */
    const retrieveLink = () => {
        const linkValue = document.getElementById("load_link").value;
        useStore.setState((state) => {
            const updatedAddPicture = state.addPictureState;
            updatedAddPicture.url = linkValue;
            setLink(linkValue)
            return { addPictureState: updatedAddPicture };
        });
        if(linkValue === ""){
            setExpand(true)
        }else{
            setExpand(false)
        }
    }


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
    /*  DESCRIPTION SETUP  */
    const [description, setDescription] = useState(initialData.description)
    useEffect(() => {
        const descriptionInput = document.querySelector('input[name=sidebar_description]');
        if (descriptionInput) {
            descriptionInput.value = title;
        }
    }, [title]);//HAPPENS ON CHANGE OF THE title

    const retrieveDescription = () => {
        const descriptionValue = document.getElementById("sidebar_description").value;
        useStore.setState((state) => {
            const updatedAddPicture = state.addPictureState;
            updatedAddPicture.description = descriptionValue;
            setDescription(descriptionValue)
            return { addPictureState: updatedAddPicture };
        });
        handleError()
    }


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
                    {backgroundColor: S.isActive?"#066d42":"#fff", color: S.isActive?"#fff":"#000"}
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
    let newPhoto = {
        id: id,
        url: initialData.url,
        name: title,
        selectors: selectorsList,
        description: description
    }

    /*  STATE OF THE ERROR  */
    const [error, setError] = useState(true)
    /*  EXPANDER FOR THE ALERT ABOUT ERROR  */
    const [errorExpand, setErrorExpand] = useState(false)
    /*  ERROR HANDLER FOR NAME AND URL AVAILABILITY  */
    useEffect(() => {
        if (newPhoto.url === "" || newPhoto.name === "" || newPhoto.description === ""){
            console.log(newPhoto.description === "" )
            setErrorExpand(true)
        }else{
            setError(false)
            setErrorExpand(false)
        }
    }, [error])


    const handleError = () => {
        if (newPhoto.url === "" || newPhoto.name === "" || newPhoto.description === ""){
            console.log(newPhoto.description)
            setErrorExpand(true)
        }else{
            setError(false)
            setErrorExpand(false)
        }
    }

    /*  SENDING THE DATA TO THE STATE AND UPDATING LOCAL STORAGE  */
    const postToState = () => {
        const updatedFeed = [...feed]
        updatedFeed.push(newPhoto)
        localStorage.setItem('feed', JSON.stringify(updatedFeed))
        newPhoto={
            id: "",
            url: "",
            name: "",
            selectors: [],
            description: ""
        }
        return setFeedState(updatedFeed)
    }





    return (
    <div className={"addPost"}>
        <div className="addPost__loadImg" style={{backgroundImage: link?`url(${link})`:`url("")`, backgroundSize: "contain"}} >
            <div className="addPost__loadImg__inputWrapper">
                <p style={{display: expand?"block":"none"}} >Paste the link in the box:</p>
                <input id={"load_link"} type="text" className="addPost__loadImg__inputWrapper__input" onChange={retrieveLink} />
            </div>
        </div>
        <div className="addPost__sidebar">
            <input type="text" className="addPost__sidebar__title" id={"sidebar_title"} onChange={retrieveTitle} />
            <textarea
                name=""
                id="sidebar_description"
                cols="30"
                rows="10"
                className="addPost__sidebar__description"
                onChange={retrieveDescription}>

            </textarea>
            <div className="addPost__sidebar__selectors">{selectors}</div>
            <div
                className="addPicture__sidebar__submit__error"
                style={{display: errorExpand?"flex":"none"}}
            >
                <p>Url, name or description for image were not set</p>
                <button onClick={handleError} >⭮</button>
            </div>
            <Link
                className={"addPost__sidebar__createBtn"}
                onClick={handleError}
                href={"/"+path}
                style={{display: error?"block":"none", background:error?"#066d42":""}} >Submit</Link>
            <Link
                className={"addPost__sidebar__createBtn"}
                onClick={postToState}
                href={"/"+authorisationData.path}
                style={{display: error?"none":"block", background:error?"":"#066d42"}} >Submit</Link>
        </div>
    </div>
)
}

export default AddPost