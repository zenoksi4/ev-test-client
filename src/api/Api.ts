import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:3080/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}

export default axios.create(options)
