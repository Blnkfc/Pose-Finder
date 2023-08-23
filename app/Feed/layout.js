import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";
import {useState} from "react";


export default function FeedLayout({ children }) {
    const initialSearchList = [
        {Male: false},
        {Female: false},
        {Hand: false},
        {Legs: false},
        {Heads: false},
        {Waist: false}
    ]
    const [searchList, setSearchList] = useState(initialSearchList)
    const retrieveSearchList = (list) => {
        const initialSearchListCopy = [...initialSearchList]

    }


    return(
        <div className={'feed__wrapper'}>
            <span className={"feed__content"}>{children}</span>
            <FeedSidebar className={"feed__sidebar"} retrieveSearchList={retrieveSearchList} />
        </div>
    )
}