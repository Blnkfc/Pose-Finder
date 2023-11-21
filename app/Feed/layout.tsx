import React from 'react'


export default  function FeedLayout({ children }) {
    return(
        <div className={'feed__wrapper'}>
            <span className={"feed__content"} >{children}</span>
        </div>
    )
}