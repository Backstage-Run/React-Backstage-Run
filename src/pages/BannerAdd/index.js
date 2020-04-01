import React, { Component } from 'react'
import { Card, Input, Button, Col, message, Spin } from 'antd'
import apiBanner from '../../api/banner'
import apiUpload from '../../api/upload'
class BannerAdd extends Component {
    state = {
        show: true,
        imgsrc: '',
        config: 'http://47.110.58.129:1913',
        title: '',
        spinning: false
    }
    upload = async () => {
        let { config } = this.state
        let file = this.refs.img.files[0]
        if (file == null) { return message.warning('请选择一张图片') }
        let formdata = new FormData()
        formdata.append('img', file)
        let { code, path } = await apiUpload.img(formdata)
        path = config + path
        this.setState({ show: false })
        if (!code) { return message.warning('图片上传失败') }
        this.setState({ imgsrc: path })
    }
    open = async () => {
        let { imgsrc, title } = this.state
        if (!imgsrc || !title) { message.warning('请完善添加信息!', 1) }
        this.setState({ spinning: true })
        let { code } = await apiBanner.addBanner({ imgsrc, title })
        if (code !== 0) { message.error('添加失败', 1) }
        message.success('添加成功')
        this.setState({ spinning: false, show: true, src: '', title: '' })
    }
    render() {
        let { show, imgsrc, title, spinning } = this.state
        return (
            <div className="banneradd">
                <Spin spinning={spinning}>
                    <Card title="轮播图添加" extra={<Button type="primary" icon="plus" onClick={() => {
                        this.props.history.push('/admin/banner')
                    }}>返回</Button>}>
                        图片上传：<input type="file" ref="img" style={{border:'0px'}}/><Button onClick={() => {
                            this.upload()
                        }}>点击上传</Button><br /><br />
                        {show || <img alt="" src={imgsrc} width="600" height="300" />}<br /><br />
                        <Col span={5}>
                            商品分类<br /><Input value={title} onChange={(e) => {
                                this.setState({ title: e.target.value })
                            }}></Input>
                        </Col><br /><br /><br />
                        <Button type="primary" onClick={() => { this.open() }}>提交</Button>
                    </Card>
                </Spin>
            </div>
        )
    }
}
export default BannerAdd