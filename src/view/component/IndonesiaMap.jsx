import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle";
import "@arcgis/core/assets/esri/themes/light/main.css";
// import { provinsiData } from "../../data/38provinsi";
import provinsiJson from '../../data/38provinsi.json'

const IndonesiaMap = ({ kodeProvinsi, onProvinceClick, clickable = true, hoverable = true }) => {
    const mapRef = useRef(null);
    const [mapView, setMapView] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [hoveredProvince, setHoveredProvince] = useState(null)

    let provinsiData = provinsiJson.data


    useEffect(() => {
        const webMap = new WebMap({ basemap: "streets-navigation-vector" });
        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [117.148, -2.5489],
            zoom: 5,
        });

        setMapView(view);

        const graphicsLayer = new GraphicsLayer();
        webMap.add(graphicsLayer);

        if (!provinsiData.features) {
            console.error("Error: Tidak ada fitur dalam provinsiData!");
            return;
        }

        const extractCoordinates = (geometry) => {
            if (!geometry || !geometry.type) {
                return [];
            }
            if (geometry.type === "Polygon") {
                return [geometry.coordinates[0]];
            } else if (geometry.type === "MultiPolygon") {
                return geometry.coordinates.map((polygon) => polygon[0]);
            }
            return [];
        };

        provinsiData.features.forEach((feature, index) => {
            if (!feature.geometry) return;

            const polygons = extractCoordinates(feature.geometry);
            if (polygons.length === 0) return;

            polygons.forEach((rings) => {
                const polygon = {
                    type: "polygon",
                    rings: rings.map((coord) => [coord[0], coord[1]]),
                };

                // Warna default
                const defaultSymbol = new SimpleFillSymbol({
                    color: [0, 0, 255, 0.2],
                    outline: { color: [0, 0, 150], width: 1 },
                });

                const graphic = new Graphic({
                    geometry: polygon,
                    symbol: defaultSymbol,
                    attributes: feature.properties,
                });

                graphicsLayer.add(graphic);
            });
        });

        const navToggle = new NavigationToggle({ view });
        view.ui.add(navToggle, "top-left");

        view.on("click", async (event) => {
            if (!clickable) return
            try {
                const hitTestResponse = await view.hitTest(event);
                if (hitTestResponse.results.length > 0) {
                    const clickedGraphic = hitTestResponse.results.find(
                        (result) => result.graphic.layer === graphicsLayer
                    )?.graphic;

                    if (clickedGraphic) {
                        const { PROVINSI, KODE_PROV } = clickedGraphic.attributes;
                        setSelectedProvince(KODE_PROV); // Simpan kode provinsi yang diklik
                        onProvinceClick(PROVINSI, KODE_PROV);
                        console.log(PROVINSI, KODE_PROV)
                    }
                }
            } catch (error) {
                console.error("Error saat klik peta:", error);
            }
        });

        view.on("pointer-move", async (event) => {
            if (!hoverable) return;
            try {
                const hitTestResponse = await view.hitTest(event);
                const hoveredGraphic = hitTestResponse.results.find(
                    (result) => result.graphic.layer === graphicsLayer
                )?.graphic;

                if (hoveredGraphic) {
                    const { KODE_PROV } = hoveredGraphic.attributes;
                    setHoveredProvince(KODE_PROV); // Set provinsi yang sedang di-hover
                } else {
                    setHoveredProvince(null); // Reset hover jika kursor keluar dari provinsi
                }
            } catch (error) {
                console.error("Error saat hover peta:", error);
            }
        });

        return () => view.destroy();
    }, [clickable, hoverable]);

    // **Efek perubahan warna ketika provinsi dipilih**
    useEffect(() => {
        if (!mapView) return;

        const graphicsLayer = mapView.map.layers.items.find(layer => layer instanceof GraphicsLayer);
        if (!graphicsLayer) return;

        graphicsLayer.graphics.forEach((graphic) => {
            if (graphic.attributes?.KODE_PROV === selectedProvince) {
                graphic.symbol = new SimpleFillSymbol({
                    color: [0, 0, 255, 0.5],
                    outline: { color: [0, 0, 150], width: 1 },
                });
            } else if (graphic.attributes?.KODE_PROV === hoveredProvince) {
                graphic.symbol = new SimpleFillSymbol({
                    color: [0, 0, 255, 0.2],
                    outline: { color: [0, 0, 150], width: 1 },
                });
            } else {
                graphic.symbol = new SimpleFillSymbol({
                    color: [0, 0, 255, 0],
                    outline: { color: [0, 0, 150], width: 0.2 },
                });
            }
        });
    }, [selectedProvince, hoveredProvince, mapView]);

    return <div ref={mapRef} className="w-full h-full" />;
};

export default IndonesiaMap;
