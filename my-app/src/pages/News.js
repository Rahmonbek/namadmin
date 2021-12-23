import React, { Component } from "react";
import {
  createYangilik,
  deleteYangilik,
  editYangilik,
  getYangilik,
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

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      Yangilik: [],
      searchText: "",
      searchedColumn: "",
      textF: "",
      show: false,
      showMatn: false,
      image: null,
      imageUrl: "",
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
      date: [],
      time: [],
    });
    document.getElementById("formBasicimage").value = "";
    document.getElementById("formBasictext").value = "";
    document.getElementById("formBasictitle").value = "";
  };
  editYangilik = (key) => {
    axios
      .get(`${url}/news/${key}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("formBasictext").value = res.data.text;
        document.getElementById("formBasictitle").value = res.data.title;

        document.getElementById("formBasicdate").value = res.data.date;

        this.setState({
          edit: res.data.id,
          imageUrl: res.data.image,
          previewImage: true,
        });
      })
      .catch((err) => console.log(err));
    this.openModal();
  };
  customRequest = (e) => {
    let image = e.target.files[0];

    this.setState({
      image: image,
      imageUrl: image,
      previewImage: false,
    });
  };
  createYangilik = () => {
    this.setState({
      loading: true,
    });
    let formData = new FormData();
    formData.append(
      "title",
      document.getElementById("formBasictitle").value ?? ""
    );

    formData.append(
      "date",
      document.getElementById("formBasicdate").value ?? ""
    );

    formData.append(
      "text",
      document.getElementById("formBasictext").value ?? ""
    );

    if (this.state.edit !== null) {
      if (this.state.image !== null) {
        formData.append("image", this.state.image ?? "");
      }
      editYangilik(formData, this.state.edit)
        .then((res) => {
          message.success("Yangilik o'zgartirildi");
          this.getYangilik();
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          message.error("Yangilik o'zgartirilmadi");
        });
      this.getYangilik();
    } else {
      formData.append("image", this.state.image ?? "");
      createYangilik(formData)
        .then((res) => {
          message.success("Yangilik saqlandi");
          this.getYangilik();
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
          message.error("Yangilik saqlanmadi");
        });
      this.getYangilik();
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

  getYangilik = () => {
    getYangilik()
      .then((res) => {
        var Yangilik = res.data;
        for (let i = 0; i < Yangilik.length; i++) {
          Yangilik[i].key = i + 1;
        }
        this.setState({
          Yangilik: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };
  deleteYangilik = (id) => {
    this.setState({
      loading: true,
    });
    deleteYangilik(id)
      .then((res) => {
        message.success("Yangilik o'chirildi");
        this.getYangilik();
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        message.error("Yangilik o'chiirilmadi");
      });
  };
  componentDidMount() {
    this.getYangilik();
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
        title: "Rasm",
        dataIndex: "image",
        key: "image",
        width: "20%",

        render: (image) => {
          return <img src={image} style={{ width: "100%" }} alt="rasm" />;
        },
      },
      {
        title: "Yangilik nomi",
        dataIndex: "title",
        key: "title",
        ...this.getColumnSearchProps("title"),
      },

      {
        title: "Sanasi",
        dataIndex: "date",
        key: "date",
        ...this.getColumnSearchProps("date"),
      },

      {
        title: "Yangilik matni",
        dataIndex: "text",
        key: "text",
        render: (text) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.matnKorish(text);
              }}
            >
              Matnni ko'ring
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
                this.editYangilik(id);
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
                this.deleteYangilik(id);
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
              Yangilik yaratish
            </Button>
            <br />
            <br />
            <Table columns={columns} dataSource={this.state.Yangilik} />
            <Modal
              title="Yangilik matni"
              visible={this.state.showMatn}
              onCancel={this.closeMatn}
              footer={false}
            >
              <p>{this.state.text}</p>
            </Modal>
            <Modal
              title="Yangilik"
              visible={this.state.show}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Yangilik sarlavhasi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.title}
                    name="title"
                    required
                    type="text"
                    placeholder="Yangilik sarlavhasi"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicdate">
                  <Form.Label>Yangilik sanasi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.date}
                    name="date"
                    required
                    type="date"
                    placeholder="mm/dd/yy"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicimage">
                  <Form.Label>Yangilik rasmi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.customRequest}
                    name="image"
                    required
                    type="file"
                  />
                  <br />
                  <br />
                  {this.state.previewImage
                    ? ImageDemo(this.state.imageUrl)
                    : ""}
                </Form.Group>

                <Form.Group
                  controlId="formBasictext"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Yangilik matni</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    as="textarea"
                    name="text"
                    placeholder="Yangilik matnini yozing"
                    style={{ height: "200px" }}
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
                  onClick={this.createYangilik}
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
