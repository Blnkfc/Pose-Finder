import './globals.css'
import { Lato } from 'next/font/google'
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer";
import {useStore} from "@/src/store";
import StoreInitializer from "@/app/StoreInitialier/storeInitializer";
import data from "@/data/state1.json"

const inter = Lato({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: 'Pose Finder',
  description: 'Generated by create next app',
}

  export default async function RootLayout({ children }) {

  /*  INITIALIZING DATA ON THE SERVER SIDE  */


      /*  FETCHING FROM THE SERVER IS A LIABILITY FOT THE PORTFOLIO PROJECT
      SO DATA IS IMPORTED DIRECTLY FROM JSON FILE INSTEAD  */

 /* const dataRes = await fetch("http://localhost:8080/state1.json", {cache:'no-store'})
  const data = await dataRes.json()*/


  useStore.setState({
    photoList: data.photoList,
    searchList: data.searchList,
    addPictureState: data.addPictureState,
    authorisation: data.authorisation
  })

    /*  INITIALIZING DATA ON THE CLIENT SIDE VIA StoreInitializer COMPONENT  */
  return (
    <html lang="en">
    <body>
    <div className="wrapper">
      <StoreInitializer
          photoList={data.photoList}
          searchList={data.searchList}
          addPictureState={data.addPictureState}
          authorisation={data.authorisation}/>
      <Header  />
      <main>{children}</main>
      <Footer />
    </div>
    </body>
    </html>
  )
}
