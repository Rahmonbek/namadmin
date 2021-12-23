import axios from 'axios'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { url } from '../host/Host'
import Loader from './Loader'

export default class Hujjatlar extends Component {
  
    state={
        hujjat:null,
        loading:true,
    }
    componentDidMount() {
        this.getHujjat();
      };
    getHujjat = () =>{
        axios.get(`${url}/hujjatlar/`).then((res) => {
         
            this.setState({
              hujjat: res.data,
              loading: false,
            });
          }).catch(err=>{
            
            console.log(err)
          });
        
    };
   
    render() {
        return (
            <div>
                {
                    this.state.loading?(<Loader/>):(
                        <div>
                           <Form>
                           <Form.Group className="mb-3"  className="mb-3" controlId="type">
    <Form.Label>Hujjat turini tanlang</Form.Label>
    <Form.Select >
    <option value="1">Ta'limga oid qonunlar</option>
    <option value="2">Prezident farmonlari, farmoyishlari va qarorlari</option>
      <option value="3">O`quvchilar uchun</option>
    </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" controlId="title">
    <Form.Label>Hujjat nomi</Form.Label>
    <Form.Control type="text" placeholder="Hujjat nomini kiriting" />
    </Form.Group>
    
  <Form.Group className="mb-3" controlId="link">
    <Form.Label>Hujjat ssilkasi</Form.Label>
    <Form.Control type="url" placeholder="Hujjat ssilkasini kiriting" />
    </Form.Group>
                           </Form>
                        </div>
                    )
                }
            </div>
        )
    }
}
