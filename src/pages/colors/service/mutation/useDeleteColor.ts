import { useMutation } from "@tanstack/react-query"
import { request } from "../../../../config/request"


export const UseDeleteColor = () => {
    return useMutation({
        mutationFn: ((id:string)=>request.delete(`/color/${id}`).then((res)=> res.data))
    })
}