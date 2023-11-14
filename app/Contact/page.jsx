'use client'
import styles from "./Contact.module.css"
import {useStore} from "@/src/store";

const Contact = () => {
    const contactsData = useStore((state) => state.contactsList)

    const contactsList = contactsData.map((E) => {
        return(
            <a href={E.url} ><img src={E.img} alt={E.title}/> {E.title} </a>
        )
    })


    return(
        <div className={"contacts"}>
            <div className="contacts__list">
                <h1>Contacts:</h1>
                {contactsList}
            </div>
        </div>
    )
}

export default Contact