import axios from 'axios'
import React, { Component } from 'react'
import Global from '../host/Global'
import { url } from '../host/Host'
import Loader from './Loader'
import {Row, Col} from 'react-bootstrap'
import style from '../css/murojat.module.css';
import {Button, message} from 'antd'
import { DeleteOutlined, EyeOutlined,  EditOutlined } from '@ant-design/icons';


export default class Murojat extends Component {
 state={
   loader:true,
   murojat:null,
   seen:false,
   butD:[],
   butK:[],
 }

getMurojat=()=>{
  axios.get(`${url}/murojaat/`).then((res)=>{
   var butD=[]
   var butK=[]
   console.log(res.data)
    res.data.map(item=>{
butD.push(false)
butK.push(false)
    })
    this.setState({
      murojat:res.data,
    loader:false,
    butD:butD,
    butK:butK,
    })

   
  })
}
editMurojat=(id)=>{
this.setState({
  loader:true
})
  axios.patch(`${url}/murojaat/${id}/`, {seen:true}, {

    headers: {
     'Authorization': `Token ${window.localStorage.getItem("token")}`
    }}).then((res)=>{
    message.success("Ma'lumot saqlandi");
   this.getMurojat()
  }).catch((err)=>{
    message.success("Ma'lumot saqlanmadi");
    this.setState({
      loader:false
    })
   
   
  })

}
deleteMurojat=(id)=>{
  this.setState({
    loader:true
  })
  axios.delete(`${url}/murojaat/${id}/`, {

    headers: {
     'Authorization': `Token ${window.localStorage.getItem("token")}`
    }}).then((res)=>{
    message.success("Ma'lumot o'chirildi");
   this.getMurojat()
  }).catch((err=>{
    message.success("Ma'lumot o'chirilmadi");
    this.setState({
      loader:false
    })
  }))

}
componentDidMount(){
  this.getMurojat()
}
  render() {
    return (
      <div>
        {this.state.loader?
        <Loader/>:
        <div>
      <div className="you_btn" style={{justifyContent:'flex-start'}}> 
         </div>
        
             
          <Row>
         <div className="mur_you">
         <Button
           style={{backgroundColor:this.state.seen?"#120338":"#5b8c00", color:'white', fontSize:'15px'}}
            icon={<EditOutlined style={{position:'relative', top:'-5px'}} />}
          onClick={()=>{this.setState({seen:false})}}  
            
          >
            Ko'rilmaganlar
          </Button>
           {this.state.seen?<h4 style={{textAlign:'center',color:'#00474f'}}>Ko'rib chiqilgan murojaatlar</h4>:<h4 style={{textAlign:'center',color:'#00474f'}}>Ko'rib chiqilmagan murojaatlar</h4>}
           <Button
          
           
            style={{backgroundColor:!this.state.seen?"#120338":"#5b8c00", color:'white', fontSize:'15px'}}
            
            icon={<EyeOutlined style={{position:'relative', top:'-5px'}} />}
            onClick={()=>{this.setState({seen:true})}}  
          
           
          >
            Ko'rilganlar
          </Button></div>

          {this.state.murojat!==null?
          this.state.murojat.map((item, key)=>{
          if(!this.state.seen && !item.seen){
           return(
<Col lg={4} md={6} sm={2}>
<div className={style.cardT}>
 <h5>{item.name}</h5>
 <p><i className="fa fa-calendar"></i> {item.date_sent}</p>
 <p><i className="fa fa-phone"></i> {item.phone}</p>
 <p><i className="fa fa-comment"></i> {item.text}</p>
 <div className="you_btn">
 <Button
            type="danger"
            icon={<DeleteOutlined  style={{position:'relative', top:'-5px'}} />}
            loader={this.state.butD[key]}
            style={{color:'white', fontSize:'15px'}}
            onClick={()=>{this.deleteMurojat(item.id)}}
          >
            O'chirish
          </Button>
          <Button
            type="primary"
            icon={<EyeOutlined  style={{position:'relative', top:'-5px'}} />}
            loader={this.state.butK[key]}
            style={{color:'white', fontSize:'15px'}}
            onClick={()=>{this.editMurojat(item.id)}}
          >
            Ko'rildi
          </Button>

 </div>
</div>

            </Col> 
           )
          }else{
            if(this.state.seen && item.seen){
              return(
                <Col lg={4} md={6} sm={2}>
                <div className={style.cardT}>
                 <h5>{item.name}</h5>
                 <p><i className="fa fa-time"></i> {item.date_sent}</p>
                 <p><i className="fa fa-phone"></i> {item.phone}</p>
                 <p><i className="fa fa-comment"></i> {item.text}</p>
                 <div className="you_btn" style={{justifyContent:'center'}}>
                 <Button
                            type="danger"
                            style={{color:'white', fontSize:'15px'}}
                            icon={<DeleteOutlined  style={{position:'relative', top:'-5px'}} />}
                            loader={this.state.butD[key]}
                            onClick={()=>{this.deleteMurojat(item.id)}}
                          >
                            O'chirish
                          </Button>
                        
                
                 </div>
                </div>
                
                            </Col> 
                           )
            }
           
            }
           
  }):''}
          </Row>
          </div>}
      </div>
    )
  }
}
 