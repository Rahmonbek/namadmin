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

export default class Tumanlar extends Component {
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
        title: "Chortoq",
        Name: "Rahmon Ismoilov",
        Img: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        bulimvideosi:
          "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        bulimImg:
          "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        telegram: "telegram",
        instagram: "instagram",
        facebook: "facebook",
        youtube: "youtube",
        file: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        type: "Shartnoma",
      },
      {
        id: 2,
        title: "Mimgbuloq",
        Name: "Rahmon Ismoilov",
        Img: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        bulimvideosi:
          "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        bulimImg:
          "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        telegram: "telegram",
        instagram: "instagram",
        facebook: "facebook",
        youtube: "youtube",
        file: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        type: "Shartnoma",
      },
      {
        id: 3,
        title: "Namangan",
        Name: "Rahmon Ismoilov",
        Img: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        bulimvideosi:
          "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        bulimImg:
          "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        telegram: "telegram",
        instagram: "instagram",
        facebook: "facebook",
        youtube: "youtube",
        file: "https://staff.tiiame.uz/storage/users/14/presentations/xeiF6kKGT1NUUNhjhST2w6AP2xlkpUNr1WkEvU4Z.pdf",
        type: "Shartnoma",
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
        title: "Tuman nomi",
        dataIndex: "title",
        key: "title",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Mudirning F.I.SH",
        dataIndex: "Name",
        key: "Name",
        ...this.getColumnSearchProps("Name"),
      },
      {
        title: "Mudirning rasmi",
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
        title: "Bo'limning videosi",
        dataIndex: "bulimvideosi",
        key: "bulimvideosi",
        render: (bulimvideosi) => {
          return (
            <Button type="primary" href={bulimvideosi} icon={<EyeOutlined />}>
              Ko'rish
            </Button>
          );
        },
      },
      {
        title: "Bo'limning rasmi",
        dataIndex: "bulimImg",
        key: "bulimImg",
        render: (bulimImg) => {
          return (
            <Button type="primary" href={bulimImg} icon={<EyeOutlined />}>
              Ko'rish
            </Button>
          );
        },
      },

      {
        title: "Telegram",
        dataIndex: "telegram",
        key: "telegram",
        ...this.getColumnSearchProps("telegram"),
      },
      {
        title: "Instagram",
        dataIndex: "instagram",
        key: "instagram",
        ...this.getColumnSearchProps("instagram"),
      },
      {
        title: "Facebook",
        dataIndex: "facebook",
        key: "facebook",
        ...this.getColumnSearchProps("facebook"),
      },
      {
        title: "Youtube",
        dataIndex: "youtube",
        key: "youtube",
        ...this.getColumnSearchProps("youtube"),
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
              Ma'lumot qo'shish
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
                  <Form.Label>Tuman nomi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    name="title"
                    required
                    type="text"
                    placeholder="Tuman(shahar) nomi"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Bo'lim mudiring F.I.SH</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    name="title"
                    required
                    type="text"
                    placeholder="F.I.SH"
                  />
                  <Form.Group className="mb-3" controlId="formBasicfile">
                    <Form.Label>Mudirning rasmini kiriting</Form.Label>
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
                  <Form.Group className="mb-3" controlId="formBasicfile">
                    <Form.Label>Bo'lim videosi</Form.Label>
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
                  <Form.Group className="mb-3" controlId="formBasicfile">
                    <Form.Label>Bo'lim rasmi</Form.Label>
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Telegram manzil</Form.Label>
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
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Instagram manzil</Form.Label>
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
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Facebook manzil</Form.Label>
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
                <Form.Group className="mb-3" controlId="formBasictitle">
                  <Form.Label>Youtube manzil</Form.Label>
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
