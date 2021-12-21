import React, { Component } from "react";
import Loader from "./Loader";
import { Modal, Select, Button, Input, Space, Table } from "antd";
import { Form } from "react-bootstrap";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default class Documents extends Component {
  state = {
    loading: true,
    show: false,
    title: "",
    type: "Shartnoma",
    file: null,
    searchText: "",
    searchedColumn: "",
    files: [
      {
        id: 1,
        title: "Shartnoma",
        file: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        type: "Shartnoma",
      },
      {
        id: 2,
        title: "Qonun",
        file: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        type: "Qonunchilik",
      },
      {
        id: 3,
        title: "Sertifikat",
        file: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        type: "Sertifikat",
      },
    ],
  };

  filterFiles = (documents) => {
    var files = documents;
    for (let i = 0; i < files.length; i++) {
      files[i].key = i + 1;
    }
    this.setState({ files });
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

  openModal = () => {
    this.setState({
      show: true,
    });
  };

  closeModal = () => {
    this.setState({
      show: false,
      type: "Shartnoma",
      file: null,
      title: "",
    });
  };

  customRequest = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  createDocument = () => {
    console.log(this.state.type, this.state.title, this.state.file);
  };

  componentDidMount() {
    this.filterFiles(this.state.files);
  }

  render() {
    const columns = [
      {
        title: "T/r",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Hujjat nomi",
        dataIndex: "title",
        key: "title",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Hujjat turi",
        dataIndex: "type",
        key: "type",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Hujjat fayli",
        dataIndex: "file",
        key: "file",
        render: (file) => {
          return (
            <Button type="primary" href={file} icon={<EyeOutlined />}>
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "O'zgartirish",
        dataIndex: "key",
        key: "key",
        render: (key) => {
          return (
            <Button type="primary" icon={<EditOutlined />}>
              O'zgartirish
            </Button>
          );
        },
      },
      {
        title: "O'chirish",
        dataIndex: "key",
        key: "key",
        render: (key) => {
          return (
            <Button type="danger" icon={<DeleteOutlined />}>
              O'chirish
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        {this.state.loading !== true ? (
          <Loader />
        ) : (
          <div>
            <Button type="primary" onClick={this.openModal}>
              Hujjat qo'shish
            </Button>
            <br />
            <br />
            <Modal
              title="Hujjat"
              visible={this.state.show}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Hujjat nomi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    name="title"
                    required
                    type="text"
                    placeholder="Hujjat nomi"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicfile">
                  <Form.Label>Hujjat fayli</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept="application/pdf"
                    onChange={this.customRequest}
                    name="file"
                    required
                    type="file"
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasictype"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Hujjat turi</Form.Label>
                  <br />
                  <Select
                    value={this.state.type}
                    onSelect={(value) => this.setState({ type: value })}
                    style={{ width: "100%" }}
                  >
                    <option value="Shartnoma">Shartnoma</option>
                    <option value="Qonunchilik">Qonunchilik</option>
                    <option value="Sertifikat">Sertifikat</option>
                  </Select>
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
                  onClick={this.createDocument}
                >
                  Yaratish
                </Button>
              </Form>
            </Modal>
            <Table columns={columns} dataSource={this.state.files} />
          </div>
        )}
      </div>
    );
  }
}
