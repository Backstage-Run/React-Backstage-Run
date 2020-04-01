import axios from 'axios'
class Admin {
    list() {
        console.log(1)
        let url = 'http://47.110.58.129:1913/admin/get_all'
        return axios.get(url)
    }
    add(data) {
        let { name, password, email, introduction, phone, headimg, address } = data
        let url = 'http://47.110.58.129:1913/admin/add'
        return axios.post(url, { name, password, email, introduction, phone, headimg, address })
    }
    del(_id) {
        let url = 'http://47.110.58.129:1913/admin/delete'
        return axios.post(url, { _id })
    }
    updata(data) {
        let { _id, name, password, email, introduction, phone, headimg, address } = data
        let url = 'http://47.110.58.129:1913/admin/updata'
        return axios.post(url, { _id, name, password, email, introduction, phone, headimg, address })
    }
    getadmin_one(_id) {
        let url = `http://47.110.58.129:1913/admin/get`
        return axios.post(url, { _id })
    }
}

export default new Admin()