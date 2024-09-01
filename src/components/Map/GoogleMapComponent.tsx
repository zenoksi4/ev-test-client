'use client'

import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { useRef, useCallback } from "react"
import SearchComponent from "./SearchComponent";
import { MAP_KEY } from "@/config.ts";
import { CircularProgress } from "@mui/material";

type Props = {
    selectedLocation: { lat: number, lng: number },
    setSelectedLocation: React.Dispatch<React.SetStateAction<any>>,
    height?: string,
    width?: string,
    showSearch?: boolean
}

export default function GoogleMapComponent({ selectedLocation, setSelectedLocation, height = '300px', width = '100%', showSearch = true }: Props) {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: `${MAP_KEY}`,
        libraries: ["places"],
    });
    const mapRef = useRef();
    const onMapLoad = useCallback((map: any) => {
        mapRef.current = map;
    }, []);
    if (loadError) return "Error";
    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedLocation({ lat, lng });
    };
    return (
        <div>
            <div style={{ marginTop: "20px", width: '100%' }}>
                {!isLoaded ?
                    <div style={{ width: '100%', height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </div>
                    :
                    <GoogleMap
                        mapContainerStyle={{
                            height,
                            width,
                            borderRadius: '30px'
                        }}
                        center={selectedLocation}
                        zoom={13}
                        onClick={handleMapClick}
                        onLoad={onMapLoad}
                    >
                        <MarkerF
                            position={selectedLocation}
                            icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
                        />
                    </GoogleMap>
                }

            </div>
            {showSearch && <SearchComponent selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />}
        </div>
    )
}