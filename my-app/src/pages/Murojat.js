import axios from 'axios'
import React, { Component } from 'react'
import Global from '../host/Global'
import { url } from '../host/Host'
import Loader from './Loader'
import {Row, Col} from 'react-bootstrap'
import style from '../css/murojat.module.css';
import {Button, message} from 'antd'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';


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
         <div className={style.tomosha}>
         <div className={style.tomosha_item}>
  <button className={style.but} onClick={()=>{this.setState({seen:false})}}>Ko'rilmaganlar</button>
</div>
<div className={style.tomosha_item}>
  <button className={style.but}  onClick={()=>{this.setState({seen:true})}}>Ko'rilganlar</button>
</div>
         </div>
          <Row>
         
          {this.state.murojat!==null?
          this.state.murojat.map((item, key)=>{
          if(!this.state.seen && !item.seen){
           return(
<Col lg={4} md={6} sm={2}>
<div className={style.cardT}>
 <h1>{item.name}</h1>
 <p><i className="fa fa-time"></i> {item.date_sent}</p>
 <p><i className="fa fa-phone"></i> {item.phone}</p>
 <p> {item.text}</p>
 <div className={style.butlar}>
 <Button
            type="danger"
            icon={<DeleteOutlined />}
            loading={this.state.butD[key]}
            onClick={()=>{this.editButD(item.id ,key)}}
          >
            O'chirish
          </Button>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            loading={this.state.butK[key]}
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
                  Salom
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

// date_sent: "2021-10-27"
// id: 9
// name: "Aliyev Husniddin"
// phone: "+998971661186"
// school: 2
// seen: false
// text: "Proyekt qanday ketepti???"
 