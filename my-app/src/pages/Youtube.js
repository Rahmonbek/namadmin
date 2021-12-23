import axios from 'axios';
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import YouTube from 'react-youtube';
import { url } from '../host/Host';
import Loader from './Loader';

export default class Youtube extends Component {
    state={
        school:null,
        loading:true
    }
    
    componentDidMount() {
        this.getSchool();
      }
      getSchool = () => {
        axios.get(`${url}/boshqarma/`).then((res) => {
         console.log(res.data[0].params)
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
        this.state.loading === true ? (
          <Loader />
        ) : (<div><Row>{
            this.state.school!==null?
            this.state.school.youtube_videos.map((item,key)=>{
                return(<Col lg={4} md={6} sm={12}>
                <YouTube
  video={item.slice(item.lastIndexOf('/'))}                  // defaults -> null
  id={String(key)}                       // defaults -> null
  className="you"                // defaults -> null
  opts={{
    playerVars: {
      rel: 0,
    },
  }}
  autoplay={true}
  muted={true}
  />
                </Col>)
            })
            :''
            }</Row></div>):<Redirect to="/login"/>}
            </div>
        )
    }
}
