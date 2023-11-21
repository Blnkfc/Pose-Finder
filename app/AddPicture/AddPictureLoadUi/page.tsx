'use client'
import {useStore} from "../../../src/store";
import {useEffect, useState} from "react";
import {IPhotoUnit, ISearchListUnit} from "../../interfaceList";


const AddPictureLoadUi =  () => {
    /*  INITIAL DATA FOR THE ADDPICTURE PAGE  */
    const initialData: IPhotoUnit = useStore((state) => state.addPictureState)

    /*  LOAD SETUP  */
    const [link, setLink] = useState(initialData.url)


    /*  SETTING VALUE FOR INPUT ACCORDING TO STATE, HAPPENS ON link CHANGE  */
    useEffect(() => {
        const loadInput: HTMLInputElement = document.querySelector('input[name=load_link]');
        if (loadInput) {
            loadInput.value = link;
        }
    }, [link]);

    /*  CHECKER THAT WILL SHOW THE TAG WHILE INPUT IS EMPTY  */
    const [expand, setExpand] = useState(true)

    /*  RETRIEVING LINK VALUE AND UPDATING THE STORE  */
    const retrieveLink = () => {
        const linkValue: string = (document.querySelector('input[name=load_link]') as HTMLInputElement).value;
        useStore.setState((state) => {
            const updatedAddPicture: IPhotoUnit = state.addPictureState;
            updatedAddPicture.url = linkValue;
            setLink(updatedAddPicture.url)
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