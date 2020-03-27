import React,{Component, Fragment} from 'react'
import {Button} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
class TokenModel extends Component{
    render(){
        let {show} = this.props
        return(
            <Fragment>
                {!show||
                <div className="token" style={{background:'yellowgreen',position:'fixed',top:'0',bottom:'0',left:'0',right:'0'}}>无权访问，请移步登录页面<Button onClick={()=>{
                    console.log(this)
                    // this.props.changeTokenModal(false)
                    this.props.history.replace('/login')
                  }}>点击返回登录</Button>
                </div>
                
                }
            </Fragment>
            
        )
    }
}

export default connect(state=>state)(withRouter(TokenModel));