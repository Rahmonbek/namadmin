import axios from "axios"

export const url="http://143.244.209.138"
// export const id=2
export const httpRequest=(config)=>{
    return(axios({
        ...config
    }))
}