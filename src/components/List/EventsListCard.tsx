'use client'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { EventType } from '@/types/event.type';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5]

}));

const EventsListCard = ({ event }: { event: EventType }) => {
    const { push } = useRouter()
    const card = (
        <>
            <CardContent >
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="h5" component="div">
                    {event?.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Views: {event?.views}
                </Typography>
                <Typography sx={{ paddingTop: 2 }} variant="body2">
                    {event?.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button size="small" onClick={() => { push(`/event/${event?.id}`) }} >Learn More</Button>
                    <Typography>
                        {dayjs(event?.time).format('YYYY-MM-DD hh:mm')}
                    </Typography>
                </Typography>
            </CardActions>
        </>
    )

    return (
        <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 200 }}>
            <StyledCard variant="outlined">{card}</StyledCard>
        </Grid>

    )
}

export default EventsListCard;