package com.example.sportapp_backend.serviceImpl;

import com.example.sportapp_backend.dao.VerificationDao;
import com.example.sportapp_backend.service.MsmService;
import com.example.sportapp_backend.util.MsmConstantUtils;
import com.example.sportapp_backend.util.RandomUtil;
import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.common.exception.TencentCloudSDKException;
import com.tencentcloudapi.sms.v20210111.SmsClient;
import com.tencentcloudapi.sms.v20210111.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MsmServiceImpl implements MsmService {
    @Autowired
    private VerificationDao verificationDao;

    @Override
    public boolean send(String phone) {
        try{
            // 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
            // 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
            Credential cred = new Credential(MsmConstantUtils.SECRET_ID, MsmConstantUtils.SECRET_KEY);
            // 实例化一个http选项，可选的，没有特殊需求可以跳过
            HttpProfile httpProfile = new HttpProfile();
            httpProfile.setEndpoint("sms.tencentcloudapi.com");
            // 实例化一个client选项，可选的，没有特殊需求可以跳过
            ClientProfile clientProfile = new ClientProfile();
            clientProfile.setHttpProfile(httpProfile);
            // 实例化要请求产品的client对象,clientProfile是可选的
            SmsClient client = new SmsClient(cred, "ap-nanjing", clientProfile);
            // 实例化一个请求对象,每个接口都会对应一个request对象
            SendSmsRequest req = new SendSmsRequest();
            String[] phoneNumber = {"+86" + phone};
            req.setPhoneNumberSet(phoneNumber);

            req.setSmsSdkAppId(MsmConstantUtils.APP_ID);
            req.setSignName(MsmConstantUtils.SIGN_NAME);
            req.setTemplateId(MsmConstantUtils.TEMPLATE_ID);

            String verificationCode = RandomUtil.getSixBitRandom();
            String[] templateParamSet = {verificationCode};
            req.setTemplateParamSet(templateParamSet);

            // 返回的resp是一个SendSmsResponse的实例，与请求对象对应
            SendSmsResponse resp = client.SendSms(req);
            // 输出json格式的字符串回包
            System.out.println(SendSmsResponse.toJsonString(resp));
            verificationDao.newCode(phone, verificationCode);
            return true;
        }
        catch(TencentCloudSDKException e) {
           return false;
        }
    }

    @Override
    public boolean checkCode(String phone, String code){
        return verificationDao.checkCode(phone, code);
    }
}

