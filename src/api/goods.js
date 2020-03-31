import axios from 'axios'
class Goods {
    list() {
        let url = 'http://47.110.58.129:1913/goods/get_all'
        return axios.get(url)
    }
    add(data) {
        let { name, type, desc, price, goodsStore, imgsrc } = data
        let url = 'http://47.110.58.129:1913/goods/add'
        return axios.post(url, { name, type, desc, price, goodsStore, imgsrc })
    }
    del(_id) {
        let url = 'http://47.110.58.129:1913/goods/delete'
        return axios.post(url, { _id })
    }
    updata(data) {
        let { _id, type, desc, name, price, goodsStore, imgsrc } = data
        let url = 'http://47.110.58.129:1913/goods/updata'
        return axios.post(url, { _id, type, desc, name, price, goodsStore, imgsrc })
    }
    getgoods_one(_id) {
        let url = `http://47.110.58.129:1913/goods/get`
        return axios.post(url, { _id })
    }
    keyword(word) {
        let url = "http://47.110.58.129:1913/goods/keyword"
        return axios.post(url, { keyword: word })
    }
}

export default new Goods()