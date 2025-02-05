import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Zoom from "@arcgis/core/widgets/Zoom";
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle";
import "@arcgis/core/assets/esri/themes/light/main.css";

const IndonesiaMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const webMap = new WebMap({
            basemap: "streets-navigation-vector", // Peta Dasar
        });

        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [117.148, -2.5489], // Indonesia
            zoom: 5,
        });

        // 1️⃣ Tambahkan Layer Batas Provinsi Indonesia
        const provinceLayer = new FeatureLayer({
            url: "https://gis.dukcapil.kemendagri.go.id/server/rest/services/INDONESIA_BOUNDARY/MapServer/1", // Ganti dengan layer provinsi Indonesia
            outFields: ["*"], // Ambil semua atribut
            popupTemplate: {
                title: "{NAMA_PROV}",
                content: "Kode Provinsi: {KODE_PROV}"
            }
        });

        webMap.add(provinceLayer);

        // 2️⃣ Tambahkan Widget Zoom & Navigation
        const zoom = new Zoom({ view });
        const navToggle = new NavigationToggle({ view });

        view.ui.add(zoom, "top-left");
        view.ui.add(navToggle, "top-left");

        // 3️⃣ Tambahkan Event Click Supaya Provinsi Bisa Diklik
        view.on("click", async (event) => {
            const response = await view.hitTest(event);
            const feature = response.results.find((result) => result.graphic);

            if (feature) {
                const attributes = feature.graphic.attributes;
                alert(`Provinsi: ${attributes.NAMA_PROV}\nKode: ${attributes.KODE_PROV}`);
            } else {
                alert("Tidak ada provinsi yang diklik.");
            }
        });

        return () => view.destroy(); // Hapus peta saat unmount
    }, []);

    return <div ref={mapRef} className="w-full h-screen" />;
};

export default IndonesiaMap;
