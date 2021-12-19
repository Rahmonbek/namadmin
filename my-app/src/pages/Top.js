import React, { Component } from 'react';
import styles from '../css/Top.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {Container,Row,Col} from 'react-bootstrap'
import {FiSearch,FiChevronDown, FiPauseCircle} from "react-icons/fi";
import school1 from '../img/user.png'
class Top extends Component {
    state={
        isOpen:false
    }
    openDiv=()=>{
       if(!this.state.isOpen){
           this.setState({
               isOpen:true
           })
           console.log(this.state.isOpen)
       }else{
           this.setState({
               isOpen:false
           })
           console.log(this.state.isOpen)

       }
    }
    render() {
        return (
            <div>
                <Container fluid className={styles.top}>
                    <Row>
                        <Col sm={12} xs={12}>
                        <h1> Namangan viloyati
                      xalq ta'limi boshqarmasi
                      </h1></Col>
                       
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Top;