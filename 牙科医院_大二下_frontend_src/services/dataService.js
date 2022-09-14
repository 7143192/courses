import axios from "axios";
import {message} from "antd";
// 用来获取医生和科室信息
export const getDoctorAndDept = () => {

  axios({
    method: 'GET',
    url: 'http://localhost:8080/getDoctors',
    params: {

    }
  }).then(response => {
    console.log(response)
    if (response.status === 200) {
      localStorage.setItem('doctors', JSON.stringify(response.data));
    }
  }).catch(error => {
    console.log(error)
    console.log("获取失败！")
  })

  axios({
    method: 'GET',
    url: 'http://localhost:8080/getDepartments',
    params: {

    }
  }).then(response => {
    console.log(response)
    if (response.status === 200) {
      localStorage.setItem('departments', JSON.stringify(response.data));
    }
  }).catch(error => {
    console.log(error)
    console.log("获取失败！")
  })
}

export const addOrder=(values)=>{
  /*axios({
    method: 'POST',
    url: 'http://localhost:8080/regRequest',
    params: {
      doctorName:values.name,
      patientName : values.patientName,
      //ordernum:values.num,
      time:values.date
    }
  }).then(response => {
    console.log(response)

  }).catch(error => {
    console.log(error)
    console.log("获取失败！")
  })*/
  let time = values.date;
  let time1 = time.substring(0, 10);
  let time2 = time.substring(11);
  let finalTime = time1 + time2;
  let url = "http://localhost:8080/AssignOrder?doctorId=" + values.id + "&time=" + finalTime
  + "&num=" + values.num;
  console.log(url);
  fetch(url)
    .then(response => response.json());
}

export const getPatients=(callback)=>{
  axios({
    method: 'POST',
    url: 'http://localhost:8080/getPatients',
    params: {
    }
  }).then(response => {
    // console.log(response)
    callback(response.data);
    // console.log("获取失dd败！")
  }).catch(error => {
    // console.log(error)
    // console.log("获取失败！")
  })

}

export function getRegByDocs(id, callback){
  axios({
    method: 'POST',
    url: 'http://localhost:8080/getDoctorReg',
    params: {
      id:id
    }
  }).then(response => {
    // console.log(response)
    if (response.status === 200) {
      callback(response.data);
    }
  }).catch(error => {
    alert("错误");
  })
}

export function registrationFinish(data) {
  axios({
    method: 'POST',
    url: 'http://localhost:8080/registrationFinish',
    params: {
      regId:data
    }
  }).then(response => {
    // console.log(response)
    message.success("成功");
  }).catch(error => {
    // alert("错误");
    // console.log(1222);
    message.success("成功");
  })
}
