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
    selectedProvinceCode,
    isProvinceClicked,
    clickable = true, 
    hoverable = true,
    earthquakeData = [],
    onEarthquakePointClicked,
}) => {
    const mapRef = useRef(null);
    const [mapView, setMapView] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(selectedProvinceCode || '');
    const [hoveredProvince, setHoveredProvince] = useState('')

    let provinsiData = provinsiJson.data

    useEffect(() => {
        if (!isProvinceClicked) {
            setSelectedProvince(null);
        }
    }, [isProvinceClicked]);

    // console.log("ini earthquakedata", earthquakeData)

    useEffect(() => {
        // console.log("ini dari indonesia map", earthquakeData);
        const webMap = new WebMap({ basemap: "streets-navigation-vector" });
        const view = new MapView({
            container: mapRef.current,
            map: webMap,
            center: [117.148, -2.5489],
            zoom: 4,
            constraints: {
                minZoom: 2,
                rotationEnabled: false, 
                wrapAround180: true 
            }
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
                document.getElementById("legend-container").classList.remove("hidden"); 
                earthquakeData.forEach((data) => {
                    const coordinates = data.Coordinates.split(",").map(Number);
    
                    if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
                        const [lat, lon] = coordinates;
                        const depth = parseFloat(data.Kedalaman.replace(" km", ""))
                        let color;
                        let textColor;
                        let outlineColor;

                        if(depth <= 50){
                            color = [255, 0, 0, 1];
                            textColor = [255, 0, 0, 1];
                            outlineColor = [255, 0, 0, 0.3];
                        } else if(depth <= 100){
                            color = [255, 165, 0, 1];
                            textColor = [255, 165, 0, 1];
                            outlineColor = [255, 165, 0, 0.3];
                        } else if(depth <= 250){
                            color =  [255, 255, 0, 1];
                            textColor =  [255, 255, 0, 1];
                            outlineColor = [255, 255, 0, 0.3];
                        } else if(depth <= 600){
                            color = [0, 128, 0, 1];
                            textColor = [0, 128, 0, 1];
                            outlineColor = [0, 128, 0, 0.3];
                        } else {
                            color = [0, 0, 255, 1];
                            textColor = [0, 0, 255, 1];
                            outlineColor = [0, 0, 255, 0.3];
                        } 

                        console.log(depth)
                        console.log("color: ", color)
                        console.log("textColor: ", textColor)
    
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
                            color: color,
                            outline: { color: outlineColor, width: 8 },
                            size: "8px",
                        });
    
                        // earthquakeLayer.add(new Graphic({ geometry: earthquakePoint, symbol: outerEarthquakeSymbol, attributes: { Id: data.Id } }));
                        earthquakeLayer.add(new Graphic({ geometry: earthquakePoint, symbol: innerEarthquakeSymbol, attributes: { Id: data.Id }  }));

                        const textSymbol = {
                            type: "text",
                            color: textColor,
                            text: data.Magnitude,
                            font: { size: 12, weight: "normal" },
                            horizontalAlignment: "center",
                            verticalAlignment: "bottom",
                        }

                        const textGraphic = new Graphic ({
                            geometry: earthquakePoint,
                            symbol: textSymbol,
                            attributes: {Id: data.Id}
                        })

                        textGraphic.geometry = {
                            type: "point",
                            longitude: lon,
                            latitude: lat + 0.08
                        }

                        earthquakeLayer.add(textGraphic)

                        
                    } else {
                        console.error("Format koordinat tidak valid:", data.Coordinates);
                    }
                });
            }
    
            const navToggle = new NavigationToggle({ view });
            view.ui.add(navToggle, "top-left");

            let lastHoveredProvince = null
            let lastHoverEventTime = 0

            view.on("pointer-move", async (event) => {
                if (!hoverable) return;

                const now = performance.now()
                if(now - lastHoverEventTime < 50) return
                lastHoverEventTime = now
            
                requestAnimationFrame(async() => {
                    try {
                        const hitTestResponse = await view.hitTest(event);
                        const hoveredGraphic = hitTestResponse.results.find(
                            (result) => result.graphic.layer === provinceLayer
                        )?.graphic;
                
                        if (hoveredGraphic) {
                            const kodeProv = hoveredGraphic.attributes.KODE_PROV
                            if(lastHoveredProvince !== kodeProv){
                                lastHoveredProvince = kodeProv
                                setHoveredProvince(kodeProv);   
                            }
                        } else {
                            if(lastHoveredProvince !== null){
                                lastHoveredProvince = null
                                setHoveredProvince(null);   
                            }
                        }
                    } catch (error) {
                        console.error("Error saat hover peta:", error);
                    }
                })
            });
            
            view.on("click", async (event) => {
                try {
                    const hitTestResponse = await view.hitTest(event);
                    
                    // Cek apakah klik mengenai titik gempa
                    const clickedEarthquake = hitTestResponse.results.find(
                        (result) => result.graphic.layer === earthquakeLayer
                    )?.graphic;
            
                    if (clickedEarthquake) {
                        console.log("Gempa diklik:", clickedEarthquake.attributes.Id);
                        onEarthquakePointClicked(clickedEarthquake.attributes.Id)
                    }
            
                    // Cek apakah klik mengenai provinsi
                    if (clickable) {
                        const clickedGraphic = hitTestResponse.results.find(
                            (result) => result.graphic.layer === provinceLayer
                        )?.graphic;
            
                        if (clickedGraphic) {
                            const { PROVINSI, KODE_PROV } = clickedGraphic.attributes;
                            setSelectedProvince((prev) => (prev === KODE_PROV ? null : KODE_PROV));
                            onProvinceClick(PROVINSI, KODE_PROV);
                        }                        
                    }
                } catch (error) {
                    console.error("Error saat klik peta:", error);
                }
            });            
        });
    
        return () => view.destroy();
    }, [clickable, hoverable, earthquakeData, isProvinceClicked]);    
    

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
