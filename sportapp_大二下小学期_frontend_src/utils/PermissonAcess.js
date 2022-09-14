import { ToastAndroid} from 'react-native';
//检查是否获取定位权限
import {PermissionsAndroid} from "react-native";

export function checkPermissionCarmera() {
    try {
        //返回Promise类型
        const granted = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA
        )
        // console.log("此时的granted的值为----"+granted.data)
        granted.then((data) => {
            //  console.log("是否获取定位权限----" + data)
            if (data === false) {
                // console.log("未获得权限 请求权限----" + data)
                requestPermissionCarmera();
            }
        }).catch((err) => {
            ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
        })
    } catch (err) {
        ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
    }
}

//请求定位权限
const requestPermissionCarmera = async () => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    try {
        //返回string类型
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                //第一次请求拒绝后提示用户你为什么要这个权限
                'title': '我要定位权限',
                'message': '没权限我不能工作，同意就好了'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("-----用户已授权")
        } else {
            ToastAndroid.show("请开启相机定位",ToastAndroid.SHORT);
        }
    } catch (err) {
        console.log("-----出现错误")
    }
}

//检查是否获取读取权限
export function checkPermissionRead() {
    try {
        //返回Promise类型
        const granted = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        )

        granted.then((data) => {

            if (data === false) {

                requestPermissionRead();
            }
        }).catch((err) => {
            ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
        })
    } catch (err) {
        ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
    }
}

//请求读取权限
const requestPermissionRead = async () => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    try {
        //返回string类型
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                //第一次请求拒绝后提示用户你为什么要这个权限
                'title': '我要读取权限',
                'message': '没权限我不能工作，同意就好了'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("-----用户已授权")
        } else {
            ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
        }
    } catch (err) {
        console.log("-----出现错误")
    }
}

//检查是否获取写入权限
export  function checkPermissionWrite() {
    try {
        //返回Promise类型
        const granted = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        )

        granted.then((data) => {

            if (data === false) {
                requestPermissionWrite();
            }
        }).catch((err) => {
            ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
        })
    } catch (err) {
        ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
    }
}

//请求写入权限
const requestPermissionWrite = async () => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    try {
        //返回string类型
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                //第一次请求拒绝后提示用户你为什么要这个权限
                'title': '我要写入权限',
                'message': '没权限我不能工作，同意就好了'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("-----用户已授权")
        } else {
            ToastAndroid.show("请先开启写入权限",ToastAndroid.SHORT);
        }
    } catch (err) {
        console.log("-----出现错误")
    }
}
