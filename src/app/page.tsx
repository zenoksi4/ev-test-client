"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function Main() {
  const { push } = useRouter()
  useEffect(() => { push('/events_list') }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
