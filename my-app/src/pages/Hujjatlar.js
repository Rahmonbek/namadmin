import React, { Component } from "react";

import axios from 'axios'

import { Button, Form} from 'react-bootstrap'

import { url } from '../host/Host'
import Loader from './Loader'

export default class Hujjatlar extends Component {
  
    state={
        hujjat:null,
        loading:false,
    }
    componentDidMount() {
        this.getHujjat();
      };
    getHujjat = () =>{
        axios.get(`${url}/hujjatlar/`).then((res) => {
         console.log('errere')
            this.setState({
              hujjat: res.data,
              loading: false,
            });
          }).catch(err=>{
            
            console.log(err)
          });
        
    };
    addHujjat=()=>{
        console.log('sdjnsdnksjdn')
      var name=document.getElementById('name').value
      var type=document.getElementById('type').value
      var link=document.getElementById('link').value
     var config={name, type, link}
     axios.post(`${url}/hujjatlar/`, config,
     {headers: {
       "Content-type": "application/json; charset=UTF-8",
      'Authorization': `Token ${window.localStorage.getItem("token")}`
     }}).then(res=>{
         console.log(res)
     })
    }
   
    render() {
        return (
            <div>
                {
                    this.state.loading?<Loader/>:
                        <div>
       
                           <Form className='formnew'>
                           <Form.Label>Hujjat turini tanlang</Form.Label>
                           <select id="type" style={{width:'100%', outline:'none', fontSize:'16px', padding:'5px', backgroundColor:'white'}}>
    <option value="1">Ta'limga oid qonunlar</option>
    <option value="2">Prezident farmonlari, farmoyishlari va qarorlari</option>
      <option value="3">O`quvchilar uchun</option>
</select>
<br/><br/>
                           
    <Form.Label>Hujjat nomi</Form.Label>
    <input id="name"  style={{width:'100%', outline:'none', fontSize:'16px', padding:'5px', backgroundColor:'white'}} type="text" placeholder="Hujjat nomini kiriting" />
    <br/><br/>

 
    <Form.Label>Hujjat ssilkasi</Form.Label>
    <input type="url"  style={{width:'100%', outline:'none', fontSize:'16px', padding:'5px', backgroundColor:'white'}} id="link" placeholder="Hujjat ssilkasini kiriting" />
    <br/><br/>
    
    
    <Button variant="primary" type="button" onClick={this.addHujjat}>
    Submit
  </Button>
</Form>
                        </div>
                    
                }
            </div>
        )
    }
}
