package com.example.sportapp_backend.daoImpl;

import com.example.sportapp_backend.dao.MomentDao;
import com.example.sportapp_backend.entity.*;
import com.example.sportapp_backend.repository.*;
//import com.sun.deploy.net.URLEncoder;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.*;

@Repository
public class MomentDaoImpl implements MomentDao {
    @Autowired
    MomentRepository momentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RelationshipRepository relationshipRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    LikeRepositoery likeRepositoery;

    @Autowired
    MomentImageRepository momentImageRepository;

    @Override
    public Moment addMoment(int user_id,String content){
        Moment m=new Moment();
        long time = Calendar.getInstance().getTimeInMillis();
        Timestamp ts = new Timestamp(time);
        m.setTime(ts);
        m.setContent(content);
        m.setUser_id(user_id);
        momentRepository.save(m);
        return m;
    }

    @Override
    public List<Moment> getAllMoments(){
        List<Moment> res=momentRepository.getAllMoments();
        for(Moment item:res){
            User user=userRepository.getUserById(item.getUser_id());
            item.setNickname(user.getNickname());
            item.setSex(user.getSex());
            item.setBirth(user.getBirth());
            item.setExp(user.getExp());
            item.setHeader(user.getHeader());
            item.setLike_num(likeRepositoery.getLikeNumByTypeId(2,item.getMoment_id()).size());
            item.setComment_num(commentRepository.getCommentByTypeId(2,item.getMoment_id()).size());
        }
        return res;
    }

    @Override
    public List<Moment> getUserMoments(int user_id){
        List<Moment> res = momentRepository.getMomentsById(user_id);
        for(Moment item:res){
            User user=userRepository.getUserById(user_id);
            item.setNickname(user.getNickname());
            item.setSex(user.getSex());
            item.setBirth(user.getBirth());
            item.setExp(user.getExp());
            item.setHeader(user.getHeader());
            item.setLike_num(likeRepositoery.getLikeNumByTypeId(2,item.getMoment_id()).size());
            item.setComment_num(commentRepository.getCommentByTypeId(2,item.getMoment_id()).size());
        }
        return res;
    }

    @Override
    public List<Moment> getFollowMoments(int user_id){
        List<Relationship> follow=relationshipRepository.getAllRelationshipById(user_id);
        List<Moment> list = new LinkedList<>();
        for(Relationship relationship:follow){
            list.addAll(momentRepository.getMomentsById(relationship.getFriend_id()));
        }
        for(Moment item:list){
            User user=userRepository.getUserById(item.getUser_id());
            item.setNickname(user.getNickname());
            item.setSex(user.getSex());
            item.setBirth(user.getBirth());
            item.setExp(user.getExp());
            item.setHeader(user.getHeader());
            item.setLike_num(likeRepositoery.getLikeNumByTypeId(2,item.getMoment_id()).size());
            item.setComment_num(commentRepository.getCommentByTypeId(2,item.getMoment_id()).size());
        }
        return list;
    }

    @Override
    public Moment delMoment(int moment_id)
    {
        Moment m = momentRepository.getById(moment_id);
        List<MomentImage> images = momentImageRepository.getMomentImagesById(moment_id);
        for(MomentImage image : images) {
            momentImageRepository.delete(image);
            momentImageRepository.flush();
        }
        momentRepository.delete(m);
        momentRepository.flush();
        return m;
    }

    @Override
    public List<Moment> getPartAllMoment(int cur, int size)
    {
        /*List<Moment> all = getAllMoments();
        int len = all.size(); //获取所有跟练课程的数目
        List<Moment> ans = new ArrayList<>();
        int pos = 0;
        int num = 0;
        for(Moment item : all) {
            if(pos < cur){
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            pos++;
            ans.add(item);
            num++;
        }
        System.out.println("ans=" + ans);*/
        Moment lastMoment = momentRepository.getLastMoment();
        int all = lastMoment.getMoment_id();
        cur = all - cur  - size;
        if(cur < 0) {
            size = size + cur;
            cur = 0;
        }
        List<Moment> ans = momentRepository.getDescLimitedMoment(cur, size);
        List<Moment> res = new ArrayList<>();
        for(int i = 0; i < ans.size(); ++i) {
            Moment m = ans.get(ans.size() - i - 1);
            User u = userRepository.getUserById(m.getUser_id());
            m.setHeader(u.getHeader());
            m.setNickname(u.getNickname());
            m.setBirth(u.getBirth());
            m.setSex(u.getSex());
            res.add(m);
        }
        return res;
    }

    @Override
    public List<Moment> getPartUserMoments(int user_id, int cur, int size)
    {
        List<Moment> res = momentRepository.getMomentsById(user_id);
        int len = res.size();
        int pos = 0;
        int num = 0;
        List<Moment> ans = new ArrayList<>();
        for(Moment item:res){
            if(pos < cur) {
                pos++;
                continue;
            }
            if(pos == len || num == size) break;
            User user=userRepository.getUserById(user_id);
            item.setNickname(user.getNickname());
            item.setSex(user.getSex());
            item.setBirth(user.getBirth());
            item.setExp(user.getExp());
            item.setHeader(user.getHeader());
            item.setLike_num(likeRepositoery.getLikeNumByTypeId(2,item.getMoment_id()).size());
            item.setComment_num(commentRepository.getCommentByTypeId(2,item.getMoment_id()).size());
            pos++;
            ans.add(item);
            num++;
        }
        return ans;
    }

    @Override
    public Moment addMomentAndImages(int user_id, String content, List<MultipartFile> images)
    {
        //MultipartFile myfile;
        System.out.println("images=" + images);
        //System.out.println("size=" + Arrays.toString(size));
        Moment moment = addMoment(user_id, content);
        List<Moment> moments = momentRepository.getAllMoments();
        int momentId = moments.get(moments.size() - 1).getMoment_id();
        String path = "http://124.71.177.146:80/uploadfiles";
        for(int i = 0; i < images.size(); ++i) {
            MultipartFile file = images.get(i);
            String s = file.getOriginalFilename();
            System.out.println("original name=" + s);
            //为上传到服务器的文件取名，使用UUID防止文件名重复
            String type = s.substring(s.lastIndexOf("."));
            String filename= UUID.randomUUID().toString() + type;
            try{
                //使用Jersey客户端上传文件
                Client client = Client.create();
                WebResource webResource = client.resource(path +"/" + URLEncoder.encode(filename,"utf-8"));
                webResource.put(file.getBytes());
                System.out.println("上传成功");
                MomentImage image = new MomentImage();
                image.setMoment_id(momentId);
                image.setImg(path + "/" + filename);
                momentImageRepository.save(image);
                momentImageRepository.flush();
                System.out.println("图片路径==>" + path + filename);
            }catch(Exception ex){
                System.out.println("exception ex=" + ex);
                System.out.println("上传失败");
            }
        }
        return moment;
    }

    @Override
    public Moment getLastMoment()
    {
        return momentRepository.getLastMoment();
    }
}
