import BaseUrl from '../utils/constants';
import axios from 'axios';
import SyncStorage from "../utils/syncStorage";

export function getUserRecords(user_id) {
  let data = {};
  data.user_id = user_id;
  let url1 = BaseUrl + '/getUserRecords?user_id=1';
  // fetch(url1, {
  //     method: 'POST',
  //     headers: {
  //         'content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  // })
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //     })
  //     .catch(err=> {
  //         console.log(err.message)
  //     }) ;

  /*axios
    .post(url1, {
      user_id: 1,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/
  fetch(url1,{
    headers: {
      'token': SyncStorage.getValue('token')
    }
  })
    .then(response => response.json())
    .then(ret => {
      console.log('获取的数据为:', ret);
    });
}
