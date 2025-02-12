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
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

const IndonesiaMap = ({ 
    kodeProvinsi, 
    onProvinceClick, 
    clickable = true, 
    hoverable = true,
    earthquakeData = [],
}) => {
    const mapRef = useRef(null);
    const [mapView, setMapView] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [hoveredProvince, setHoveredProvince] = useState(null)

    let provinsiData = provinsiJson.data


    useEffect(() => {
        // console.log("ini dari indonesia map", earthquakeData);
        const webMap = new WebMap({ basemap: "streets-navigation-vector" });
        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [117.148, -2.5489],
            zoom: 5,
        });
    
        view.when(() => {
            // console.log("MapView siap!");
            setMapView(view);
    
            const provinceLayer = new GraphicsLayer();
            const earthquakeLayer = new GraphicsLayer();
    
            webMap.addMany([provinceLayer, earthquakeLayer]);
    
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
    
            provinsiData.features.forEach((feature) => {
                if (!feature.geometry) return;
    
                const polygons = extractCoordinates(feature.geometry);
                if (polygons.length === 0) return;
    
                polygons.forEach((rings) => {
                    const polygon = {
                        type: "polygon",
                        rings: rings.map((coord) => [coord[0], coord[1]]),
                    };
    
                    const defaultSymbol = new SimpleFillSymbol({
                        color: [0, 0, 255, 0.2],
                        outline: { color: [0, 0, 150], width: 1 },
                    });
    
                    const graphic = new Graphic({
                        geometry: polygon,
                        symbol: defaultSymbol,
                        attributes: feature.properties,
                    });
    
                    provinceLayer.add(graphic);
                });
            });
    
            if (earthquakeData && Array.isArray(earthquakeData) && earthquakeData.length > 0) {
                earthquakeData.forEach((data) => {
                    const coordinates = data.Coordinates.split(",").map(Number);
    
                    if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
                        const [lat, lon] = coordinates;
    
                        const earthquakePoint = {
                            type: "point",
                            longitude: lon,
                            latitude: lat,
                        };
    
                        const outerEarthquakeSymbol = new SimpleMarkerSymbol({
                            color: [255, 0, 0, 0.3],
                            outline: { color: [255, 0, 0, 1], width: 1 },
                            size: "25px",
                        });
    
                        const innerEarthquakeSymbol = new SimpleMarkerSymbol({
                            color: [255, 0, 0, 1],
                            outline: { color: [255, 255, 255, 0], width: 0 },
                            size: "6px",
                        });
    
                        earthquakeLayer.add(new Graphic({ geometry: earthquakePoint, symbol: outerEarthquakeSymbol }));
                        earthquakeLayer.add(new Graphic({ geometry: earthquakePoint, symbol: innerEarthquakeSymbol }));
                    } else {
                        console.error("Format koordinat tidak valid:", data.Coordinates);
                    }
                });
            }
    
            const navToggle = new NavigationToggle({ view });
            view.ui.add(navToggle, "top-left");

            view.on("pointer-move", async (event) => {
                if (!hoverable) return;
            
                try {
                    const hitTestResponse = await view.hitTest(event);
                    const hoveredGraphic = hitTestResponse.results.find(
                        (result) => result.graphic.layer === provinceLayer
                    )?.graphic;
            
                    if (hoveredGraphic) {
                        setHoveredProvince(hoveredGraphic.attributes.KODE_PROV);
                    } else {
                        setHoveredProvince(null);
                    }
                } catch (error) {
                    console.error("Error saat hover peta:", error);
                }
            });
            
            view.on("click", async (event) => {
                try {
                    const hitTestResponse = await view.hitTest(event);
                    
                    // Cek apakah klik mengenai titik gempa
                    const clickedEarthquake = hitTestResponse.results.find(
                        (result) => result.graphic.layer === earthquakeLayer
                    )?.graphic;
            
                    if (clickedEarthquake) {
                        // console.log("Gempa diklik:", clickedEarthquake.attributes);
                        // Panggil fungsi lain jika diperlukan
                    }
            
                    // Cek apakah klik mengenai provinsi
                    if (clickable) {
                        const clickedGraphic = hitTestResponse.results.find(
                            (result) => result.graphic.layer === provinceLayer
                        )?.graphic;
            
                        if (clickedGraphic) {
                            const { PROVINSI, KODE_PROV } = clickedGraphic.attributes;
                            setSelectedProvince(KODE_PROV);
                            onProvinceClick(PROVINSI, KODE_PROV);
                            // console.log(PROVINSI, KODE_PROV);
                        }
                    }
                } catch (error) {
                    console.error("Error saat klik peta:", error);
                }
            });            
        });
    
        return () => view.destroy();
    }, [clickable, hoverable, earthquakeData]);    
    

    // **Efek perubahan warna ketika provinsi dipilih**
    useEffect(() => {
        if (!mapView) return;

        mapView.when(() => {
            if (!mapView.map || !mapView.map.layers) {
                console.error("Error: mapView atau layers belum siap!");
                return;
            }

            const graphicsLayer = mapView.map.allLayers.find(layer => layer instanceof GraphicsLayer);

            if (!graphicsLayer) {
                console.error("Error: Tidak ada GraphicsLayer ditemukan!");
                return;
            }

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
        });
    }, [selectedProvince, hoveredProvince, mapView]);

    return <div ref={mapRef} className="w-full h-full" />;
};

export default IndonesiaMap;
