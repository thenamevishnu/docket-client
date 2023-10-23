import { api } from "../axios"

export const saveDocket = async (docketData) => {
    const {data} = await api.post(`/save-docket`, {docketData})
}