import React, { useState, useEffect } from "react";
import "./css/sidebar.css";
import { Switch, Link } from "react-router-dom";
import RouteWithSubRoutes from "./utils/RouteWithSubRoutes";
import styles from "./css/Menu.module.css";

import {
  FaCrown,
  FaComments,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Top from "./pages/Top";
import { Container, Row, Col } from "react-bootstrap";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { BiNews } from "react-icons/bi";
import { FaRibbon } from "react-icons/fa";
import { isArray } from "lodash";
import GLOBAL from "./host/Global";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "./pages/LoaderHome";
import { url } from "./host/Host";
const Home = ({ routes }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);
  const menu = [
    {
      id: 1,
      path: "/home/dashboard/uz", // the url
      name: "Dashboard",
      icon: <AppstoreOutlined />, // name that appear in Sidebar
    },
    // { id: 2, path: "/home/admin/uz", name: "Maktab", icon: <UserOutlined /> },
    {
      id: 3,
      path: "/home/yangiliklar/uz",
      name: "Yangiliklar",
      icon: <BiNews />,
    },
    {
      id: 4,
      path: "/home/tadbirlar/uz",
      name: "Tadbirlar",
      icon: <FaRibbon />,
    },
  
   
    {
      id: 18,
      path: "/home/murojaatlar/uz",
      name: "Murojaatlar",
      icon: <FaComments />,
    },
    ];
  useEffect(() => {
    window.addEventListener("resize", resize.bind(this));
    resize();
    axios.get(`${url}/school-by-admin/${GLOBAL.user}`).then((res) => {
      setSchool(res.data);
      setLoading(true);
    });
  }, []);

  const resize = () => {
    if (window.innerWidth <= 767) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  return window.localStorage.getItem('token') !== null ? (
    <div>
      {loading === false ? (
        <Loader />
      ) : (
        <div>
          <Container fluid style={{ padding: "0", position: "relative" }}>
            <Row>
              <Col lg={12} style={{ position: "sticky" }}>
                <Row>
                  <Col xl={2} lg={3} md={4} sm={2} xs={2}>
                    <div
                      style={{
                        position: "sticky",
                        top: "0px",
                        height: "100vh",
                        boxShadow:
                          "0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%)",
                        zIndex: "10000000",
                      }}
                    >
                      
                      <div className={styles.topMenu}>
                   
                        <span className={styles.crown}>
                          <FaCrown style={{ fontSize: "30px" }} />
                        </span>
                      </div>
                      <Menu
                        style={{
                          overflowY: "scroll",
                          height: "90%",
                          overflowX: "hidden",
                          marginTop: "0",
                        }}
                        className={styles.Menyusidebar}
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        mode="inline"
                        inlineCollapsed={collapsed}
                      >
                        {menu && isArray(menu)
                          ? menu.map((item) => {
                              return (
                                <Menu.Item
                                  key={item.id}
                                  icon={item.icon}
                                  className={styles.menuitem}
                                >
                                  <Link to={item.path}>{item.name}</Link>
                                </Menu.Item>
                              );
                            })
                          : ""}
                      </Menu>
                    </div>
                  </Col>
                  <Col
                    xl={10}
                    lg={9}
                    md={8}
                    sm={10}
                    xs={10}
                    style={{ padding: "0" }}
                  >
                    <Row>
                      <Col
                        lg={12}
                        style={{
                          padding: "0",
                          position: "sticky",
                          top: "0px",
                          zIndex: "100000",
                        }}
                      >
                   <Top/>
                      </Col>
                      <Col
                        lg={12}
                        style={{ padding: "40px", overflowY: "scroll" }}
                      >
                        <Switch>
                          {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                          ))}
                        </Switch>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
