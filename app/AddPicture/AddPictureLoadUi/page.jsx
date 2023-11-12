'use client'
import {useStore} from "@/src/store";
import {useEffect, useState} from "react";


const AddPictureLoadUi =  () => {
    /*  INITIAL DATA FOR THE ADDPICTURE PAGE  */
    const initialData = useStore((state) => state.addPictureState)

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

    return (
        <div className="addPicture__load" style={{backgroundImage: link?`url(${link})`:`url("")`, backgroundSize: "cover"}}>
            <div className={"addPicture__load__input"}>
                <p style={{display: expand?"block":"none"}} >Paste the link in the box:</p>
                <input type="text" id="load_link"  onChange={retrieveLink}  ></input>
            </div>
    </div>)
}


export default AddPictureLoadUi