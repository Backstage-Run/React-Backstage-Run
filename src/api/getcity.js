import axios from 'axios'
class City {
    getcity() {
        let url = 'https://proapi.azurewebsites.net//api/geographic/province'
        return axios.get(url)
    }
    getlocal(id) {
        let url = `https://proapi.azurewebsites.net//api/geographic/city/${id}`
        return axios.get(url)
    }
}

export default new City()