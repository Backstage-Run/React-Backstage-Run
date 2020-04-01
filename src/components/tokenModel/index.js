import React,{Component, Fragment} from 'react'
import {Button,Result} from 'antd'
import {withRouter} from 'react-router-dom'
import actionCreator from '../../store/actionCreatore'
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'
class TokenModel extends Component{
    componentDidMount(){
        if(sessionStorage.getItem('token')){
            this.props.changeTokenModal(false)
        }else{
            this.props.changeTokenModal(true)
        }
    }
    render(){
        let {show} = this.props
        return(
            <Fragment>
                {!show||
                <Result
                style={{position:'fixed',top:'0',bottom:'0',left:'0',right:'0'}}
                status="403"
                title="请登录后再访问！"
                subTitle="Sorry, please login and visit again."
                extra={<Button type="primary" onClick={()=>{
                    this.props.history.replace('/login')
                  }}>去登录</Button>}
              >              
              </Result>
                
                
                
                }
            </Fragment>
            
        )
    }
}

export default connect(state=>state,(dispatch)=>{
    return bindActionCreators(actionCreator,dispatch)
  })(withRouter(TokenModel))