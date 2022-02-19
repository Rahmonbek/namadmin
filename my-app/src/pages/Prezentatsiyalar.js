import React, { Component } from "react";
import Loader from "./LoaderHome";
import { Table, Input, Modal, Button, Space, message, Select } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Form } from "react-bootstrap";
import {
  createPrezentatsiyalar,
  deletePrezentatsiyalar,
  editPrezentatsiyalar,
  getPrezentatsiyalar,
  getTumanlar,
} from "../host/Config";
const { Option } = Select;

export class Prezentatsiyalar extends Component {
  state = {
    loading: true,
    searchText: "",
    searchedColumn: "",
    prezentatsiyalar: [],
    tumanlar: [],
    show: false,
    file: null,
    name: "",
    selectKey: 0,
    editId: null,
    download: 0,
    keyId: null,
  };

  openModal = () => {
    this.setState({
      show: true,
      loader: false,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
      editId: null,
      download: 0,
      keyId: null,
      name: "",
      selectKey: 0,
      file: null,
    });
  };

  getPrezentatsiyalar = () => {
    this.closeModal();
    getPrezentatsiyalar()
      .then((res) => {
        var prezentatsiyalar = res.data;
        for (let i = 0; i < prezentatsiyalar.length; i++) {
          prezentatsiyalar[i].key = i + 1;
        }
        this.setState({ prezentatsiyalar: prezentatsiyalar, loader: false });
      })
      .catch((err) => message.error("Prezentatsiyalar topilmadi!"));
  };

  getTuman = () => {
    getTumanlar()
      .then((res) => this.setState({ tumanlar: res.data }))
      .catch((err) => message.error("Tumanlar mavjud emas!"));
  };

  savePrezentatsiyalar = () => {
    this.setState({ loader: true });
    var data = new FormData();
    if (this.state.editId === null) {
      if (this.state.name === "") {
        return message.error("Prezentatsiya nomini kiriting");
      }
      if (this.state.file === null) {
        return message.error("Prezentatsiya faylini kiriting");
      }
      data.append("name", this.state.name);
      data.append("file", this.state.file);
      data.append("download", this.state.download);
      data.append(
        "region",
        this.state.selectKey !== 0 ? this.state.selectKey : null
      );
      createPrezentatsiyalar(data)
        .then((res) => {
          message.success("Ma'lumot saqlandi");
          this.getPrezentatsiyalar();
          this.closeModal();
        })
        .catch((err) => {
          message.error("Ma'lumot saqlanmadi!");
          this.setState({ loader: false });
        });
    } else {
      if (
        this.state.name !== this.state.prezentatsiyalar[this.state.keyId].name
      ) {
        data.append("name", this.state.name);
      }
      if (
        this.state.file !== this.state.prezentatsiyalar[this.state.keyId].file
      ) {
        data.append("file", this.state.file);
      }
      if (
        this.state.download !==
        this.state.prezentatsiyalar[this.state.keyId].download
      ) {
        data.append("download", this.state.download);
      }
      if (
        this.state.selectKey !==
        this.state.prezentatsiyalar[this.state.keyId].region
      ) {
        data.append(
          "region",
          this.state.selectKey !== 0 ? this.state.selectKey : null
        );
      }
      editPrezentatsiyalar(data, this.state.editId)
        .then((res) => {
          message.success("Ma'lumot o'zgartirildi");

          this.getPrezentatsiyalar();
        })
        .catch((err) => {
          message.error("Ma'lumot o'zgartirilmadi!");
          this.setState({ loader: false });
        });
    }
  };

  editPrezentatsiyalar = (id) => {
    this.setState({
      editId: this.state.prezentatsiyalar[id].id,
      keyId: id,
      loader: true,
      name: this.state.prezentatsiyalar[id].name,
      file: this.state.prezentatsiyalar[id].file,
      download:
        this.state.prezentatsiyalar[id].download !== null
          ? this.state.prezentatsiyalar[id].download
          : 0,
      selectKey:
        this.state.prezentatsiyalar[id].region !== null
          ? this.state.prezentatsiyalar[id].region
          : 0,
    });
    this.openModal();
  };

  deletePrezentatsiyalar = (id) => {
    this.setState({ loader: true });
    deletePrezentatsiyalar(id)
      .then((res) => {
        message.success("Ma'lumot o'chirildi");
        this.getPrezentatsiyalar();
      })
      .catch((err) => {
        message.error("Ma'lumot o'chirilmadi!");
        this.setState({ loader: false });
      });
  };

  changeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
  };

  selectedKey = (e) => {
    this.setState({ selectKey: e });
  };

  filterRegion = (id) => {
    var tuman = "";
    if (id !== null) {
      this.state.tumanlar.map((item) => {
        if (item.id === id) {
          tuman = item.name;
        }
      });
      return tuman;
    } else {
      return "Boshqarma";
    }
  };

  componentDidMount() {
    this.getPrezentatsiyalar();
    this.getTuman();
  }

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

  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "key",
        key: "key",
        ...this.getColumnSearchProps("key"),
      },
      {
        title: "Prezentatsiya nomi",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },

      {
        title: "Yuklab olish",
        dataIndex: "file",
        key: "file",
        render: (file) => {
          return (
            <Button type="primary" icon={<DownloadOutlined />}>
              <a
                href="#1"
                download={`${file.slice(file.lastIndexOf("/") + 1)}`}
                style={{ color: "white", paddingLeft: 5 }}
              >
                Yuklab olish
              </a>
            </Button>
          );
        },
      },
      {
        title: "O'zgartirish",
        dataIndex: "key",
        key: "editKey",
        render: (key) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.editPrezentatsiyalar(key - 1);
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
                this.deletePrezentatsiyalar(id);
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
        {this.state.loader ? (
          <>
            <Loader />
          </>
        ) : (
          <div>
            <Button type="primary" onClick={this.openModal}>
              Prezentatsiya qo'shish
            </Button>
            <br />
            <br />
            <Table columns={columns} dataSource={this.state.prezentatsiyalar} />
            <Modal
              title="Prezentatsiya"
              visible={this.state.show}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Prezentatsiya nomi</Form.Label>
                  <Form.Control
                    className="formInput"
                    onChange={this.changeName}
                    value={this.state.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Prezentatsiya fayli</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, .zip, .rar, .rar4"
                    onChange={this.changeFile}
                    type="file"
                    id="file"
                  />
                </Form.Group>

                <br />
                <br />
                <Button
                  type="primary"
                  onClick={this.savePrezentatsiyalar}
                  style={{ marginRight: 10 }}
                >
                  Saqlash
                </Button>
                <Button type="danger" onClick={this.closeModal}>
                  Bekor qilish
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Prezentatsiyalar;
