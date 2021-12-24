import { Button, message } from 'antd';
import axios from 'axios';
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import YouTube from "@u-wave/react-youtube";
import { url } from '../host/Host';
import Loader from './Loader';

export default class Youtube extends Component {
    state={
        school:null,
        loading:true
    }
    addVideo =()=>{
        var a=document.getElementById('you').value
        var videos=[a.slice(a.lastIndexOf('/')+1),a.slice(a.lastIndexOf('/')+1)]
        
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
                    <input type="url" placeholder='Videoni linkini kiriting' id="you" style={{width:'100%', display:'block', fontSize:'20px'}}/>
                <br/>
                <Button type="primary" onClick={this.addVideo} htmlType='button'>Videoni qo'shish</Button>
                </form>
            </div>
            <Row>{
            this.state.school!==null?
            this.state.school.youtube_videos.map((item,key)=>{
                return(
                <Col lg={3} md={4} sm={6} style={{padding:'20px'}}>
                <YouTube
            
  video={item}                 
  className="you"                
  
  />
                </Col>)
            })
            :''
            }</Row></div>):<Redirect to="/login"/>}
            </div>
        )
    }
}
