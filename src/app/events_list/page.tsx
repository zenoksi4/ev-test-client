import type { Metadata } from 'next'
import EventsList from './EventsList'
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: 'events list',
}

export default function EventsListPage() {
    return <div className={styles.wrapper}>
        <EventsList />
    </div>
}
