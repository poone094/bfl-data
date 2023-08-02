"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Noto_Sans_Thai } from "next/font/google";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export default function SearchData() {
  const [data, setData] = useState([]);
  const [yearSelected, setYearSelected] = useState("2550");
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);

  async function fetchData() {
    const year = yearSelected;
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbwgH5ELR8BAtP45RZqxx7Wguh6RkzKHorQLLwkXJuNSKC-mAO2b-GrFSOVrj9fvAwTY/exec?action=getUsers&sheet=data${year}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function getData(yearSelected) {
      const result = await fetchData(yearSelected);
      setData(result);
    }
    getData();
  }, [yearSelected]);

  const handleChange = (e) => {
    setYearSelected(e.target.value);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredResults = data.filter((item) =>
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 style={notoSansThai.style} className={styles.header}>
          ค้นหาข้อมูลโครงการกำแพงกันคลื่น
        </h1>
        <label style={notoSansThai.style} className={styles.yearLabel}>
          เลือกปี:
          <select
            className={styles.selectyear}
            style={notoSansThai.style}
            value={yearSelected}
            onChange={handleChange}
          >
            <option value="2550">2550</option>
            <option value="2551">2551</option>
            <option value="2552">2552</option>
            <option value="2553">2553</option>
            <option value="2554">2554</option>
            <option value="2555">2555</option>
            <option value="2556">2556</option>
            <option value="2557">2557</option>
            <option value="2558">2558</option>
            <option value="2559">2559</option>
            <option value="2560">2560</option>
            <option value="2561">2561</option>
            <option value="2562">2562</option>
            <option value="2563">2563</option>
            <option value="2564">2564</option>
            <option value="2565">2565</option>
            <option value="2566">2566</option>
          </select>
        </label>
        <div className={styles.containersearhdatabox}>
          <AiOutlineSearch className={styles.searchicon} />
          <input
            style={notoSansThai.style}
            className={styles.searchdatabox}
            type="text"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={styles.tablecontainer}>
        <table style={notoSansThai.style} className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ปี</th>
              <th className={styles.th}>ชื่อโครงการ</th>
              <th className={styles.th}>พื้นที่</th>
              <th className={styles.th}>จังหวัด</th>
              <th className={styles.th}>ระยะโครงการ</th>
              <th className={styles.th}>ความยาว</th>
              <th className={styles.th}>งบประมาณทั้งสิ้น</th>
              <th className={styles.th}>ปีตั้งงบประมาณ</th>
              <th className={styles.th}>หน่วยงานที่รับผิดชอบ</th>
              <th className={styles.th}>เล่มที่</th>
              <th className={styles.th}>หน้า</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm
              ? searchResults.map((datas, index) => (
                  <tr>
                    <td className={styles.td} key={datas}>
                      {datas.year}
                    </td>
                    <td className={styles.td}>{datas.projectName}</td>
                    <td className={styles.td}>{datas.location}</td>
                    <td className={styles.td}>{datas.province}</td>
                    <td className={styles.td}>{datas.phaseOfProject}</td>
                    <td className={styles.td}>
                      {datas.distance.toLocaleString()} เมตร
                    </td>
                    <td className={styles.td}>
                      {datas.budget.toLocaleString()} บาท
                    </td>
                    <td className={styles.td}>{datas.yearBudget}</td>
                    <td className={styles.td}>{datas.responsibleAgency}</td>
                    <td className={styles.td}>{datas.bookNo}</td>
                    <td className={styles.td}>{datas.paperNo}</td>
                  </tr>
                ))
              : data?.map((datas, index) => (
                  <tr>
                    <td className={styles.td}>{datas.year}</td>
                    <td className={styles.td}>{datas.projectName}</td>
                    <td className={styles.td}>{datas.location}</td>
                    <td className={styles.td}>{datas.province}</td>
                    <td className={styles.td}>{datas.phaseOfProject}</td>
                    <td className={styles.td}>
                      {datas.distance.toLocaleString()} เมตร
                    </td>
                    <td className={styles.td}>
                      {datas.budget.toLocaleString()} บาท
                    </td>
                    <td className={styles.td}>{datas.yearBudget}</td>
                    <td className={styles.td}>{datas.responsibleAgency}</td>
                    <td className={styles.td}>{datas.bookNo}</td>
                    <td className={styles.td}>{datas.paperNo}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
