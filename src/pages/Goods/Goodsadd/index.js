import React, { Component } from 'react';
import { Card, Button, message, Spin } from 'antd'
import Style from './style.module.less'
import upload from '../../../api/upload'
import data from '../../../api/goods'
class Goodsadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loding: false,
            name: "默认",
            type: "默认",
            desc: "默认",
            price: "123",
            goodsStore: "默认",
            imgsrc: "https://bpic.588ku.com/element_origin_min_pic/19/11/20/a5a7dbafdbfdec9f9e70823578bc5467.jpg",
        }
    }
    uploadimg = () => {
        this.upload()
    }
    upload = async () => {
        let file = this.refs.file.files[0]
        if (!file) { return message.error('请先选择一张图片') }
        let { type } = file
        let types = ['jpg', "jpeg", 'gif', 'png']
        if (types.indexOf(type.split('/')[1]) === -1) { return message.warning('只允许jpg.jpeg,gif,png四种类型') }
        this.setState({ loding: true })
        var formdata = new FormData();
        formdata.append('img', file)
        let result = await upload.img(formdata)
        if (result.code === 1) {
            this.setState({
                imgsrc: "http://47.110.58.129:1913" + result.path
            }, () => {
                this.setState({ loding: false })
                message.success('图片上传成功')

            })
        } else {
            message.warning('图片上传失败')
        }

    }
    submit = async () => {
        let result = await data.add(this.state)
        if (result.code === 0) {
            message.success(result.msg)
        } else {
            message.warning(result.msg)
        }
    }
    render() {
        let { name, type, desc, price, goodsStore, loding, imgsrc } = this.state
        return (
            <Card title="添加商品" >
                <Spin className={Style.loging} tip="图片上传中" spinning={loding} />
                <label >商品名称:</label> <input type="text" placeholder="请输入商品名称" value={name} onChange={(e) => {
                    this.setState({ name: e.target.value })
                }} /><br />
                <label >商品类型:</label> <input type="text" placeholder="数码 手机..." value={type} onChange={(e) => {
                    this.setState({ type: e.target.value })
                }} /><br />
                <label className={Style.desc} >商品描述:</label> <textarea rows="4" cols="30" defaultValue={desc} onChange={(e) => {
                    this.setState({ desc: e.target.value })
                }}></textarea><br />
                <label >商品价格:</label> <input type="number" value={price} onChange={(e) => {
                    this.setState({ price: e.target.value })
                }} /><br />
                <label >商品店铺:</label> <input type="text" value={goodsStore} onChange={(e) => {
                    this.setState({ goodsStore: e.target.value })
                }} /><br />
                <label >商品图片:</label> <input ref="file" type="file" className={Style.file} /><Button onClick={this.uploadimg} type="primary">上传</Button><br />
                <label > 缩略图:</label><img className={Style.small_img} src={imgsrc} /><br />
                <Button onClick={this.submit} className={Style.submit} type="primary">提交</Button>
            </Card>
        )
    }
}
export default Goodsadd;