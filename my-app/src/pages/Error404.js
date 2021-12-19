import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import  style  from '../css/Error404.module.css'
export default class Error404 extends Component {
  render() {
    return (
      <><div style={{marginTop:'15%'}}>
  <h1>404 xatolik ro`y berdi</h1>
<p className={style.zoomarea}>
    <b>Bizda</b> hech qanday ma`lumot topilmadi.</p>
<section className={style.errorcontainer}>
  <span><span>4</span></span>
  <span>0</span>
  <span><span>4</span></span>
</section>
<div className={style.linkcontainer}>
<Button variant="primary" >Bosh sahifaga qaytish</Button>
</div></div>
      </>
    )
  }
}