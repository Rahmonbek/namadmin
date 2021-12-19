import faker from "faker";
import {randomColor} from "./utils";
import {Button} from 'react-bootstrap'



export default function makeData(){
  let data = [
    { id:'1',
      fullname:'Toshmatov Toshmat',
      telefon:'+997267464',
      email:'toshmatov@gmail.com',
      lavozim:'Direktor'
    },
    { id:'2',
      fullname:'Raximova Mohinur',
      telefon:'22',
      email:'mohinur@gmail.com',
      lavozim:"Direktor o'rinbosari"
    },
    { id:'3',
      fullname:'Barchinoy',
      telefon:'22',
      email:'barchinoy@gmail.com',
      lavozim:"Katta o'qituvchi"
    },
    { id:'4',
      fullname:'Muborak',
      telefon:'56',
      email:'muborak@gmail.com',
      lavozim:"Matematika o'qituvchisi"
    },
    { id:'5',
      fullname:'Malika',
      telefon:'34',
      email:'malika@gmail.com',
      lavozim:"Katta o'qituvchi"
    }

  ];
  let options = [
    {
    label:"Matematika o'qituvchisi",
    backgroundColor: randomColor()
    },
    {
      label:'Direktor',
      backgroundColor: randomColor()
    },
    {
      label:"Direktor o'rinbosari",
      backgroundColor: randomColor()
      },
      {
        label:"Katta o'qituvchi",
        backgroundColor: randomColor()
        },
        {
          label:"Geografiya o'qituvchisi",
          backgroundColor: randomColor()
        },

]

  
  let columns = [
    {
      id: "id",
      label: "Id",
      accessor: "id",
      minWidth:0,
      dataType: "number",
      options: []
    },
    {
      id: "fullname",
      label: "Ismi",
      accessor: "fullname",
      minWidth: 100,
      dataType: "text",
      options: []
    },
    {
      id: "telefon",
      label: "Telefon",
      accessor: "telefon",
      width: 150,
      dataType: "number",
      options: []
    },
    {
      id: "email",
      label: "Pochta",
      accessor: "email",
      width: 200,
      dataType: "text",
      options: []
    },
    {
      id: "lavozim",
      label: "Lavozim",
      accessor: "lavozim",
      dataType: "select",
      width: 200,
      options: options
    },
    {
      id:'delete',
      label:"O'chirish",
      accessor: '_id',
      dataType:'id',
      width:100,
      Cell: ({cell}) => (
        <Button style={{backgroundColor:'#1A86D0',border:'none',padding:'0',fontSize:'15px',marginTop:'20px'}}>
          O'chirish
        </Button>
      )
    },
    {
      id: 999999,
      width: 20,
      label: "+",
      disableResizing: true,
      dataType: "null"
    }
  ];
  return {columns: columns, data: data, skipReset: false};
}
