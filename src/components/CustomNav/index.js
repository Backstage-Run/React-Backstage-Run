import React,{Component} from 'react'
import { Menu, Switch } from 'antd';
import {withRouter} from 'react-router-dom'
import {Icon} from 'antd';
import navlist from './navlist'
const { SubMenu } = Menu;
function handleClick(e) {
  // 点击获取跳转路径通过编程式导航实现跳转
  let {path} = e.item.props 
  this.props.history.replace(path)
}
class CustomNav extends Component{
    state = {
        theme: 'dark',
      };
    
      changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
      };
    
    renderIcon(icon){
        switch (icon) {
          case 'home':
            return <Icon type="setting" />
            break;
          case 'user':
            return <Icon type="user" />
            break
          case 'list':
            return <Icon type="team" />
            break
          case 'add':
            return <Icon type="user-add" />
            break      
          default:
            break;
        }
    }
    renderNav(data){
      return data.map((item,index)=>{
        if(item.children){
          return(
            <SubMenu key={item.key} title={(()=>{
               return(
                 <span>
                   {this.renderIcon(item.icon)}
                   {item.title}
                 </span>
               )
            })()}>
              {this.renderNav(item.children)}
            </SubMenu>
          )
        }else{
          return(
            <Menu.Item key={item.key} path={item.path}>
              {this.renderIcon(item.icon)}
              {item.title}
            </Menu.Item>
          )
        }
      })
    }  
    render(){
        return(
            <div style={{height:'100vh'}}>
            <br/>
            <Switch
              checked={this.state.theme === 'dark'}
              onChange={this.changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"      
            />
            <br />
            <br />
            <Menu
              theme={this.state.theme}
              onClick={handleClick.bind(this)}
              style={{ width: 200 }}
              mode="inline"
            >
              {/* <SubMenu
                key="1"
                title={
                  <span>
                    <MailOutlined />
                    <span>Navigation One</span>
                  </span>
                }
              >
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu> */}
              {this.renderNav(navlist)}
            </Menu>
          </div>
        )
    }
}

export default withRouter(CustomNav);