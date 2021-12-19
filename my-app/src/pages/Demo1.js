import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { appointments } from './demo-data/appointments';
import {Form,Button} from 'react-bootstrap'
import {Container,Row,Col} from 'react-bootstrap'
import styles from '../css/admin.module.css'
import {BellOutlined,FormOutlined,DownloadOutlined} from '@ant-design/icons'
import { Radio  } from 'antd';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-26',

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
      edit:null,
      teacher1:{},
      teacher:[],
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }
  saveTeacher=()=>{
    var title=document.getElementById('title').value
    var startDate=document.getElementById('startDate').value
    var endDate=document.getElementById('endDate').value
    var id=document.getElementById('id').value
    var location=document.getElementById('location').value
    var teacher={
        title,
        startDate,
        endDate,
        id,
        location,
    }
    var newteacher=this.state.data;
   if(this.state.edit===null){
    newteacher.push(teacher);
    this.setState({
        data:newteacher
    })
   }else{
       newteacher[this.state.edit]=teacher
       this.setState({
         edit:null
       })
   }
    this.reset()
}
reset=()=>{
  document.getElementById('formIsmfamiliya').value=''
  document.getElementById('formFan').value=''
  document.getElementById('formEmail').value=''
  document.getElementById('formNumber').value=''
  document.getElementById('formLavozim').value=''
  this.setState({
    edit:null
  })
}
  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
    } = this.state;

    return (
      <div>
        <div>
        <div className={styles.formAdmin}>
                                  <h4>O'qituvchi kiritish</h4>
                              <Form id="formAdmint">
            <Form.Group controlId="title">
              <Form.Control type="text" placeholder="title" defaultValue={this.state.teacher1.fullname}/>
            </Form.Group>
            <Form.Group controlId="startDate" bsSize="large">
    <Form.Control
      autoFocus
      type="date"
      value={this.state.teacher1.startDate}
    />
  </Form.Group>
  <Form.Group controlId="endDate" bsSize="large">
    <Form.Control
      autoFocus
      type="date"
      value={this.state.teacher1.endDate}
    />
  </Form.Group>
            <Form.Group controlId="id">
              <Form.Control type="number" placeholder="id" defaultValue={this.state.teacher1.id}/>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Control type="text" placeholder="Lavozimini kiriting" defaultValue={this.state.teacher1.location}/>
            </Form.Group>
            <a href="#2"><Button variant="primary" className={styles.inputFormBtn} onClick={this.saveTeacher}>
            O'zgarishlarni saqlash
            </Button></a>
            <Button variant="primary" className={styles.inputFormBtn1} onClick={this.reset}>
                            Bekor qilish
            </Button>

      
        </Form>
                                  </div>
                                <Container fluid>
                                  <Row>
                                  <Col xl={4} lg={6} md={6} sm={6} className={styles.containerKonkurslar}>
                                <div className={styles.cardsKonkurslar}>
                                    <h2>Sizni sotib olish uchun tanlov tanlovida ishtirok etishga taklif qilamiz</h2>
                                    
                                    <p>gaz hisoblagichi OSTEN G-4 GSM / GPRS</p>
                                    <Button onClick={()=>{this.download('http://w.uz')}} type="primary" icon={<DownloadOutlined style={{color:'white',fontSize:'18px'}}/>} className={styles.btnKonkurslar} size={this.state.size}><h5> Yuklab olish Pdf</h5></Button>
                                    <span>Nashr qilingan sana:</span>
                                    <h6><FormOutlined style={{color:'hsl(212, 86%, 64%)',fontSize:'18px'}}/>  05.04.2021 yil</h6>
                                    <span>Takliflarni qabul qilishning tugash sanasi:</span> 
                                    <h6><BellOutlined style={{color:'hsl(212, 86%, 64%)',fontSize:'18px'}}/> 15.04.2021 yil soat 16:00 gacha</h6>
                                </div>
                            </Col>
                                  </Row>
                                </Container>
        </div>
        <Paper>
        <Scheduler
          data={data}
          height={660}
          showWeekend={false}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <WeekView
            startDayHour={9}
            endDayHour={17}
          />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
      </div>
    );
  }
}
