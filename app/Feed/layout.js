
import FeedSidebar from "@/app/Feed/FeedSidebar/FeedSidebar";

import React from 'react'
import {useStore} from "@/src/store";


export default  function FeedLayout({ children }) {

    /*{React.cloneElement(children, {searchList})}*/
    return(
        <div className={'feed__wrapper'}>
            <span className={"feed__content"} >{children}</span>
        </div>
    )
}