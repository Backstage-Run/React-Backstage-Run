import React, { Component } from 'react'
import { Card, Button, Table, message, Modal, Input, Spin } from 'antd'
import apiBanner from '../../api/banner'
import apiUpload from '../../api/upload'
class Banner extends Component {
    state = {
        list: [],
        columns: [
            {
                title: '_id',
                dataIndex: '_id',
                key: '_id',
                width: 120
            },
            {
                title: '缩略图',
                dataIndex: 'imgsrc',
                key: 'imgsrc',
                width: 200,
                render(path) {
                    return (
                        <img alt="" src={path} width="200" height="100"></img>
                    )
                }
            },
            {
                title: '图片类别',
                dataIndex: 'title',
                key: 'title',
                width: 120
            }, {
                title: '操作',
                key: 'action',
                width: 120,
                render: (recode) => {
                    return (
                        <div>
                            <Button onClick={() => {
                                this.addmsg(recode)
                            }}>修改</Button>
                            <Button type="danger" onClick={() => {
                                this.del(recode._id)
                            }}>删除</Button>
                        </div>
                    )
                }
            }
        ],
        visible: false,
        spinning: false,
        spinning2: false,
        _id: '',
        title: '',
        src: '',
        config: 'http://47.110.58.129:1913'
    }
    // 获取轮播图数据
    renderBanner = async () => {
        this.setState({ spinning: true })
        let { code, info } = await apiBanner.BannerList()
        if (code === 0) {
            this.setState({ list: info, spinning: false })
        }
    }
    // 删除单个数据
    del = async (_id) => {
        let { code } = await apiBanner.delBanner(_id)
        if (code === 0) {
            message.success('删除成功', 1, () => {
                this.renderBanner()
            })
        }
    }
    handleOk = async () => {
        let _id = this.refs.id.state.value
        let title = this.refs.title.state.value
        let imgsrc = this.refs.imgsrc.src
        let { code } = await apiBanner.updateBanner({ _id, imgsrc, title })
        if (code === 0) {
            message.success('修改成功', 1, () => {
                this.renderBanner()
            })
            this.setState({ visible: false })
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    //  获取添加数据信息
    addmsg = async (payload) => {
        let { _id, title, src } = this.state
        let { data } = await apiBanner.findOneBanner(payload._id)
        _id = data[0]._id
        title = data[0].title
        src = data[0].imgsrc
        this.setState({ _id, title, src })
        this.setState({ visible: true })
    }
    upload = async () => {
        let { config } = this.state
        let file = this.refs.img.files[0]
        if (file == null) { return message.warning('请选择一张图片') }
        let formdata = new FormData()
        formdata.append('img', file)
        let { code, path } = await apiUpload.img(formdata)
        path = config + path
        if (!code) { return message.warning('图片上传失败') }
        this.setState({ src: path })
    }
    componentDidMount() {
        this.renderBanner()
    }
    render() {
        let { list, columns, visible, _id, title, src, spinning } = this.state
        return (
            <div>
                <Card title="轮播图管理" extra={<Button type="primary" icon="plus" onClick={() => {
                    this.props.history.push('/admin/banneradd')
                }}>添加轮播图</Button>}>
                    <Spin spinning={spinning}>
                        <Table dataSource={list} columns={columns} rowKey='_id' pagination={{ pageSize: 3 }}></Table>
                    </Spin>
                </Card>

                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    _id:<Input ref='id' value={_id} /><br /><br />
         选择图片:<input type="file" ref='img' /><Button onClick={() => {
                        this.upload()
                    }}>点击上传</Button><br /><br />

                    <img src={src} alt="" width="80%" height="100" ref="imgsrc"></img><br /><br />
         图片类别:<Input ref="title" value={title} onChange={(e) => {
                        this.setState({ title: e.target.value })
                    }}></Input>
                </Modal>
            </div>



        )
    }
}
export default Banner