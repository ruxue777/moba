import axios from 'axios'

const http = axios.create({
    baseURL:"http://localhost:8088/admin/api"
})

export default http