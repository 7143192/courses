import React, {useState} from "react";
import {Modal, Button} from 'antd';
import {Link} from 'umi';
import {Calendar, Badge} from 'antd';

function getListData(value) {
  let listData = [];
  console.log("日期为:", value.format("YYYY-MM-DD"));
  /*switch (value.date()){
    case 6:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '13:00-13:30'},
      ];
      break;
    case 8:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '13:00-13:30'},
      ];
      break;
    case 10:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '10:00-10:30'},
        {type: 'error', content: '13:00-13:30'},
      ];
      break;
    case 15:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '10:00-10:30'},
        {type: 'error', content: '13:00-13:30'},
      ];
      break;
    case 18:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '10:00-10:30'},
        {type: 'error', content: '13:00-13:30'},
      ];
      break;
    case 24:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '10:00-10:30'},
        {type: 'error', content: '13:00-13:30'},
      ];
      break;
    case 27:
      listData = [
        {type: 'warning', content: '8:00-8:30'},
        {type: 'success', content: '10:00-10:30'},
      ];
      break;
    default:
  }*/
  let orders = JSON.parse(localStorage.getItem("doctorOrder"));
  Object.keys(orders).forEach((key) => {
    if(orders[key].rsvTime.substring(0, 10).toString() === value.format("YYYY-MM-DD")){
      let time = orders[key].rsvTime.substring(11);
      let start = parseInt(time.substring(0, 2));
      let end = start + 1;
      let startTime = time.substring(0,5);
      let endTime = end.toString() + time.substring(2, 5);
      let finalTime = startTime + "--" + endTime;
      listData.push(
        {type : "success", content : finalTime}
      )
    }
  })
  return listData || [];
}

function getModalData(value){
  let ans = [];
  let regs = JSON.parse(localStorage.getItem("doctorRegs"));
  //console.log("regs=", regs);
  Object.keys(regs).forEach((key) => {
    if(regs[key].rsvTime.substring(0, 10).toString() === value.format("YYYY-MM-DD")){
      ans.push(
        {
          time : regs[key].rsvTime.substring(11, 16).toString(),
          id : regs[key].patientId,
        }
      )
    }
  })
  console.log("ans=", ans);
  return ans;
}

function getPatientName(id){
  let name = "";
  let patients = JSON.parse(localStorage.getItem("patients"));
  Object.keys(patients).forEach((key) => {
    if(patients[key].patientId === id) name = patients[key].name;
   })
  return name;
}

function dateCellRender(value) {
  console.log(value);
  const listData = getListData(value);
  const ModalData = getModalData(value);
  console.log("modalData = ", ModalData);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <ul className="events" onClick={showModal}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
          </li>
        ))}
      </ul>
      <Modal title="患者列表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {ModalData.map(item=> (
          <li>
            <p>
              <span>{item.time}</span>
              <span className={'seperate'}> <Link to={'./doctorRecord'}>前往记录</Link></span>
              <span className={'seperate'}>{getPatientName(item.id)}</span>
            </p>
          </li>
        ))}
      </Modal>
    </div>
  );
}

export default class MyCalendar extends React.Component {
  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let url = "http://localhost:8080/getDoctorOrder?id=" + user.doctorId;
    let url1 = "http://localhost:8080/getDoctorReg?id=" + user.doctorId;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.removeItem("doctorOrder");
        localStorage.setItem("doctorOrder", JSON.stringify(data));
      })
      .finally(data => {
        fetch(url1)
          .then(response1 => response1.json())
          .then(data1 => {
            localStorage.removeItem("doctorRegs");
            localStorage.setItem("doctorRegs", JSON.stringify(data1));
          })
      })
      .finally(data => {
        fetch("http://localhost:8080/getPatients")
          .then(response2 => response2.json())
          .then(data2 => {
            localStorage.removeItem("patients");
            localStorage.setItem("patients", JSON.stringify(data2));
          })
      })
  }

  render() {
    return (
      <div>
        <Calendar dateCellRender={dateCellRender}/>
      </div>
    )
  }
}
