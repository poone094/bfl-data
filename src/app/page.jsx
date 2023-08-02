"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { Noto_Sans_Thai } from "next/font/google";
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export default function Home() {
  return (
    <div>
      <div className={styles.menu}>
        <Link href="/searchdata">
          <h2 style={notoSansThai.style}>ค้นหาข้อมูลโครงการ</h2>
        </Link>
        <Link href="/maps">
          <h2 style={notoSansThai.style}>แผนที่แสดงข้อมูลโครงการ</h2>
        </Link>
      </div>
    </div>
  );
}
