
import {useStore} from "@/src/store";
import {useEffect, useState} from "react";


const AddPictureLoadUi =  () => {
    /*  INITIAL DATA FOR THE ADDPICTURE PAGE  */
    const initialData = useStore((state) => state.addPictureState)

    /*  LOAD SETUP  */
    /* const initialLinkValue = initialData.inputValue*/
    const [link, setLink] = useState(initialData.inputValue)
    /*  SETTING VALUE FOR INPUT ACCORDING TO STATE  */

    useEffect(() => {
        const loadInput = document.querySelector('input[name=load_link]');
        if (loadInput) {
            loadInput.value = link;
        }
    }, [link]); // Run this effect whenever 'link' changes

    const retrieveLink = () => {
        const linkValue = document.getElementById("load_link").value;
        useStore.setState((state) => {
            const updatedAddPicture = state.addPictureState;
            updatedAddPicture.inputValue = linkValue;
            setLink(linkValue)
            return { addPictureState: updatedAddPicture };
        });
    }

    return (
        <div className="addPicture__load" style={{backgroundImage: link?`url(${link})`:`url("")`, backgroundSize: "cover"}}>

            <div className={"addPicture__load__input"}>
                <input type="text" id="load_link" ></input>
                <button onClick={retrieveLink}  >Submit</button>
            </div>
    </div>)
}


export default AddPictureLoadUi