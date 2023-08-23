import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
   <div>
     <h1>Pose Finder - Web page for artists to get inspiration from</h1>
     <h2>Search for pictures of positions of body-parts and use them as an inspiration for your projects!! </h2>
     <Link href={"/Feed"}>Start searching</Link>
   </div>
  )
}
