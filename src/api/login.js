import axios from 'axios'
class Login {
  gologin(payload) {
    let url = 'http://47.110.58.129:1913/admin/login'
    return axios.post(url, payload)
  }
}

export default new Login()