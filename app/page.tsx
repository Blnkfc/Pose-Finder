import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
   <div className={"home__page"}>
     <h1><span>Pose Finder</span> - Web page for <span>artists</span> to get inspiration from</h1>
     <h2><span>Search for pictures</span> of positions of body-parts and use them as an inspiration for your projects!! </h2>
     <Link className={"home__page__btn"} href={"/Feed"}>Search</Link>
   </div>
  )
}
