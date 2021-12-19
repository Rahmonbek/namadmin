import faker from "faker";
import {randomColor} from "./utils";
import {Button} from 'react-bootstrap'


export default function makeData1(){
  let data = [
    { id:'1',
      fullname:'Raximova Adolat',
      telefon:'+997267464',
      lavozim:'Matematikadan olimpiyada sovrindori'
    },
    { id:'2',
      fullname:'Raximova Mohinur',
      telefon:'+7526756',     
      lavozim:"Yil o'quvchisi"
    },
    { id:'3',
      fullname:'Barchinoy Hakimova',
      telefon:'+165786598',
      lavozim:"Yoshlar mukofoti sovrindori"
    },
    { id:'4',
      fullname:'Muborak Umarova',
      telefon:'+71242578',     
      lavozim:"Ielts 7"
    },
    { id:'5',
      fullname:'Malika Aliyeva',
      telefon:'+82572857' ,   
      lavozim:"Fzikika fanida bilimlar bellashuvi sovrindori"
    }

  ];
  let options = [
    {
    label:"Fzikika fanida bilimlar bellashuvi sovrindori",
    backgroundColor: randomColor()
    },
    {
      label:'Ielts 7',
      backgroundColor: randomColor()
    },
    {
      label:"Yoshlar mukofoti sovrindori",
      backgroundColor: randomColor()
      },
      {
        label:"Yil o'quvchisi",
        backgroundColor: randomColor()
        },
        {
          label:"Matematikadan olimpiyada sovrindori",
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
      minWidth: 200,
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
      id: "lavozim",
      label: "Yutuqlari",
      accessor: "lavozim",
      dataType: "select",
      width: 300,
      options:options
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
