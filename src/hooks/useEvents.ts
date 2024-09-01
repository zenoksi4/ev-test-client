import { useQuery } from '@tanstack/react-query'

import { eventService } from '@/services/event.service'

export function useEvents() {
    const { data, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['event'],
        queryFn: () => eventService.getEvents()
    })

    return { events: data?.data, isLoading, isSuccess }
}
