import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
      <div className="home__wrapper">
          <div className={"home__page"}>
              <h1 className={"drop__animation"} ><span>Maomi</span>, the best <span>bubble tea</span> cafe of Odesa</h1>
              <h2 className={"drop__animation"}><span>Enjoy traditional recipes</span> brought to you directly from Taiwan </h2>
              <Link className={"home__page__btn"} href={"/Feed"}>Drink!</Link>
          </div>
      </div>
  )
}
