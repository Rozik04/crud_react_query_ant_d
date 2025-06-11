import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"
import type { colorList } from "../../../catogoryes/types"


export const UseGetColors = () => {
    return useQuery({
        queryKey:['color'],
        queryFn: () => request.get<colorList>('/color').then((res)=> res.data)
    })
}