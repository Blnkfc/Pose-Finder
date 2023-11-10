'use client';
import Link from "next/link";
import {useStore} from "@/src/store";
import {useEffect, useState} from "react";

const adminAuth = () => {
    const inputData = useStore((state) => state.authorisation)

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [checkSuccess, setCheckSuccess] = useState(false);
    const [generatedLink, setGeneratedLink] = useState("")
    useEffect(() => {
            if (JSON.stringify(loginValue) === JSON.stringify(inputData.log ) && JSON.stringify(passwordValue) === JSON.stringify(inputData.pass)) {
                setCheckSuccess(true);
                console.log("success")
            } else {
                setCheckSuccess(false);
                console.log(loginValue)
                console.log(passwordValue)
                console.log(inputData)
                console.log("error")
            }
    }, [loginValue, passwordValue] )
    useEffect(() => {
        let crypto = require("crypto")
        setGeneratedLink(crypto.randomBytes(40).toString('hex'));
    }, [])

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
                href={"/adminAuth"}
                className={"adminAuth__error adminAuth__btn"}
                style={{display: checkSuccess?"none":"block"}}  >
                Sign in
            </Link>
            <Link
                href={`/${generatedLink}`}
                className={"adminAuth__submit adminAuth__btn"}
                style={{display: checkSuccess?"block":"none"}}  >
                Sign in
            </Link>
        </div>
    )
}


export default adminAuth;