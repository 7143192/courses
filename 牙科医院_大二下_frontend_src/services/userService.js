import axios from "axios";
import {history} from "../.umi/core/history";

export const login = (values) => {
  let request;
  let userType;
  let url = "http://localhost:8080/";
  if (values.identity === '患者') {
    request = 'checkPatient';
    userType = 1;
  } else if (values.identity === '医生') {
    request = 'checkDoctor';
    userType = 2;
  } else {
    request = 'checkAdmin';
    userType = 3;
  }
  url += request;
  url += "?username=";
  url += values.username;
  url += "&password=";
  url += values.password;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (userType === 1) {
        if (data.patientId === -1) {
          alert("用户名或密码错误！");
        } else {
          localStorage.setItem("userType", JSON.stringify(userType));
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/");
        }
      } else {
        if (userType === 2) {
          if (data.doctorId === -1) {
            alert("用户名或密码错误！");
          } else {
            localStorage.setItem("userType", JSON.stringify(userType));
            localStorage.setItem("user", JSON.stringify(data));
            history.push("/doctorHome");
          }
        } else {
          if (data.adminId === -1) {
            alert("用户名或密码错误！");
          } else {
            localStorage.setItem("userType", JSON.stringify(userType));
            localStorage.setItem("user", JSON.stringify(data));
            history.push("/admin");
          }
        }
      }
    })
    .finally(fetch("http://localhost:8080/getDoctors")
      .then(response => response.json())
      .then(data => {
        console.log("医生信息:", data);
        localStorage.setItem("doctors", JSON.stringify(data));
      })
    )
}

// export const order = (values) => {
//   let request;
//   let userType;
//   if (values.identity === '患者') {request = 'checkPatient'; userType = 1;}
//   else if (values.identity === '医生') {request = 'checkDoctor'; userType = 2;}
//   else {request = 'checkAdmin';userType = 3;}
//
//   axios({
//     method: 'POST',
//     url: 'http://localhost:8080/'+request,
//     params: {
//       username: values.username,
//       password: values.password
//     }
//   }).then(response => {
//     console.log(response)
//     if (response.status === 200) {
//       localStorage.setItem('userType', userType);
//       localStorage.setItem('user', JSON.stringify(response.data));
//     }
//   }).catch(error => {
//     console.log(error)
//     console.log("登陆失败！")
//     alert("账号或密码错误");
//   })
// }
