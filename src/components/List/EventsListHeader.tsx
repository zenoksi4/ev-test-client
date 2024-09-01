'use client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from "./page.module.css";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button } from '@mui/material';
import { DateRange, DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EventType } from '@/types/event.type';

export default function EventsListHeader({ events, events_values, setEvents }: { events: EventType[], events_values: EventType[], setEvents: Dispatch<SetStateAction<EventType[]>> }) {
    const { push } = useRouter()
    const [sort_view, setSortView] = useState<boolean | null>(null);
    const [sort_time, setSortTime] = useState<boolean | null>(null);

    const [date, setDate] = useState<DateRange<Dayjs | null>>([
        null,
        null,
    ]);

    useEffect(() => {
        if (sort_time !== null) {
            if (sort_time && events_values) {
                setEvents(prev => [...prev].sort((a, b) => Number(new Date(b.time)) - Number(new Date(a.time))))
            } else {
                setEvents(prev => [...prev].sort((a, b) => Number(new Date(a.time)) - Number(new Date(b.time))))
            }
        }
    }, [sort_time])

    useEffect(() => {
        if (sort_view !== null) {
            if (sort_view && events_values) {
                setEvents(prev => [...prev].sort((p, c) => c.views - p.views))
            } else {
                setEvents(prev => [...prev].sort((p, c) => p.views - c.views))
            }
        }
    }, [sort_view])

    useEffect(() => {
        if (date && events) {
            setEvents(events.filter(e => dayjs(e.time).isAfter(date[0]) && dayjs(e.time).isBefore(date[1])))
        }
    }, [date])

    return (
        <div className={styles.wrapper}>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker className={styles.datePicker} slots={{ field: SingleInputDateRangeField }} value={date} onChange={(newValue) => setDate(newValue)} />
                </LocalizationProvider>
                <Button className={styles.headerButton} style={{ marginLeft: 5, border: 'none' }} variant="outlined" onClick={() => { setSortView(!sort_view); setSortTime(null) }}>
                    <i className="fa-solid fa-eye" style={{ marginRight: 5 }}></i>
                    {sort_view === null ? null :
                        <>{sort_view ? <i className="fa-solid fa-arrow-down"></i> :
                            <i className="fa-solid fa-arrow-up"></i>}
                        </>
                    }
                </Button>
                <Button className={styles.headerButton} style={{ marginLeft: 5, border: 'none' }} variant="outlined" onClick={() => { setSortTime(!sort_time); setSortView(null) }}>
                    <i className="fa-solid fa-clock-rotate-left" style={{ marginRight: 5 }}></i>
                    {sort_time === null ? null :
                        <>{sort_time ? <i className="fa-solid fa-arrow-down"></i> :
                            <i className="fa-solid fa-arrow-up"></i>}
                        </>
                    }
                </Button>

            </div>
            <div>
                <Button className={styles.headerButton} variant="outlined" onClick={() => { push('/event') }}>Create Event</Button>
            </div>
        </div>
    )
}