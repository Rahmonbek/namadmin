import React, { Component} from 'react';
import styles from '../css/Menu.module.css'
import {BiBasketball} from 'react-icons/bi'
import {FiUsers} from 'react-icons/fi'
import {FaCrown,FaRegCalendarAlt,FaRegNewspaper} from 'react-icons/fa'
import {CgBowl} from 'react-icons/cg'
import { Menu } from 'antd';
import GLOBAL from '../host/Global'
import {Link,Redirect} from'react-router-dom'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  UserOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';

class Navbar extends Component {
  state = {
      collapsed: false,
    };
    toggleCollapsed = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
      

    };
    componentDidMount() {
      window.addEventListener("resize", this.resize.bind(this));
      this.resize();
  }
  
  resize() {
    if(window.innerWidth<=767){
      this.setState({
        collapsed:true
      })
    }else{
      this.setState({
        collapsed:false
      })
    }
  }
  
  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }
  render() {
      const { SubMenu } = Menu;
      return ( window.localStorage.getItem('token') !== null ?          <div style={{height:'100%'}}>
      <Menu
        id="menu1"
        style={{color:'black',height:'100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={this.state.collapsed}
      >
        <Menu.Item danger={true} key="1" icon={<PieChartOutlined />} className={styles.menuitem} theme='light'>Dashboard</Menu.Item>
        <Menu.Item key="2" icon={<FaRegNewspaper />}><Link to="/dashboard/yangiliklar/uz">Yangiliklar</Link></Menu.Item>
        <Menu.Item key="3" icon={<CarryOutOutlined />}>Tadbirlar</Menu.Item>       
       <Menu.Item key="8" icon={<FiUsers/>}><Link to="/dashboard/rahbariyat/uz">Rahbariyat</Link></Menu.Item>
        <Menu.Item key="9" icon={<FaCrown />}>A'lochi o'quvchilar</Menu.Item>
        <Menu.Item key="10" icon={<FaRegCalendarAlt/>}><Link to="/dashboard/darsjadvali/uz">Dars jadvali</Link></Menu.Item>
        <Menu.Item key="11" icon={<CgBowl/>}><Link to="/dashboard/maktaboshxona/uz">Maktab oshxonasi</Link></Menu.Item>
        </Menu>
          </div> : <Redirect to="/login"/>
      );
  }
}

export default Navbar;