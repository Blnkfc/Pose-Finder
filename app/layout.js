import './globals.css'
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer";
import {useStore} from "@/src/store";
import StoreInitializer from "@/app/StoreInitialier/storeInitializer";
import data from "@/data/state1.json"
import { Lato } from 'next/font/google'
import axios from "axios";

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
  const axios = require('axios')
  /*  INITIALIZING DATA ON THE SERVER SIDE  */

      /*  FETCHING FROM THE SERVER IS A LIABILITY FOT THE PORTFOLIO PROJECT
      SO DATA IS IMPORTED DIRECTLY FROM JSON FILE INSTEAD  */
    async function fetchData() {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/Blnkfc/Pose-Finder/maomi-test/data/state1.json');
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async function getData() {
      return await fetchData();
    }
    const data = await getData();


  useStore.setState({
    photoList: data.photoList,
    feedLayout: data.feedLayout,
    searchList: data.searchList,
    addPictureState: data.addPictureState,
    authorisation: data.authorisation,
    fruitMenu: data.fruitMenu,
    FAQList: data.FAQList,
    contactsList: data.contactsList
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
          FAQList={data.FAQList}
          contactsList={data.contactsList}
      />
      <Header  />
      <main>{children}</main>
      <Footer />
    </div>
    </body>
    </html>
  )
}
