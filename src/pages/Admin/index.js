import React,{Component} from 'react'
import { Layout} from 'antd';
import CustomNav from '../../components/CustomNav'
import Style from './index.module.less'
const { Header, Content, Footer, Sider } = Layout;
class Admin extends Component{
    render(){
        return(
            <Layout>
    <Sider>
      <div className="logo" />
      <CustomNav></CustomNav>
    </Sider>
    <Layout>
      <Header className={Style.headers}>这里是头头</Header>
      <Content style={{ margin: '24px 16px 0' }}>
        
         {this.props.children}

        
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
        )
    }
}
export default Admin