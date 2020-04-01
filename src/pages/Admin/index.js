import React, { Component, Fragment } from 'react'
import { Layout } from 'antd';
import CustomNav from '../../components/CustomNav'
import Style from './index.module.less'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import HeaderNav from '../../components/HeaderNav'
const { Header, Content, Footer, Sider } = Layout;
class Admin extends Component {

  render() {
    let { show } = this.props
    return (
      <Fragment>
        {show ||
          <Layout>
            <Sider>
              <div className="logo" />
              <CustomNav></CustomNav>
            </Sider>
            <Layout>
              <Header className={Style.headers}>
                <HeaderNav></HeaderNav>
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                {this.props.children}
              </Content>
              <Footer style={{ textAlign: 'center' }}>Back Stage ©2018 </Footer>
            </Layout>
          </Layout>
        }
      </Fragment>


    )
  }
}
export default connect(state => state)(withRouter(Admin));