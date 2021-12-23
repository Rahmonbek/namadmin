import axios from "axios"

export const url="https://namangan.electrofizik.uz"
// export const id=2
export const httpRequest=(config)=>{
    return(axios({
        ...config
    }))
}