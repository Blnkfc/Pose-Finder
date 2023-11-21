import styles from "./Contact.module.css"

const Contact = () => {

    return(
        <div className={"contacts"}>
            <h1>Contacts:</h1>
            <div className="contacts__list">
                <a href={"https://github.com/Blnkfc"} ><img src="/assets/contacts-github.png" alt="github"/> Github </a>
                <a href={"https://www.linkedin.com/in/pavlo-zabuha-736aaa295/"} ><img src="/assets/contacts-linkedin.png" alt="steam"/> Linked In </a>
                <a href={"https://www.upwork.com/freelancers/~01a77a9a61c9dbba8f"} ><img src="/assets/contacts-upwork.png" alt="steam"/> Upwork </a>
                <a href={"https://t.me/aQatical"} ><img src="/assets/contacts-telegram.png" alt="telegram"/> Telegram </a>
                <a href={"https://www.instagram.com/pavuchara.jpg/"} ><img src="/assets/contacts-instagram.png" alt="instagram"/> Instagram </a>
                <a href={"https://steamcommunity.com/id/qn1t/"} ><img src="/assets/contacts-steam.png" alt="steam"/> Steam </a>
            </div>
        </div>
    )
}

export default Contact