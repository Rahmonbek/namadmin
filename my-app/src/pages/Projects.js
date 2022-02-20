import React, { Component } from "react";
import Loader from "./LoaderHome";
import { Table, Input, Modal, Button, Space, message, Select } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Form } from "react-bootstrap";
import {
  createProjects,
  deleteComments,
  deleteProjects,
  editProjects,
  getComments,
  getProjects,
  getTumanlar,
} from "../host/Config";
const { Option } = Select;

export class Projects extends Component {
  state = {
    loading: true,
    searchText: "",
    searchedColumn: "",
    projects: [],
    comments: [],
    comment: null,
    tumanlar: [],
    show: false,
    file: null,
    name: "",
    selectKey: 0,
    editId: null,
    download: 0,
    keyId: null,
    commentId: null,
    showComment: false,
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

  openCommentModal = (id) => {
    this.setState({
      showComment: true,
      commentId: id,
    });
    this.filterComments(this.state.comments, id);
  };

  closeCommentModal = () => {
    this.setState({ showComment: false, commentId: null });
  };

  getProject = () => {
    this.closeModal();
    getProjects()
      .then((res) => {
        var projects = res.data;
        for (let i = 0; i < projects.length; i++) {
          projects[i].key = i + 1;
        }
        this.setState({ projects: projects, loader: false });
      })
      .catch((err) => message.error("Loyihalar topilmadi!"));
  };

  getComment = () => {
    getComments().then((res) => {
      this.setState({ comments: res.data });
      if (this.state.commentId !== null) {
        this.filterComments(res.data, this.state.commentId);
      }
    });
  };

  getTuman = () => {
    getTumanlar()
      .then((res) => this.setState({ tumanlar: res.data }))
      .catch((err) => message.error("Tumanlar mavjud emas!"));
  };

  saveProject = () => {
    this.setState({ loader: true });
    var data = new FormData();
    if (this.state.editId === null) {
      if (this.state.name === "") {
        return message.error("Loyiha nomini kiriting");
      }
      if (this.state.file === null) {
        return message.error("Loyiha faylini kiriting");
      }
      data.append("name", this.state.name);
      data.append("file", this.state.file);
      data.append("download", this.state.download);
      data.append(
        "region",
        this.state.selectKey !== 0 ? this.state.selectKey : null
      );
      createProjects(data)
        .then((res) => {
          message.success("Ma'lumot saqlandi");
          this.getProject();
          this.closeModal();
        })
        .catch((err) => {
          message.error("Ma'lumot saqlanmadi!");
          this.setState({ loader: false });
        });
    } else {
      if (this.state.name !== this.state.projects[this.state.keyId].name) {
        data.append("name", this.state.name);
      }
      if (this.state.file !== this.state.projects[this.state.keyId].file) {
        data.append("file", this.state.file);
      }
      if (
        this.state.download !== this.state.projects[this.state.keyId].download
      ) {
        data.append("download", this.state.download);
      }
      if (
        this.state.selectKey !== this.state.projects[this.state.keyId].region
      ) {
        data.append(
          "region",
          this.state.selectKey !== 0 ? this.state.selectKey : null
        );
      }
      editProjects(data, this.state.editId)
        .then((res) => {
          message.success("Ma'lumot o'zgartirildi");

          this.getProject();
        })
        .catch((err) => {
          message.error("Ma'lumot o'zgartirilmadi!");
          this.setState({ loader: false });
        });
    }
  };

  editProject = (id) => {
    this.setState({
      editId: this.state.projects[id].id,
      keyId: id,
      loader: true,
      name: this.state.projects[id].name,
      file: this.state.projects[id].file,
      download:
        this.state.projects[id].download !== null
          ? this.state.projects[id].download
          : 0,
      selectKey:
        this.state.projects[id].region !== null
          ? this.state.projects[id].region
          : 0,
    });
    this.openModal();
  };

  deleteProject = (id) => {
    this.setState({ loader: true });
    deleteProjects(id)
      .then((res) => {
        message.success("Ma'lumot o'chirildi");
        this.getProject();
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

  changeDownload = (e) => {
    this.setState({ download: e.target.value });
  };

  selectedKey = (e) => {
    this.setState({ selectKey: e });
  };

  deleteComment = (id) => {
    this.setState({ loader: true });
    deleteComments(id)
      .then((res) => {
        this.getComment();
        setTimeout(() => {
          message.success("Izoh o'chirildi");
          this.setState({ loader: false });
        }, 1500);
      })
      .catch((err) => {
        this.setState({ loader: false });
        message.error("Izoh o'chirilmadi!");
      });
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

  filterComments = (comments, id) => {
    var comment = [];
    comments.map((item) => {
      if (item.project === id) {
        comment.push(item);
      }
    });
    for (let i = 0; i < comment.length; i++) {
      comment[i].key = i + 1;
    }
    this.setState({ comment: comment });
  };

  filterCommentsNumber = (comments, id) => {
    var number = 0;
    comments.map((item) => {
      if (item.project === id) {
        number++;
      }
    });
    return number;
  };

  componentDidMount() {
    this.getProject();
    this.getTuman();
    this.getComment();
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
    const comments = [
      {
        title: "T/r",
        dataIndex: "key",
        key: "key",
        ...this.getColumnSearchProps("key"),
      },
      {
        title: "Izoh qoldiruvchi ismi",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Izoh qoldiruvchi elektron pochtasi",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Izoh",
        dataIndex: "comment",
        key: "comment",
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
                this.deleteComment(id);
              }}
            >
              O'chirish
            </Button>
          );
        },
      },
    ];
    const columns = [
      {
        title: "Id",
        dataIndex: "key",
        key: "key",
        ...this.getColumnSearchProps("key"),
      },
      {
        title: "Loyiha nomi",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Tuman(Shahar) nomi",
        dataIndex: "region",
        key: "region",
        render: (region) => {
          return this.filterRegion(region);
        },
      },
      {
        title: "Yuklab olinganla soni",
        dataIndex: "download",
        key: "download",
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
        title: "Izohlar (soni)",
        dataIndex: "id",
        key: "id",
        render: (id) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.openCommentModal(id);
              }}
            >
              Izohlar ({this.filterCommentsNumber(this.state.comments, id)})
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
                this.editProject(key - 1);
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
                this.deleteProject(id);
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
              Loyiha qo'shish
            </Button>
            <br />
            <br />
            <Table columns={columns} dataSource={this.state.projects} />
            <Modal
              title="Loyiha"
              visible={this.state.show}
              onCancel={this.closeModal}
              footer={false}
            >
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Loyiha nomi</Form.Label>
                  <Form.Control
                    className="formInput"
                    onChange={this.changeName}
                    value={this.state.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Loyiha fayli</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, .zip, .rar, .rar4"
                    onChange={this.changeFile}
                    type="file"
                    id="file"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tumanni tanlang</Form.Label>
                  <Select
                    className="formInput"
                    style={{ display: "block", width: "100%", padding: 0 }}
                    onSelect={this.selectedKey}
                    value={`${this.state.selectKey}`}
                  >
                    <Option key={"0"}>Boshqarmani loyihasi</Option>
                    {this.state.tumanlar.map((item) => {
                      return <Option key={`${item.id}`}>{item.name}</Option>;
                    })}
                  </Select>
                </Form.Group>
                {this.state.editId !== null ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Loyiha yuklab olish soni</Form.Label>
                    <Form.Control
                      className="formInput"
                      onChange={this.changeDownload}
                      value={this.state.download}
                      type="number"
                      min="0"
                    />
                  </Form.Group>
                ) : (
                  ""
                )}
                <br />
                <br />
                <Button
                  type="primary"
                  onClick={this.saveProject}
                  style={{ marginRight: 10 }}
                >
                  Saqlash
                </Button>
                <Button type="danger" onClick={this.closeModal}>
                  Bekor qilish
                </Button>
              </Form>
            </Modal>
            <Modal
              title="Izohlar"
              visible={this.state.showComment}
              onCancel={this.closeCommentModal}
              footer={false}
              width="70%"
            >
              <Table columns={comments} dataSource={this.state.comment} />
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Projects;
