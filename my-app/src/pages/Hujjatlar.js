import React, { Component } from "react";

import axios from 'axios'

import { Button, Form, Table} from 'react-bootstrap'

import { url } from '../host/Host'
import Loader from './Loader'
import { message } from "antd";

export default class Hujjatlar extends Component {
  
    state={
        hujjat:null,
        loading:false,
        edit:null,
        
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
    addHujjat=()=>{
      this.setState({
        loading:true
      })
      var title=document.getElementById('title').value
      var type=document.getElementById('type').value
      var link=document.getElementById('link').value
     var config={title, type, link}
if(this.state.edit===null){

    axios.post(`${url}/hujjatlar/`, config,
    {headers: {
      "Content-type": "application/json; charset=UTF-8",
     'Authorization': `Token ${window.localStorage.getItem("token")}`
    }}).then(res=>{
       message.success("Ma'lumot qo'shildi")
        this.getHujjat()
    }).catch(err=>{
       message.error("Ma'lumot qo'shilmadi")
       this.setState({
        loading:false
      })
    })
   
}else{
    axios.put(`${url}/hujjatlar/${this.state.edit}/`, config,
    {headers: {
      "Content-type": "application/json; charset=UTF-8",
     'Authorization': `Token ${window.localStorage.getItem("token")}`
    }}).then(res=>{
       message.success("Ma'lumot o'zgartirildi")
       this.setState({edit:null})
       this.getHujjat()
    }).catch(err=>{
       message.error("Ma'lumot o'zgartirilmadi")
       this.setState({
        loading:false
      })
    })
}}
   deleteHujjat=(id)=>{
       axios.delete(`${url}/hujjatlar/${id}/`,
       {headers: {
        "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${window.localStorage.getItem("token")}`
      }}).then(res=>{
          message.success("Ma'lumot o'chirildi")
          this.getHujjat()
      }).catch(res=>{
        message.error("Ma'lumot o'chirilmadi")
    })
   }
   editHujjat=(id)=>{
       
       document.getElementById('title').value=this.state.hujjat[id].title
       document.getElementById('type').value=this.state.hujjat[id].type
       document.getElementById('link').value=this.state.hujjat[id].link
       this.setState({
           edit:this.state.hujjat[id].id
       })
   }
    render() {
        return (
            <>
                {
                    this.state.loading?<Loader/>:
                        <>
       
                           <Form className='formnew'>
                           <Form.Label>Hujjat turini tanlang</Form.Label>
                           <select id="type" style={{width:'100%', outline:'none', fontSize:'16px', padding:'5px', backgroundColor:'white'}}>
    <option value="1">Ta'limga oid qonunlar</option>
    <option value="2">Prezident farmonlari, farmoyishlari va qarorlari</option>
      <option value="3">O`quvchilar uchun qarorlar</option>
      <option value="4">Xalq ta'limi vazirligi Hay'at qarorlari </option>
      <option value="5">Xalq ta'limi vazirligi me'yoriy hujjatlari </option>
      <option value="6">O'z kuchini yo'qotgan me'yoriy-huquqiy hujjatlar</option>
      <option value="7">Me'yoriy hujjatlar loyihalari </option>
      <option value="8">Ta'limga oid normativ-huquqiy hujjatlar</option>
      <option value="9">Vazirlik ishtirokidagi Xalqaro shartnomalar</option>
      <option value="10">Davlat tiliga oid normativ-huquqiy hujjatlar</option>



     
</select>
<br/><br/>
                           
    <Form.Label>Hujjat nomi</Form.Label>
    <input id="title"  style={{width:'100%', outline:'none', fontSize:'16px', padding:'5px', backgroundColor:'white'}} type="text" placeholder="Hujjat nomini kiriting" />
    <br/><br/>

 
    <Form.Label>Hujjat ssilkasi</Form.Label>
    <input type="url"  style={{width:'100%', outline:'none', fontSize:'16px', padding:'5px', backgroundColor:'white'}} id="link" placeholder="Hujjat ssilkasini kiriting" />
    <br/><br/>
    
    
    <Button variant="primary" type="button" onClick={this.addHujjat}>
    Hujjat qo'shish
  </Button>
</Form>

<div className="tablenew">
    <h4>Ta'limga oid qonunlar</h4>
<Table striped bordered hover variant="light">
  <thead>
    <tr>
      
      <th>Hujjat</th>
      <th>O'zgartirish</th>
      <th>O'chirish</th>
    </tr>
  </thead>
  <tbody>
   {
     
       this.state.hujjat!==null?this.state.hujjat.map((item,key)=>{
         
   if(item.type===1){
       return(
    <tr>
    
    <td><a href={item.link} target="_blank">{item.title}</a></td>
    <td><Button variant="success" onClick={()=>{this.editHujjat(key)}}>O'zgartirish</Button></td>
    <td><Button variant="danger" onClick={()=>{this.deleteHujjat(item.id)}}>O'chirish</Button></td>
  </tr>)
   }
              
       })
   :""
   }
   
  </tbody>
</Table>
</div>
<div className="tablenew">
    <h4>Prezident farmonlari, farmoyishlari va qarorlari</h4>
<Table striped bordered hover variant="light">
  <thead>
    <tr>
      
      <th>Hujjat</th>
      <th>O'zgartirish</th>
      <th>O'chirish</th>
    </tr>
  </thead>
  <tbody>
   {
       this.state.hujjat!==null?this.state.hujjat.map((item,key)=>{
   if(item.type===2){
       return(
    <tr>
    
    <td><a href={item.link} target="_blank">{item.title}</a></td>
    <td><Button variant="success" onClick={()=>{this.editHujjat(key)}}>O'zgartirish</Button></td>
    <td><Button variant="danger" onClick={()=>{this.deleteHujjat(item.id)}}>O'chirish</Button></td>
  </tr>)
   }
              
       })
   :""
   }
   
  </tbody>
</Table>
</div>
<div className="tablenew">
    <h4>O`quvchilar uchun</h4>
<Table striped bordered hover variant="light">
  <thead>
    <tr>
      
      <th>Hujjat</th>
      <th>O'zgartirish</th>
      <th>O'chirish</th>
    </tr>
  </thead>
  <tbody>
   {
       this.state.hujjat!==null?this.state.hujjat.map((item,key)=>{
   if(item.type===3){
       return(
    <tr>
    
    <td><a href={item.link} target="_blank">{item.title}</a></td>
    <td><Button variant="success" onClick={()=>{this.editHujjat(key)}}>O'zgartirish</Button></td>
    <td><Button variant="danger" onClick={()=>{this.deleteHujjat(item.id)}}>O'chirish</Button></td>
  </tr>)
   }
              
       })
   :""
   }
   
  </tbody>
</Table>
</div>
</>
                    
                }
            </>
        )
    }
}
