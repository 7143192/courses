package com.example.bookstorebackend2.server;

import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint("/websocket/getMakeOrderRes/{userId}")
@Component
public class WebSocketServer {
    public WebSocketServer() {
        System.out.println("正在创建一个新的连接!");
    }

    private static final AtomicInteger COUNT = new AtomicInteger();
    //使用ConcurrentHashMap作为线程安全管理数据结构
    private static final ConcurrentHashMap<String, Session> SESSIONS = new ConcurrentHashMap<>();

    @OnOpen
    public void OnOpen(Session session, @PathParam("userId") String userId) {
        if(SESSIONS.get(userId) != null) {
            System.out.println("用户" + userId + "已经在线!");
            return ;
        }
        SESSIONS.put(userId, session);
        COUNT.incrementAndGet();
        System.out.println("用户" + userId + "上线了!当前已在线人数为:" + COUNT);
    }

    @OnClose
    public void OnClose(@PathParam("userId") String userId) {
        SESSIONS.remove(userId);
        COUNT.decrementAndGet();
        System.out.println("用户" + userId + "下线了!当前已在线人数为:" + COUNT);
    }

    @OnError
    public void OnError(Session session, Throwable t) {
        System.out.println("出现错误!");
        t.printStackTrace();
    }

    @OnMessage
    public void OnMessage(String message) {
        System.out.println("endPoint得到的消息为:" + message);
    }

    public void SendMessage(Session session, String message) {
        if(session == null) {
            System.out.println("对方当前不在线");
            return ;
        }
        try {
            session.getBasicRemote().sendText(message);
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public void SendMessageToUser(String message, String userId) {
        System.out.println("user=" + userId + ", message=" + message);
        Session session = SESSIONS.get(userId);
        SendMessage(session, message);
    }
}
