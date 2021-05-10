import Image from "next/image";
import {useEffect, useState} from "react";
import ReactMapGl, {Marker} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'
import {reducePropsToObject} from "next/dist/build/webpack/plugins/webpack-conformance-plugin/utils/ast-utils";

export default function EventMap({evt}) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
        width: '100%',
        height: '500px'
    })

    useEffect(() => {
        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat)
                setLng(lng)
                setViewport({...viewport, latitude: lat, longitude: lng})
                setLoading(false)
            },
            (error) => {
                console.error(error);
            }
        );
    }, [])

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    if (loading) return false
    console.log(lng, lat)
    return <ReactMapGl {...viewport} mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} onViewportChange={(vp) => setViewport(vp) }>
        <Marker longitude={lng} latitude={lat} key={evt.id}>
            <Image src={evt.image} width={30} height={30}/>
        </Marker>

    </ReactMapGl>
}