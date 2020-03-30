import React,{Component} from 'react'
import Style from './index.module.less'
import apiLogin from '../../api/login'
import { Form, Input, Button, Checkbox, Icon,message  } from 'antd';
import actionCreator from '../../store/actionCreatore'
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'
class Login extends Component{
  login=()=>{
    let {validateFields} = this.props.form
    validateFields((err,success)=>{
      if(err){
        message.error('输入有误请重试',1)
      }else{
        let username = success.userName
        let password = success.passWord
          apiLogin.gologin({username,password}).then((res)=>{
              if(res.code){
                message.error('用户名或密码错误',1)
              }else{
                message.success('登录成功，1秒后自动跳转',1,()=>{
                  //  actionCreator.changeTokenModal(false)
                  sessionStorage.setItem('token',1234)
                  // this.props.changeTokenModal(false)
                  this.props.changeTokenModal(false)
                  this.props.history.replace('/admin/home')
                })
              }
          })
       
      }
   })
  }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={Style.login}>
              <div className={Style.content}>
                  {/* 头部logo title区 */}
                  <div className={Style.top}>
                      <div className={Style.logo}>
                          <p>Second hand cat Admin</p>
                      </div>
                  </div>
                  {/* 登录选项区 */}
                  <div className={Style.user}>
                  <div className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true,message:'请填写用户名'},
            {min:3,message:'用户名最小长度3位'}]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passWord', {
            rules: [{ required: true,message:'请填写密码'},
            {min:3,message:'密码最少3位数'}]     
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <br/>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}} onClick={this.login}>
            Log in
          </Button>
       
        </Form.Item>
      </div>
                 
                 </div>
              </div>
            </div>
        )
    }
}
export default Form.create()(connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionCreator,dispatch)
})(withRouter(Login)));