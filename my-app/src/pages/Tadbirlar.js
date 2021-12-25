import React, { Component } from 'react'
import { createEvent, deleteEvent, editEvent, getEvents } from '../host/Config'
import { Table, Input, Modal, Button, Space, message,  } from 'antd';
import Highlighter from 'react-highlight-words';
import {Form} from 'react-bootstrap'
import { SearchOutlined } from '@ant-design/icons';
import {  url } from '../host/Host';
import axios from 'axios';
import ImageDemo from './ImageDemo';
import GLOBAL from "../host/Global";
import Loader from './Loader';

export default class Tadbirlar extends Component {
  constructor(){
    super();
    this.state={
      loading:true,
        events:[],
        searchText: '',
        searchedColumn: '',
        textF:'',
        show:false,
        showMatn:false,
        image: null,
        imageUrl: '',
        edit: null,
        previewImage: false,
    }
  }

  matnKorish=(text)=>{
      this.setState({
showMatn:true,
text:text
      })
  }
  openModal=()=>{
    this.setState({
        show:true,
       })  
      setTimeout(()=>{
        this.setState({loading:false})
      },2000)
  }

  closeMatn=()=>{
      this.setState({
          showMatn:false,
          text:''
      })
  }
  
  closeModal=()=>{
    this.setState({
        show:false,
        edit: null,
        image: null,
        imageUrl: null,
        date:[],
        time:[]
    }) 
    document.getElementById('formBasicimage').value=""
    document.getElementById('formBasictext').value=""
    document.getElementById('formBasictitle').value=""
}
editEvent=(key)=>{
  this.setState({loading:true})
  axios.get(`${url}/events/${key}`, {

    headers: {
      "Content-type": "application/json; charset=UTF-8",
     'Authorization': `Token ${window.localStorage.getItem("token")}`
    }}).then((res)=>{ 
  
    document.getElementById('formBasictext').value = res.data.text; 
    document.getElementById('formBasictitle').value = res.data.title;
    document.getElementById('formBasicaddress').value = res.data.address;
    document.getElementById('formBasicdate').value = res.data.date;
    document.getElementById('formBasictime').value = res.data.time;
    this.setState({
      edit: res.data.id,
      imageUrl: res.data.image,
      previewImage: true,
      
    }) 
  }).catch(err=>console.log(err))
  this.openModal()
}
customRequest = (e) => {

  let image = e.target.files[0];

  this.setState({
    image:image,
    imageUrl: image, 
    previewImage: false
  })
};
createEvent=()=>{
  this.setState({
    loading:true
  })
let formData = new FormData();
formData.append(
  "title",
  document.getElementById("formBasictitle").value ?? ""
);
formData.append(
    "address",
    document.getElementById("formBasicaddress").value ?? ""
);
formData.append(
    "date",
    document.getElementById("formBasicdate").value ?? ""
);
formData.append(
    "time",
    document.getElementById("formBasictime").value ?? ""
);
formData.append(
  "text",
  document.getElementById("formBasictext").value ?? ""
);



if(this.state.edit!==null) {
    if(this.state.image!==null){
        formData.append("image", this.state.image ?? "");
    }
  editEvent(formData, this.state.edit).then(res=>{message.success('Tadbir o\'zgartirildi'); this.getEvent()}).catch(err=>{  this.setState({
    loading:false
  });
  message.error('Tadbir o\'zgartirilmadi');})
  this.getEvent()
} else {
    formData.append("image", this.state.image ?? "");
    createEvent(formData).then(res=>{
      message.success('Tadbir saqlandi');
        this.getEvent()
        }).catch(err=>{
          this.setState({
            loading:false
          });
          message.error('Tadbir saqlanmadi')
        })
        this.getEvent()
}
  this.closeModal()
}
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  getEvent=()=>{
   
      getEvents().then(res=>{ 
        var events=res.data
        for(let i=0; i<events.length; i++){
            events[i].key=i+1
        }
        this.setState({ 
            events:res.data,
            loading:false
        })
        
      }).catch(err=>{
        this.setState({
          loading: false
         });
      })
  }
deleteEvent=(id)=>{
  this.setState({
    loading:true
  })
    deleteEvent(id).then(res=>{message.success('Tadbir o\'chirildi'); this.getEvent()}).catch(err=>{  this.setState({
      loading:false
    });
    message.error('Tadbir o\'chiirilmadi')})
}
  componentDidMount(){
      this.getEvent()
      
  }
    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'key',
                key: 'key',
                ...this.getColumnSearchProps('key'),
              },
            {
                title: 'Rasm',
                dataIndex: 'image',
                key: 'image',
                width: '20%',
                
                render:(image)=>{
                    return(<img src={image} style={{width:'100%'}} alt='rasm'/>)
                }
              },
              {
                title: 'Tadbir nomi',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),
              },
              {
                title: 'Manzili',
                dataIndex: 'address',
                key: 'address',
                ...this.getColumnSearchProps('address'),
              },
              {
                title: 'Sanasi',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
              },
              {
                title: 'Vaqti',
                dataIndex: 'time',
                key: 'time',
               render:(time)=>{
                 return(time)
               }
              },
              {
                title: 'Tadbir matni',
                dataIndex: 'text',
                key: 'text',
                render:(text)=>{
                    return( <Button type="primary" onClick={()=>{this.matnKorish(text)}}>Matnni ko'ring</Button>
                    )
                }

              },
              {
                title: 'O\'zgartirish',
                dataIndex: 'id',
                key: 'id',
                render:(id)=>{
                    return( <Button type="primary" onClick={()=>{this.editEvent(id)}}>O'zgartirish</Button>
                    )
                }

              },
              {
                title: 'O\'chirish',
                dataIndex: 'id',
                key: 'keyId',
                render:(id)=>{
                    return( <Button type="danger" onClick={()=>{this.deleteEvent(id)}}>O'chirish</Button>
                    )
                }

              },
             
          ];
        return (
          <div>
            { this.state.loading===true?(<Loader/>):(
  <div>  <br/>

            <Button type="primary" onClick={this.openModal}>Tadbir yaratish</Button><br/><br/>
 <Table columns={columns} dataSource={this.state.events} />              
 <Modal
        title="Tadbir matni"
        visible={this.state.showMatn}
        onCancel={this.closeMatn}
     footer={false}
      >
        <p>{this.state.text}</p>
      </Modal>
      <Modal
        title="Tadbir"
        visible={this.state.show}
        onCancel={this.closeModal}
     footer={false}
      >
        <Form>
        <Form.Group className="mb-3" controlId="formBasictitle"> 
    <Form.Label>Tadbir sarlavhasi</Form.Label><br/>
    <Form.Control className="formInput" defaultValue={this.state.title} name="title" required type="text" placeholder="Tadbir sarlavhasi"/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicaddress"> 
        <Form.Label>Tadbir manzili</Form.Label><br/>
        <Form.Control className="formInput" defaultValue={this.state.address} name="address" required type="text" placeholder="Tadbir manzili"/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicdate"> 
        <Form.Label>Tadbir sanasi</Form.Label><br/>
        <Form.Control className="formInput" defaultValue={this.state.date} name="date" required type="date" placeholder="mm/dd/yy"/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasictime"> 
        <Form.Label>Tadbir vaqti</Form.Label><br/>
        <Form.Control className="formInput" defaultValue={this.state.time} name="time" required type="time"/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Tadbir rasmi</Form.Label><br/>
    <Form.Control className="formInput"      accept=".jpg, .jpeg, .png"
                      onChange={this.customRequest} name="image" required type="file"/>
    <br/><br/>
    {(this.state.previewImage) ? ImageDemo(this.state.imageUrl) : ''}
    </Form.Group>

    <Form.Group controlId="formBasictext" className="mb-3" style={{width:"100%"}}>
    <Form.Label>Tadbir matni</Form.Label>
    <br/><Form.Control className="formInput"
    defaultValue={this.state.textF}
      as="textarea"
      name="text"
      placeholder="Tadbir matnini yozing"
      style={{ height: '200px'}}
    />
  </Form.Group>
  <br/><br/>
    <Button type="danger" htmlType="button" onClick={this.closeModal}>
        
    Bekor qilish
  </Button>
  <Button type="primary" htmlType="button"
   onClick={this.createEvent}
   >
    Yaratish
  </Button>
</Form>
      </Modal></div>
)}
                 </div>
                 
        )
    }
}
