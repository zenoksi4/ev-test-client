'use client'

import { MAP_KEY } from "@/config.ts";
import React, { useEffect, useRef, useState } from "react";

let autoComplete: google.maps.places.Autocomplete;

const loadScript = (url: string, callback: any) => {
    let script: any = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchComponent = ({ selectedLocation, setSelectedLocation }: any) => {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
        getAddressFromCoordinates()
    }, [selectedLocation])

    const getAddressFromCoordinates = async () => {
        if (!selectedLocation) return
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=${MAP_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            const address = data.results[0].formatted_address;
            if (address) setQuery(address)

        }
    }
    const handleScriptLoad = (updateQuery: any, autoCompleteRef: any) => {
        const t = window.google.maps
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {
                types: ["(cities)"],
                componentRestrictions: { country: "UKR" },
            }
        );
        autoComplete.addListener("place_changed", () => {
            handlePlaceSelect(updateQuery);
        });
    };

    const handlePlaceSelect = async (updateQuery: any) => {
        const addressObject = await autoComplete.getPlace();

        const query = addressObject.formatted_address;
        updateQuery(query);

        const latLng = {
            lat: addressObject?.geometry?.location?.lat(),
            lng: addressObject?.geometry?.location?.lng(),
        };

        setSelectedLocation(latLng);
    };

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);

    return (
        <div className="search-location-input" style={{ marginTop: 5 }}>
            <input
                style={{ width: '400px', padding: '8px', border: '1px black solid', borderRadius: 8 }}
                ref={autoCompleteRef}
                className="form-control"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                value={query}
            />
        </div>
    );
};

export default SearchComponent;

