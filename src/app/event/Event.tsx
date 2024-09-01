'use client'
import { useParams, useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./page.module.css";
import { EventFormType } from "@/types/event.type";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/event.service";
import { toast } from "react-toastify";
import { Box, Button, CircularProgress, Input } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GoogleMapComponent from "@/components/Map/GoogleMapComponent";
import Swal from "sweetalert2"
import EventsListRecs from "@/components/List/EventsListRecs";

export default function Event() {
    const { id } = useParams<{ id: string }>()
    const { push } = useRouter()
    const [date, setDate] = useState<Dayjs | null>(null);

    const [selectedLocation, setSelectedLocation] = useState({
        lat: 50.082073,
        lng: 25.146524,
    });

    const { register, handleSubmit, reset, formState } = useForm<EventFormType>({ mode: 'onChange' })

    const { data } = useQuery({
        queryKey: ['get event'],
        queryFn: () => eventService.getEvent(id, true),
        enabled: !!id
    })

    const { mutate: create } = useMutation({
        mutationKey: ['create event'],
        mutationFn: (data: EventFormType) => eventService.createEvent(data),
        onError(error) {
            toast.error(error?.message || 'Error!')
        },
        onSuccess({ data }) {
            toast.success('Event created!')
            push(`/event/${data?.id}`)
        }
    })

    const { mutate: update } = useMutation({
        mutationKey: ['update event',],
        mutationFn: ({ id, data }: { id: string, data: EventFormType }) =>
            eventService.updateEvent(id, data),
        onError(error) {
            toast.error(error?.message || 'Error!')
        },
        onSuccess() { toast.success('Event updated!') }
    })

    const { mutate: deleteEvent } = useMutation({
        mutationKey: ['delete event'],
        mutationFn: (id: string) =>
            eventService.deleteEvent(id),
        onError(error) {
            toast.error(error?.message || 'Error!')
        },
        onSuccess({ data }) {
            toast.success('Event deleted!')
            push('/events_list')
        }
    })

    const onDelete = () => {
        if (!id) return
        Swal.fire({
            title: 'Are you sure?',
            text: "The deleted event will not be restored!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        })
            .then((result) => result.isConfirmed ? deleteEvent(id) : null)
    }

    useEffect(() => {
        if (id && data?.data) {
            reset({ name: data.data.name, description: data.data.description, })
            setDate(dayjs(data.data.time))
            setSelectedLocation({ lat: data.data.lat, lng: data.data.lng })
        }
    }, [data])

    const onSubmit: SubmitHandler<EventFormType & any> = data => {
        if (!date) return
        if (id) {
            update({
                id, data: {
                    ...data,
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                    time: date?.toISOString()
                }
            })
        } else {
            create({
                ...data,
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
                time: date?.toISOString()
            })
        }

    }

    if (id && !data) return <CircularProgress />
    return (
        <div className={styles.wrapper}>
            <div>
                <Button className={styles.backButton} variant="outlined" onClick={() => { push('/events_list') }}>
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: 3 }}></i>
                    Back
                </Button>
                <div className={styles.eventForm}>
                    <div className={styles.formFields}>
                        <Input
                            placeholder="Name"
                            sx={{ marginTop: 5 }}
                            {...register('name', {
                                required: 'Name is required!'
                            })}
                            fullWidth
                        ></Input>
                        <Input
                            placeholder="Description"
                            sx={{ marginTop: 5 }}
                            {...register('description', {
                                required: 'Description is required!'
                            })}
                            fullWidth
                        ></Input>

                        <Box sx={{ marginTop: 5, marginBottom: 4 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker value={date} onChange={(newDate) => { setDate(newDate) }} sx={{ width: '100%' }} />
                            </LocalizationProvider>
                        </Box>


                    </div>
                    <div>
                        <GoogleMapComponent selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
                    </div>

                </div>
            </div>
            <div className={styles.footer}>
                <Box>
                    {id ? <Button className={styles.backButton} variant="outlined" style={{ margin: '15px 15px 0 0', color: 'red' }} onClick={onDelete}>
                        Delete Event
                    </Button> : null}
                    <Button className={styles.backButton} variant="outlined" style={{ marginTop: 15 }} onClick={handleSubmit(onSubmit)}>
                        {id ? 'Save' : 'Create'}
                    </Button>
                </Box>
            </div>
            {(id && data?.data) ?
                <EventsListRecs current_event={data?.data} />
                : null}
        </div>
    )
}