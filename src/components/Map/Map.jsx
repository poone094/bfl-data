import React from "react";
import Image from "next/image";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Carousel from "react-material-ui-carousel";
import { Noto_Sans_Thai } from "next/font/google";
import axios from "axios";
import useSWR from "swr";
import { nanoid } from "nanoid";

const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

const updatePicturesArray = (data) => {
  data.forEach((project) => {
    const picturesArray = project.picture.split(", ");
    project.picture = picturesArray;
  });
};

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    updatePicturesArray(response.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export default function Map() {
  const { data, error } = useSWR(
    "https://script.google.com/macros/s/AKfycbzIUC6H8QtrLdOK0oiXzoHvAw1HQPd-yzi5sOpAmDhwFisyxLv2MScPBHP0uJCRdaOc/exec?action=getUsers",
    fetcher
  );

  return (
    <div className={styles.container}>
      <MapContainer
        center={[13.736717, 100.523186]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.mapcontainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl>
          <LayersControl.BaseLayer checked name="แผนที่ดาวเทียม">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="แผนที่ปกติ">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {data?.map((data, index) => (
          <>
            <Marker
              position={[data.latitudeMid, data.longtitudeMid]}
              draggable={false}
              animate={true}
              key={nanoid()}
            >
              <Popup
                minWidth="300"
                maxWidth="300"
                maxHeight="auto"
                key={nanoid()}
              >
                <h3 key={index} style={notoSansThai.style}>
                  {data.projectName}
                </h3>
                <p key={nanoid()} style={notoSansThai.style}>
                  <strong>ลักษณะกำแพง : </strong>
                  {data.typeofProject}
                </p>
                <p key={nanoid()} style={notoSansThai.style}>
                  <strong>หน่วยงานที่รับผิดชอบ : </strong>
                  {data.responsibleAgency}
                </p>
                <p key={nanoid()} style={notoSansThai.style}>
                  <strong>งบประมาณ : </strong> {data.Budget.toLocaleString()}{" "}
                  บาท
                </p>
                <p key={nanoid()} style={notoSansThai.style}>
                  <strong>ระยะทาง : </strong> {data.distance.toLocaleString()}{" "}
                  เมตร
                </p>
                <Carousel key={nanoid()}>
                  {data.picture.map((picture) => (
                    <Image
                      key={nanoid()}
                      src={picture}
                      width={300}
                      height={300}
                      style={{ objectFit: "cover", borderRadius: "5%" }}
                    />
                  ))}
                </Carousel>
              </Popup>
            </Marker>
            <Polyline
              key={nanoid()}
              positions={[
                [data.latitudeHead, data.longtitudeHead],
                [data.latitudeMid, data.longtitudeMid],
                [data.latitudeTail, data.longtitudeTail],
              ]}
              pathOptions={{ color: "orange" }}
              weight={10}
            />
          </>
        ))}
      </MapContainer>
    </div>
  );
}
