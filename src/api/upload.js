import axios from 'axios'
class Upload {
    img(payload) {
        let url = 'http://47.110.58.129:1913/uploadimg'
        return axios.post(url, payload)
    }
}
export default new Upload()

