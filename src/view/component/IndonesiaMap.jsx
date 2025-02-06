import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import "@arcgis/core/assets/esri/themes/light/main.css";

const IndonesiaMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const webMap = new WebMap({
            basemap: "streets-navigation-vector",
        });

        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [117.148, -2.5489],
            zoom: 5,
        });

        // Layer untuk provinsi Indonesia
        const provinceLayer = new FeatureLayer({
            url: "https://gis.dukcapil.kemendagri.go.id/server/rest/services/INDONESIA_BOUNDARY/MapServer/1",
            outFields: ["*"],
            popupTemplate: {
                title: "{NAMA_PROV}",
                content: "Kode Provinsi: {KODE_PROV}",
            },
            renderer: new SimpleRenderer({
                symbol: new SimpleFillSymbol({
                    color: [255, 0, 0, 0.1],
                    outline: {
                        color: [255, 0, 0],
                        width: 1,
                    },
                })
            })
        });

        const countryLayer = new FeatureLayer({
            url: "URL_LAYER_DARATAN_LAINNYA", 
            outFields: ["*"],
            renderer: new SimpleRenderer({
                symbol: new SimpleFillSymbol({
                    color: [200, 200, 200, 0.5],
                    outline: {
                        color: [100, 100, 100], 
                        width: 0.5,
                    },
                })
            })
        });

        webMap.add(provinceLayer);
        webMap.add(countryLayer);

        const navToggle = new NavigationToggle({ view });
        view.ui.add(navToggle, "top-left");

        view.on("click", async (event) => {
            try {
                const hitTestResponse = await view.hitTest(event);

                if (hitTestResponse.results.length > 0) {
                    const graphic = hitTestResponse.results.find(result => result.graphic.layer === provinceLayer)?.graphic;

                    if (graphic) {
                        const attributes = graphic.attributes;
                        if (attributes && attributes.NAMA_PROV && attributes.KODE_PROV) {
                            alert(`Provinsi: ${attributes.NAMA_PROV}\nKode: ${attributes.KODE_PROV}`);
                        } else {
                            alert("Data provinsi tidak lengkap.");
                        }
                    } else {
                        alert("Tidak ada provinsi yang diklik.");
                    }
                } else {
                    alert("Tidak ada provinsi yang diklik.");
                }
            } catch (error) {
                console.error("Error during hit test:", error);
                alert("Terjadi kesalahan saat mengambil data provinsi.");
            }
        });

        return () => view.destroy();
    }, []);

    return <div ref={mapRef} className="w-full h-full" />;
};

export default IndonesiaMap;
