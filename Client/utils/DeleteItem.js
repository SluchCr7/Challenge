import axios from "axios"
export const deleteItem = (link , id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/${link}/${id}`)
        .then((res) => {
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}