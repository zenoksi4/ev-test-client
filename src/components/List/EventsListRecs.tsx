'use client'

import EmptyList from "@/components/EmptyList"
import EventsListCard from "@/components/List/EventsListCard"
import { useEvents } from "@/hooks/useEvents"
import { EventType } from "@/types/event.type"
import { CircularProgress, Grid } from "@mui/material"
import { useEffect, useState } from "react"

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3;
    const coords_lat1 = lat1 * Math.PI / 180;
    const coords_lat2 = lat2 * Math.PI / 180;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coords_lat1) * Math.cos(coords_lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function findClosestEvents(currentEvent, events) {
    return events
        .filter(event => event.id !== currentEvent.id)
        .map(event => ({
            ...event,
            distance: calculateDistance(currentEvent.lat, currentEvent.lng, event.lat, event.lng),
            timeDiff: Math.abs(Number(new Date(currentEvent.time)) - Number(new Date(event.time)))
        }))
        .sort((a, b) => a.distance - b.distance || a.timeDiff - b.timeDiff)
        .slice(0, 3);
}


export default function EventsListRecs({ current_event }: { current_event: EventType }) {
    const { events, isLoading } = useEvents()
    const [events_values, setEventsValues] = useState<EventType[]>([])

    useEffect(() => {
        if (events && current_event) setEventsValues(findClosestEvents(current_event, events))
    }, [events, current_event])

    return (
        <div style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center', borderBottom: 'solid 1px black' }}>Recomendations</h2>
            {isLoading ? <CircularProgress /> :
                <Grid container spacing={4} sx={{ paddingTop: 2 }}>
                    {
                        events_values && events_values.length > 0 ?
                            events_values.map((event) => (
                                <EventsListCard event={event} />
                            )) :
                            <EmptyList />

                    }
                </Grid>
            }
        </div>
    )
}