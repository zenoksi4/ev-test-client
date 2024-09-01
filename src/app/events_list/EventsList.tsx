'use client'

import EmptyList from "@/components/EmptyList"
import EventsListCard from "@/components/List/EventsListCard"
import EventsListHeader from "@/components/List/EventsListHeader"
import { useEvents } from "@/hooks/useEvents"
import { EventType } from "@/types/event.type"
import { CircularProgress, Grid } from "@mui/material"
import { useEffect, useState } from "react"

export default function EventsList() {
    const { events, isLoading } = useEvents()
    const [events_values, setEventsValues] = useState<EventType[]>([])

    useEffect(() => {
        setEventsValues(events || [])
    }, [events])

    return (
        <div style={{ width: '100%' }}>
            <EventsListHeader events={events} events_values={events_values} setEvents={setEventsValues}></EventsListHeader>
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