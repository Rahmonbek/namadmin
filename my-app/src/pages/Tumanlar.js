import React, { Component } from "react";
import {
  createTumanlar,
  deleteTumanlar,
  editTumanlar,
  getTumanlar,
} from "../host/Config";
import { Table, Input, Modal, Button, Space, message } from "antd";
import Highlighter from "react-highlight-words";
import { Form } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { url } from "../host/Host";
import axios from "axios";
import ImageDemo from "./ImageDemo";
import GLOBAL from "../host/Global";
import Loader from "./Loader";

export default class Tumanlar extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      Tumanlar: [],
      searchText: "",
      searchedColumn: "",
      textF: "",
      show: false,
      showMatn: false,
      image: null,
      imageUrl: "",
      image_region: null,
      image_regionUrl: "",
      edit: null,
      previewImage: false,
    };
  }

  matnKorish = (text) => {
    this.setState({
      showMatn: true,
      text: text,
    });
  };
  openModal = () => {
    this.setState({
      show: true,
  
    });
    setTimeout(()=>{
this.setState({loading:false})
    }, 2000)
  };

  closeMatn = () => {
    this.setState({
      showMatn: false,
      text: "",
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
      edit: null,
      image: null,
      imageUrl: null,
      image_region: null,
      image_regionUrl: null,
    });
    document.getElementById("formBasicimage").value = "";
    document.getElementById("formBasicimage_region").value = "";
    document.getElementById("formBasicname").value = "";
    document.getElementById("formBasicfull_name").value = "";
    document.getElementById("formBasicvideo").value = "";
    document.getElementById("formBasicphone").value = "";
    document.getElementById("formBasictelegram").value = "";
    document.getElementById("formBasicinstagram").value = "";
    document.getElementById("formBasicfacebook").value = "";
    document.getElementById("formBasicemail").value = "";
    document.getElementById("formBasicyoutube").value = "";
    document.getElementById("formBasicdomain").value = "";
  };
  editTumanlar = (key) => {
    this.setState({
      loading:true
    })
    axios
      .get(`${url}/regions/${key}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
    
        document.getElementById("formBasicname").value = res.data.name;
        document.getElementById("formBasicfull_name").value =
          res.data.full_name;
        document.getElementById("formBasicvideo").value = res.data.video;
        document.getElementById("formBasicphone").value = res.data.phone;
        document.getElementById("formBasictelegram").value = res.data.telegram;
        document.getElementById("formBasicinstagram").value =res.data.instagram;
        document.getElementById("formBasicfacebook").value = res.data.facebook;
        document.getElementById("formBasicemail").value = res.data.email;
        document.getElementById("formBasicyoutube").value = res.data.youtube;
        document.getElementById("formBasicdomain").value = res.data.domain;

        this.setState({
          edit: res.data.id,
          imageUrl: res.data.image,
          previewImage: true,
          image_regionUrl: res.data.image_region,
     
        });
      
      })
      .catch((err) => console.log(err));
    this.openModal();
    
  };
  customRequest1 = (e) => {
    let image = e.target.files[0];

    this.setState({
      image: image,
      imageUrl: image,
      previewImage: false,
    });
  };
  customRequest2 = (e) => {
    let image_region = e.target.files[0];

    this.setState({
      image_region: image_region,
      image_regionUrl: image_region,
      previewImage: false,
    });
  };
  createTumanlar = () => {
    this.setState({
      loading: true,
    });
    let formData = new FormData();
    formData.append(
      "name",
      document.getElementById("formBasicname").value ?? ""
    );
    formData.append(
      "full_name",
      document.getElementById("formBasicfull_name").value ?? ""
    );
   
    formData.append(
      "video",
      document.getElementById("formBasicvideo").value ?? ""
    );
    formData.append(
      "phone",
      document.getElementById("formBasicphone").value ?? ""
    );
    formData.append(
      "telegram",
      document.getElementById("formBasictelegram").value ?? ""
    );
    formData.append(
      "instagram",
      document.getElementById("formBasicinstagram").value ?? ""
    );
    formData.append(
      "facebook",
      document.getElementById("formBasicfacebook").value ?? ""
    );
    formData.append(
      "email",
      document.getElementById("formBasicemail").value ?? ""
    );
    formData.append(
      "youtube",
      document.getElementById("formBasicyoutube").value ?? ""
    );
    formData.append(
      "domain",
      document.getElementById("formBasicdomain").value ?? ""
    );

    if (this.state.edit !== null) {
      if(this.state.image_region!==null){
        formData.append(
          "image_region",
          this.state.image_region ?? ""
        );
      }
      if(this.state.image!==null){
        formData.append(
          "image",
          this.state.image ?? ""
        );
      }
      editTumanlar(formData, this.state.edit)
        .then((res) => {
          message.success("Ma'lumot o'zgartirildi");
          this.getTumanlar();
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          message.error("Ma'lumot o'zgartirilmadi");
        });
      this.getTumanlar();
    } else {
      if(this.state.image_region!==null){
        formData.append(
          "image_region",
          this.state.image_region ?? ""
        );
      }
      if(this.state.image!==null){
        formData.append(
          "image",
          this.state.image ?? ""
        );
      }
      createTumanlar(formData)
        .then((res) => {
          message.success("Ma'lumot saqlandi");
          this.getTumanlar();
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          message.error("Ma'lumot saqlanmadi");
        });
      }
    this.closeModal();
  };
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getTumanlar = () => {
    getTumanlar()
      .then((res) => {
        var Tumanlar = res.data;
        for (let i = 0; i < Tumanlar.length; i++) {
          Tumanlar[i].key = i + 1;
        }
        this.setState({
          Tumanlar: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };
  deleteTumanlar = (id) => {
    this.setState({
      loading: true,
    });
    deleteTumanlar(id)
      .then((res) => {
        message.success("Tadbir o'chirildi");
        this.getTumanlar();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        message.error("Tadbir o'chiirilmadi");
      });
  };
  componentDidMount() {
    this.getTumanlar();
  }
  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "key",
        key: "key",
        ...this.getColumnSearchProps("key"),
      },

      {
        title: "Tuman nomi",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Mudirning F.I.SH",
        dataIndex: "full_name",
        key: "full_name",
        ...this.getColumnSearchProps("full_name"),
      },
      {
        title: "Bolimning rasmi",
        dataIndex: "image_region",
        key: "image_region",
        width: "20%",

        render: (image_region) => {
          return (
            <img src={image_region} style={{ width: "100%" }} alt="rasm" />
          );
        },
      },
      {
        title: "Mudirning rasmi",
        dataIndex: "image",
        key: "image",
        width: "20%",

        render: (image) => {
          return <img src={image} style={{ width: "100%" }} alt="rasm" />;
        },
      },

      {
        title: "Bolimning videosi",
        dataIndex: "video",
        key: "video",
        render: (video) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(video);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Telefon raqam",
        dataIndex: "phone",
        key: "phone",
        render: (phone) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(phone);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Telegram",
        dataIndex: "telegram",
        key: "telegram",
        render: (telegram) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(telegram);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Instagram",
        dataIndex: "instagram",
        key: "instagram",
        render: (instagram) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(instagram);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Facebook",
        dataIndex: "facebook",
        key: "facebook",
        render: (facebook) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(facebook);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (email) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(email);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Youtube",
        dataIndex: "youtube",
        key: "youtube",
        render: (youtube) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(youtube);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Veb sayt",
        dataIndex: "domain",
        key: "domain",
        render: (domain) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(domain);
              }}
            >
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "O'zgartirish",
        dataIndex: "id",
        key: "id",
        render: (id) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.editTumanlar(id);
              }}
            >
              O'zgartirish
            </Button>
          );
        },
      },
      {
        title: "O'chirish",
        dataIndex: "id",
        key: "keyId",
        render: (id) => {
          return (
            <Button
              type="danger"
              onClick={() => {
                this.deleteTumanlar(id);
              }}
            >
              O'chirish
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <div>
            {" "}
            <br />
            <Button type="primary" onClick={this.openModal}>
              Ma'lumot qo'shish
            </Button>
            <br />
            <br />
            <Table columns={columns} dataSource={this.state.Tumanlar} />
            <Modal
              title="To'liq matn"
              visible={this.state.showMatn}
              onCancel={this.closeMatn}
              footer={false}
            >
              <p>{this.state.text}</p>
            </Modal>
            <Modal
              title="Tumanlar"
              visible={this.state.show}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasicname">
                  <Form.Label>Tuman nomi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.name}
                    name="name"
                    required
                    type="text"
                    placeholder="Tuman(shahar) nomi"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicfull_name">
                  <Form.Label>Bo'lim mudiri</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.full_name}
                    name="full_name"
                    required
                    type="text"
                    placeholder="F.I.SH"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicimage_region">
                  <Form.Label>Bo'lim rasmi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.customRequest1}
                    name="image_region"
                    required
                    type="file"
                  />
                  {/* <br />
                  <br /> */}
                  {/* {this.state.previewImage
                    ? ImageDemo(this.state.image_regionUrl)
                    : ""} */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicimage">
                  <Form.Label>Mudirning rasmi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.customRequest2}
                    name="image"
                    required
                    type="file"
                  />
                  {/* <br />
                  <br />
                  {this.state.previewImage
                    ? ImageDemo(this.state.imageUrl)
                    : ""} */}
                </Form.Group>

                <Form.Group controlId="formBasicvideo" className="mb-3">
                  <Form.Label>Bo'lim videosi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="video"
                    placeholder="https://youtu.be/L-QGQQoPf-Y"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicphone" className="mb-3">
                  <Form.Label>Telefon raqam</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="phone"
                    placeholder="998971665432"
                  />
                </Form.Group>
                <Form.Group controlId="formBasictelegram" className="mb-3">
                  <Form.Label>Telegram manzil</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="telegram"
                    placeholder="http://t.me/namvxtb.uz"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicinstagram" className="mb-3">
                  <Form.Label>Instagram manzil</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="instagram"
                    placeholder="https://www.instagram.com/namangan/"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicfacebook" className="mb-3">
                  <Form.Label>Facebook manzil</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="facebook"
                    placeholder="https://www.facebook.com/namangan/"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicemail">
                  <Form.Label>Email manzil</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="aahmadov271101@gmail.com"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicyoutube" className="mb-3">
                  <Form.Label>Youtube manzil</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="youtube"
                    placeholder="https://www.youtube.com/channel/UC4vQC9mOo5B6_imRFUA62Xg"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicdomain" className="mb-3">
                  <Form.Label>Bo'limning veb sayti </Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="domain"
                    placeholder="Bo'lim veb saytini kiritng"
                  />
                </Form.Group>

                <br />
                <br />
                <Button
                  type="danger"
                  htmlType="button"
                  onClick={this.closeModal}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={this.createTumanlar}
                >
                  Yaratish
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
