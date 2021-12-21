import React, { Component } from "react";
import Loader from "./Loader";
import { Modal, Button } from "antd";
import { Form } from "react-bootstrap";
import ImageDemo from "./ImageDemo";

export default class Documents extends Component {
  state = {
    loading: true,
    show: false,
    file: null,
  };
  openModal = () => {
    this.setState({
      show: true,
    });
  };
  closeModal = () => {
    this.setState({
      show: false,
      image: null,
      imageUrl: null,
      edit: null,
    });
    document.getElementById("formBasicfile").value = "";
    document.getElementById("formBasictext").value = "";
    document.getElementById("formBasictitle").value = "";
  };
  customRequest = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  };
  render() {
    return (
      <div>
        {this.state.loading !== true ? (
          <Loader />
        ) : (
          <div>
            <Button type="primary" onClick={this.openModal}>
              Hujjat qo'shish
            </Button>
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
                    defaultValue={this.state.title}
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
                  controlId="formBasictext"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Label>Hujjat tipi</Form.Label>
                  <br />
                  <Form.Control
                    className="formInput"
                    defaultValue={this.state.textF}
                    name="text"
                    placeholder="Hujjat tipi"
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
                  onClick={this.createNew}
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
