import { Metadata } from "next"
import Event from "../Event"
export const metadata: Metadata = {
  title: 'event update',
}
export default function CreateEvent() {
  return <Event></Event>
}