'use client'
import { Typography } from "@mui/material";

const EmptyList = () => {
    return (
        <Typography
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 5,
                textAlign: 'center',

            }}
            variant="h3"
            gutterBottom

        >
            Empty list
        </Typography>

    )
}

export default EmptyList;