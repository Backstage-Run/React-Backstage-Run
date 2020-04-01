import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import {Card} from 'antd'
import apiEcharts from '../../api/echarts'
class Index extends Component{
    state = {
        option:{
      },
      option2:{}
      }
      getdata=async()=>{
          let {data,code} = await apiEcharts.word()
          if(code){  
              data.legend = {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            }
             this.setState({option:data})
          }
      }
      getshop=async()=>{
          let {data,code} = await apiEcharts.shop()
          if(code){this.setState({option2:data})}
      }
      componentDidMount(){
          this.getdata()
          this.getshop()
      }
    render(){
        let {option,option2} = this.state
        return(
            
            <Card title="本周访问量">
           <ReactEcharts option={option}></ReactEcharts><br/>
           <ReactEcharts option={option2}></ReactEcharts>
        </Card>
            
        )
    }
}
export default Index