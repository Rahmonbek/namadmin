import { message } from 'antd';
import axios from 'axios';
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import YouTube from "@u-wave/react-youtube";
import { url } from '../host/Host';
import Loader from './Loader';
import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default class Youtube extends Component {
    state={
        school:null,
        loading:true,
        edit:null,
    }
    addVideo =()=>{
      var a=document.getElementById('you').value
        var videos=this.state.school.youtube_videos
        
      if(this.state.edit===null){
        videos.push(a.slice(a.lastIndexOf('/')+1))
        
       
      }else{
videos[this.state.edit]=a.slice(a.lastIndexOf('/')+1)
      }
      
      var config={youtube_videos:videos}
        
        axios
        .patch(`${url}/boshqarma/${1}/`, config, {
  
          headers: {
           'Authorization': `Token ${window.localStorage.getItem("token")}`
          }})
        .then((res) => {
         
          this.getSchool();
          message.success("Ma'lumot qo'shildi");
        })
        .catch((err) => {
          message.error("Ma'lumot qo'shilmadi");
          this.setState({ loading: false });
        });
        this.setState({
          edit:null
        })
        
    }
    componentDidMount() {
        this.getSchool();
      }
      getSchool = () => {
        axios.get(`${url}/boshqarma/`).then((res) => {
         
          this.setState({
            school: res.data[0],
           
            loading: false,
          });
        }).catch(err=>{
          console.log(err)
        });
      };
    
     editVideo=(id)=>{
       this.setState({
         edit:id
       })
     }
    deleteVideo=(id)=>{
      var videos=this.state.school.youtube_videos
      videos.splice(id, 1)
      axios
      .patch(`${url}/boshqarma/${1}/`, videos, {

        headers: {
         'Authorization': `Token ${window.localStorage.getItem("token")}`
        }})
      .then((res) => {
       
        this.getSchool();
        message.success("Ma'lumot o'chirildi");
      })
      .catch((err) => {
        message.success("Ma'lumot o'chirildi");
        this.setState({ loading: false });
      });
      
    }
    render() {
        return (
            <div>
                 {
        window.localStorage.getItem('token')?
        this.state.loading? (
          <Loader />
        ) : (<div>
            <div>
                <form  className='formnew'>
                  <h3>{this.state.edit===null?<p>Yangi video qo'shish</p>:<p>Tanlangan videoni almashtirish</p>}</h3>
                    <input type="url" placeholder='Videoni linkini kiriting' id="you" style={{width:'100%', display:'block', fontSize:'20px'}}/>
                <br/>
                <Button type="primary" onClick={this.addVideo} htmlType='button'>Videoni qo'shish</Button>
                </form>
            </div>
            <Row>{
            this.state.school!==null?
            this.state.school.youtube_videos.map((item,key)=>{
                return(
                <Col lg={6} md={12} sm={12} style={{padding:'20px'}}>
               <div className="you_col" >
                <YouTube
            style={{width:'100%', height:'300px'}}
  video={item}                 
  className="you"                
  autoPlay={true}
  muted={true}
  />
  <div className="you_btn">  <Button
            type="primary"
            icon={<EditOutlined style={{position:'relative', top:'-5px'}} />}
          onClick={()=>{this.editVideo(key)}}  
            
          >
            O'zgartirish
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined style={{position:'relative', top:'-5px'}} />}
            onClick={()=>{this.deleteVideo(key)}} 
           
          >
            O'chirish
          </Button></div>
          </div>
                </Col>)
            })
            :''
            }</Row></div>):<Redirect to="/login"/>}
            </div>
        )
    }
}
