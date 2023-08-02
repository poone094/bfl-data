"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Noto_Sans_Thai } from "next/font/google";
import { FaX } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(true);
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <h2>Beach For Life</h2>
          </Link>
        </div>
        <div className={styles.menu}>
          <Link href="/searchdata">
            <h4 className={styles.list} style={notoSansThai.style}>
              ค้นหาข้อมูลโครงการกำแพงกันคลื่น
            </h4>
          </Link>
          <Link href="/maps">
            <h4 className={styles.list} style={notoSansThai.style}>
              แผนที่สถานการณ์ชายฝั่ง
            </h4>
          </Link>
        </div>
        <button
          className={styles.menuicon}
          onClick={() => setToggleNav(!toggleNav)}
        >
          {toggleNav ? <FaBars /> : <FaX />}
        </button>
      </nav>
      <div
        className={`${toggleNav ? styles.menumobilehide : styles.menumobile}`}
      >
        <Link href="/searchdata">
          <h4 className={styles.list} style={notoSansThai.style}>
            ค้นหาข้อมูลโครงการกำแพงกันคลื่น
          </h4>
        </Link>
        <Link href="/maps">
          <h4 className={styles.list} style={notoSansThai.style}>
            แผนที่สถานการณ์ชายฝั่ง
          </h4>
        </Link>
      </div>
    </div>
  );
}
