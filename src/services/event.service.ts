import Api from '@/api/Api'
import { EventType, EventFormType } from '@/types/event.type'


export const eventService = {

	async createEvent(data: EventFormType) {
		const response = await Api.post<EventType>('/event', data)

		return response
	},

	async getEvent(id: string, forUpdate: boolean) {
		const response = await Api.get<EventType>(`/event/${id}`)

		return response
	},

	async getEvents() {
		const response = await Api.get<EventType[]>(`/event`)

		return response
	},

	async updateEvent(id: string, data: EventFormType) {
		const response = await Api.post<EventType[]>(`/event/${id}`, data)

		return response
	},

	async deleteEvent(id: string) {
		const response = await Api.delete<{ id: string }>(`/event/${id}`)

		return response
	},

}
