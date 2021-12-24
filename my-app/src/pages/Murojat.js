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
 editButD=(id, key)=>{
  var butD=this.state.butD
  butD[key]=true
  this.setState({
    butD:butD
  })
  this.editMurojat(id, key)
}
editButK=(id, key)=>{
  var butK=this.state.butK
  butK[key]=true
  this.setState({
    butK:butK
  })
  this.deleteMurojat(id, key)
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

    console.log(res.data)
  })
}
editMurojat=(id, key)=>{
  axios.put(`${url}/murojaat/${id}`, {seen:true}).then((res)=>{
    message.succes("Ma'lumot saqlandi");
    var butD=this.state.butD
    butD[key]=false
    this.setState({
      butD:butD
    })
  }).catch((err)=>{
    message.succes("Ma'lumot saqlanmadi");
    var butD=this.state.butD
    butD[key]=false
    this.setState({
      butD:butD
    })
  })

}
deleteMurojat=(id, key)=>{
  axios.delete(`${url}/murojaat/${id}`).then((res)=>{
    message.succes("Ma'lumot o'chirildi");
    var butK=this.state.butK
    butK[key]=false
    this.setState({
      butK:butK
    })
  }).catch((err=>{
    message.succes("Ma'lumot o'chirilmadi");
    var butK=this.state.butK
    butK[key]=false
    this.setState({
      butK:butK
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
            loading={this.state.butD[key]}
            style={{color:'white', fontSize:'15px'}}
            onClick={()=>{this.editButD(item.id ,key)}}
          >
            O'chirish
          </Button>
          <Button
            type="primary"
            icon={<EyeOutlined  style={{position:'relative', top:'-5px'}} />}
            loading={this.state.butK[key]}
            style={{color:'white', fontSize:'15px'}}
            onClick={()=>{this.editButK(item.id ,key)}}
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
                            loading={this.state.butD[key]}
                            onClick={()=>{this.editButD(item.id ,key)}}
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
 