'use client';
import styles from "./adminAuth.css"
import Link from "next/link";
import {useStore} from "@/src/store";
import React, {useEffect, useState} from "react";

const AdminAuth = () => {
    const inputData = useStore((state) => state.authorisation)

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [checkSuccess, setCheckSuccess] = useState(false);
    const [generatedLink, setGeneratedLink] = useState("")


    useEffect(() => {
            if (JSON.stringify(loginValue) === JSON.stringify(inputData.log ) && JSON.stringify(passwordValue) === JSON.stringify(inputData.pass)) {
                setCheckSuccess(true);

            } else {
                setCheckSuccess(false);

            }
    }, [loginValue, passwordValue] )


    useEffect(() => {
        let crypto = require("crypto")
        setGeneratedLink(crypto.randomBytes(40).toString('hex'));
    }, [])
    useEffect(()=>{
        useStore.setState((state) => {
            const updatedState = state.authorisation
            updatedState.path = generatedLink;
            return{authorisation: updatedState}
        })
    }, [generatedLink])

    return(
        <div className={"adminAuth"} >
            <input
                type="text"
                placeholder={"login"}
                className="adminAuth__login"
                onChange={(e) => setLoginValue(e.target.value)}
            />
            <input
                type="password"
                placeholder={"password"}
                className="adminAuth__password"
                onChange={(e) => setPasswordValue(e.target.value)}
            />
            <Link
                href={checkSuccess?`/${generatedLink}`:''}
                className={"adminAuth__submit adminAuth__btn"}
                style={{backgroundColor: checkSuccess?"#066d42":"#ff2e70"}}  >
                Sign in
            </Link>
        </div>
    )
}


export default AdminAuth;