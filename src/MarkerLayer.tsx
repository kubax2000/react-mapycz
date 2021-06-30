import React, {createContext, useContext, useEffect} from 'react';
import {MapContext} from "./Map";

export const MarkerLayerContext = createContext(null)

interface MarkerLayerProps {
    children: React.ReactNode
    clustered?: boolean
}

const MarkerLayer = ({ children, clustered }: MarkerLayerProps) => {
    const map = useContext<any>(MapContext);
    const markerLayer = new window.SMap.Layer.Marker();

    if(clustered) {
        markerLayer.setClusterer(new window.SMap.Marker.Clusterer(map));
    }

    map?.addLayer(markerLayer);
    markerLayer.enable();


    useEffect(() => {
        return () => {
            map.removeLayer(markerLayer)
        };
    })

    return <MarkerLayerContext.Provider value={markerLayer}>{children}</MarkerLayerContext.Provider>;
}

MarkerLayer.defaultProps = {
    clustered: false
};

export default MarkerLayer;