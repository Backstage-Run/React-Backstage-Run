import React, { Component, Fragment } from 'react'
import { Menu, Dropdown, Icon, message } from 'antd';
import actionCreator from '../../store/actionCreatore'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class HeaderNav extends Component {
  state = {
    menu: (
      <Menu>
        <Menu.Item key="0">
          <span onClick={() => {
            this.goback()
          }}>退出</span>
        </Menu.Item>
      </Menu>
    ),
    key: 'updatable'
  }
  goback = () => {
    let { key } = this.state
    message.loading({ content: '正在退出...', key });
    setTimeout(() => {
      message.success({ content: '退出成功!', key, duration: 2 });
      setTimeout(() => {
        window.location.href = '#/login'
        this.props.changeTokenModal(true)
        sessionStorage.removeItem('token')
      }, 1000)

    }, 1000);

  }
  render() {
    let { menu } = this.state
    return (
      <Fragment>
        WelCome BackStage
        <div style={{ float: 'right' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a href="ww" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585561157475&di=2fa50f45a53a56b8367aeb6bdd4fcc19&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5ecab4b5752dea92f62f472cdea1a387f806b43a85b7-4O5QSj_fw236" width="50" height="50" /> <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Fragment>

    )
  }
}
export default connect(state => state, (dispatch) => {
  return bindActionCreators(actionCreator, dispatch)
})(HeaderNav)