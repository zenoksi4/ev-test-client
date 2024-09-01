import type { Metadata } from 'next'
import Event from './Event'

export const metadata: Metadata = {
    title: 'event',
}

export default function EventsPage() {
    return <Event />
}
