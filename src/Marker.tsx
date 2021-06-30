import {useContext, useEffect} from 'react';
import {MarkerLayerContext} from "./MarkerLayer";

interface MarkerProps {
    coords: { lng: number, lat: number };
    id?: string;
    title?: string;
    url?: any;
}

const Marker = (props: MarkerProps) => {
    const markerLayer = useContext<any>(MarkerLayerContext)

    const { id, title, url } = props;
    const { lng, lat } = props.coords;

    const coords = window.SMap.Coords.fromWGS84(lng, lat);
    const sMarker = new window.SMap.Marker(coords, id || false, { title: title, url: url });
    markerLayer?.addMarker(sMarker);

    useEffect(() => {
        return () => {
            markerLayer.removeMarker(sMarker, true)
        };
    })

    return null;
}

Marker.defaultProps = {
    id: '',
    title: '',
    url: null,
}

export default Marker;