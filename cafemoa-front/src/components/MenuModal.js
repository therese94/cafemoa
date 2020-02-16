import React, { Component } from "react";
import {
    Form,
    Modal,
    InputNumber,
    // Select,
    // Checkbox
} from 'antd';
import 'antd/dist/antd.css';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../store';


export default class MenuModal extends Component {
    state = { visible: false,
              value: 1,
              };

    showModal = () => {
        console.log(this.state)
        this.setState({
            visible: true
            
        });
    };

    onChange = (value) => {
        console.log('changed', value);
        this.setState({
            value: value,
        });
    };

    handleOk = (e) => {
        const menu = this.props.menu
        this.setState({
            visible: false,
        });
        const uid = store.getState().user_info.uid
        store.dispatch({type:'BASKET', 
            data: {
                ccid: menu.cafe,
                uid: uid,
                menu: {
                    key:menu.mmid,
                    mname:menu.mname,
                    mpic:menu.mpic,
                    mprice:menu.mprice,
                    mquantity:this.state.value
                }
            }
        })
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const menu = this.props.menu
        // console.log(menu)
        return (
            <div>
                <Card style={{  width: '90%', textAlign: 'center', padding: '5%' }} onClick={this.showModal} >
                    <Card.Img variant="top" src={menu.mpic} alt={menu.mname} title={menu.mmid} style={{ width: '100%', height: 240 }} />
                    <Card.Body>
                        <Card.Text>
                            {menu.mname}
                        </Card.Text>
                        <Card.Text>
                            {menu.mprice} 원
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Modal
                    title={menu.mname}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="장바구니 담기"
                    cancelText="취소"
                    pic={menu.mpic}                                            
                >
                    <div style={{ textAlign: 'center' }}>
                        <img src={menu.mpic} alt="메뉴이미지" width="70%" />
                    </div>
                    <hr></hr>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                        <Form.Item style = {{ alignContent: 'center' }}>
                            수량 : <InputNumber id="quan" min={1} max={10} defaultValue={1} onChange={this.onChange}/>
                            <br></br>
                            가격 : {menu.mprice}원
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
