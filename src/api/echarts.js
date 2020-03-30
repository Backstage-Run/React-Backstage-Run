import axios from 'axios'

class Echarts {
    word(){
        let url = 'http://47.110.58.129:1913/cooperation'
        return axios.get(url)
    }
    shop(){
        let url ='http://47.110.58.129:1913/sales'
        return axios.get(url)
    }
}
export default new Echarts