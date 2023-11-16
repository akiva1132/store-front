import { useEffect, useRef } from "react";
import { Feature, Map, View } from "ol/index.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Point } from "ol/geom.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import Box from "@mui/material/Box";

export default function MapView() {
  const mapRef = useRef(null);

  const view = new View({
    center: [3885757.8078164016, 3709722.0232160967],
    zoom: 8,
  });
  const points = [
    [3885757.8078164016, 3709722.0232160967],
    [3909478.6673717117, 3805423.3779974864],
    [3869398.6029376243, 3635287.6222960353],
    [3920971.455451524, 3719749.0442964765],
    [3883346.4092332395, 3552730.6326858415],
    [3926477.542699639, 3841800.948355723],
    [3879675.6960701123, 3775727.7263440946],
  ];
  const arr: Feature<Point>[] = [];

  useEffect(() => {
    const map = new Map({
      target: mapRef.current || "",
      layers: [new TileLayer({ source: new OSM() })],
      view: view,
      overlays: [],
    });

    points.map((point) => {
      const iconFeature = new Feature({ geometry: new Point(point) });
      arr.push(iconFeature);
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: arr,
      }),
    });

    map.addLayer(vectorLayer);

    return () => map.setTarget("");
  }, []);

  return (
   <Box sx={{widows:"100%",display:"flex", justifyContent:"center"}}>
      <Box sx={{ width:300, height:300}} ref={mapRef}></Box>
      </Box>
  );
}
