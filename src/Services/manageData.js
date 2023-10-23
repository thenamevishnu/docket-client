import { api } from "../axios"

export const csvToJson = async () => {
    const {data} = await api.get(`/csv-to-json`)
    return data
}

export const getDockets =  async () => {
    const {data} = await api.get(`/dockets`)
    return data
}

export const date_format = (date) => {
    const newDate = new Date(date * 1000)
    const day = newDate.getDate() < 10 ? "0"+newDate.getDate() : newDate.getDate()
    const month = newDate.getMonth()+1 < 10 ? "0"+(newDate.getMonth()+1) : newDate.getMonth() + 1
    const year = newDate.getFullYear()
    const hour = newDate.getHours() < 10 ? "0"+newDate.getHours() : newDate.getHours()
    const minutes = newDate.getMinutes() < 10 ? "0"+newDate.getMinutes() : newDate.getMinutes()
    const seconds = newDate.getSeconds() < 10 ? "0"+newDate.getSeconds() : newDate.getSeconds()
    return `${day}-${month}-${year} | ${hour}:${minutes}:${seconds}`
}