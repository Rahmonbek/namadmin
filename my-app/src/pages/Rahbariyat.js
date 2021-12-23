import React, { Component } from 'react'
import style from '../css/Rahbariyat.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal} from 'react-bootstrap'

export default class Rahbariyat extends Component {
    state = {
        ob:{},
        edit:null,
        show: false,
        arr: [
            {
                ismi: 'Falonchi',
                familiyasi: 'falonchiyev',
                lavozimi: 'Direktor movini',
                email: "fsnhndskjlc@gmail.com",
                tel: "+998 (97) 777-77-77"
            }
        ]
    }
    deleteRow=(x)=>{
        var mas=this.state.arr
        mas.splice(x,1)
        this.setState({
            arr:mas
        })
    }
    handleClose = () => {
        this.setState({
            show: false,
            ob:{},
            edit:null
        })
    }
    f = () => {
        
        var a=document.querySelectorAll('input')
        var ob={
            ismi:a[0].value,
            familiyasi:a[1].value,
            lavozimi:a[2].value,
            email:a[3].value,
            tel:a[4].value
        }
        var mas=this.state.arr
        this.state.edit===null?mas.push(ob):mas[this.state.edit]=ob

        this.setState({
            arr:mas
        })
        this.handleClose()
    }
    openModal = (x) => {
x===null?this.setState({
            show: true,
        }): this.setState({
            show: true,
            edit:x,
            ob:this.state.arr[x]
        })
  

    }
    render() {

        return (
            <div><br/>
                <Button variant='primary' className={style.btn} onClick={() => { this.openModal(null) }}>Amaldor qo'shish</Button>
                <br/>
                <br/>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ismi</th>
                            <th>Familiyasi</th>
                            <th>Lavozimi</th>
                            <th>Email</th>
                            <th>Telefon raqami</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.arr.map((item, kay) =>
                               <tr>
                                    <td>{kay + 1}</td>
                                    <td>{item.ismi}</td>
                                    <td>{item.familiyasi}</td>
                                    <td>{item.lavozimi}</td>
                                    <td>{item.email}</td>
                                    <td>{item.tel}</td>
                                    <td><Button variant='outline-success' onClick={()=>{this.openModal(kay)}}>Edit</Button></td>
                                    <td><Button variant='outline-danger' onClick={()=>{this.deleteRow(kay)}}>Delete</Button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Amaldor shaxs haqida</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={style.center}>
                            <form>
                            <div className={style.inputbox}>
                                    <input defaultValue={this.state.ob.ismi} type="text"  required="required" />
                                    <span>Ismi</span>
                                </div>
                                <div className={style.inputbox}>
                                    <input defaultValue={this.state.ob.familiyasi} type="text" required="required" />
                                    <span>Familiyasi</span>
                                </div>
                                <div className={style.inputbox}>
                                    <input defaultValue={this.state.ob.lavozimi} type="text" required="required" />
                                    <span>Lavozimi</span>
                                </div>
                                <div className={style.inputbox}>
                                    <input defaultValue={this.state.ob.email} type="text" required="required" />
                                    <span>Email</span>
                                </div>
                                <div className={style.inputbox}>
                                    <input defaultValue={this.state.ob.tel} type="text" required="required" />
                                    <span>Telefon raqami</span>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.f}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}