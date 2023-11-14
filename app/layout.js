import './globals.css'
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer";
import {useStore} from "@/src/store";
import StoreInitializer from "@/app/StoreInitialier/storeInitializer";
import data from "@/data/state1.json"
import { Lato } from 'next/font/google'

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export const metadata = {
  title: 'Maomi',
  description: 'The best bubble tea in Ukraine',
}

  export default async function RootLayout({ children }) {

  /*  INITIALIZING DATA ON THE SERVER SIDE  */


      /*  FETCHING FROM THE SERVER IS A LIABILITY FOT THE PORTFOLIO PROJECT
      SO DATA IS IMPORTED DIRECTLY FROM JSON FILE INSTEAD  */

 /* const dataRes = await fetch("http://localhost:8080/state1.json", {cache:'no-store'})
  const data = await dataRes.json()*/


  useStore.setState({
    photoList: data.photoList,
    feedLayout: data.feedLayout,
    searchList: data.searchList,
    addPictureState: data.addPictureState,
    authorisation: data.authorisation,
    fruitMenu: data.fruitMenu
  })

    /*  INITIALIZING DATA ON THE CLIENT SIDE VIA StoreInitializer COMPONENT  */
  return (
    <html lang="en" className={lato.className}>
    <body>
    <div className="wrapper">
      <StoreInitializer
          photoList={data.photoList}
          searchList={data.searchList}
          addPictureState={data.addPictureState}
          authorisation={data.authorisation}
          feedLayout={data.feedLayout}
          fruitMenu={data.fruitMenu}
      />
      <Header  />
      <main>{children}</main>
      <Footer />
    </div>
    </body>
    </html>
  )
}
