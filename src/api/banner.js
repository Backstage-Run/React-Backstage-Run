import axios from '../untils/axios'

class Banner {
     BannerList(){
         let url = 'http://47.110.58.129:1913/banner/get_all'
         return axios.get(url)
     }
     delBanner(_id){
        let url ='http://47.110.58.129:1913/banner/delete'
        return axios.post(url,{_id})
     }
     updateBanner(payload){
       let url = 'http://47.110.58.129:1913/banner/updata'
       return axios.post(url,payload)
     }
     findOneBanner(_id){
         let url = 'http://47.110.58.129:1913/banner/get'
         return axios.post(url,{_id})
     }
     addBanner(payload){
       let url ='http://47.110.58.129:1913/banner/add'
       return axios.post(url,payload)
     }
}
export default new Banner