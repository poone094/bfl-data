"use client";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

export default function Maps() {
  const MapWithNoSSR = dynamic(() => import("@/components/Map/Map"), {
    ssr: false,
  });

  return (
    <div className={styles.mapcontainer}>
      <MapWithNoSSR />
    </div>
  );
}
