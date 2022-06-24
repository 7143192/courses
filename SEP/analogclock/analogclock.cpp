/****************************************************************************
**
** Copyright (C) 2016 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the examples of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:BSD$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see https://www.qt.io/terms-conditions. For further
** information use the contact form at https://www.qt.io/contact-us.
**
** BSD License Usage
** Alternatively, you may use this file under the terms of the BSD license
** as follows:
**
** "Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions are
** met:
**   * Redistributions of source code must retain the above copyright
**     notice, this list of conditions and the following disclaimer.
**   * Redistributions in binary form must reproduce the above copyright
**     notice, this list of conditions and the following disclaimer in
**     the documentation and/or other materials provided with the
**     distribution.
**   * Neither the name of The Qt Company Ltd nor the names of its
**     contributors may be used to endorse or promote products derived
**     from this software without specific prior written permission.
**
**
** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
** "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
** LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
** A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
** OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
** LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
** DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
** THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
** (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
** OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."
**
** $QT_END_LICENSE$
**
****************************************************************************/

#include "analogclock.h"

#include <QPainter>
#include <QTime>
#include <QTimer>
#include<QKeyEvent>

bool f=false;
AnalogClock::AnalogClock(QWidget *parent)
    : QWidget(parent)
{
    // 构建一个计时器
    timer = new QTimer(this);
    // 将计时器的超时事件与 AnalogClock 的 update 函数绑定，即一旦计时器时间到了，就会调用一次 update 函数
    connect(timer, &QTimer::timeout, this, QOverload<>::of(&AnalogClock::update));
    // 计时器开始计时，每次时间间隔 1000 ms
    timer->start(1000);
    // 设置窗口的标题
    setWindowTitle(tr("Analog Clock"));
    // 设置 widget 大小
    resize(200, 200);
}

// AnalogClock 这个 widget 的绘制事件，在 update 被调用时，此函数会被调用
void AnalogClock::paintEvent(QPaintEvent *)
{
    // 三个点，组成一个三角形，表示时针
    static const QPoint hourHand[3] = {
        QPoint(7, 8),
        QPoint(-7, 8),
        QPoint(0, -40)
    };
    // 同理表示分针，注意此处长度不一样
    static const QPoint minuteHand[3] = {
        QPoint(7, 8),
        QPoint(-7, 8),
        QPoint(0, -70)
    };

    static const QPoint secondHand[3]={
        QPoint(7,8),
        QPoint(-7,8),
        QPoint(0,-90)
    };
    // 为时针和分针分别准备一个颜色，RGB 格式
    QColor hourColor(127, 0, 127);
    QColor minuteColor(0, 0,255);
    QColor secondColor(255,0,0);

    // 获取当前 widget 的宽度高度，取最小值作为表盘的边长
    int side = qMin(width(), height());
    // 获取当前时间，后面我们将根据该时间，确定时针和分针的指向
    QTime time = QTime::currentTime();

    // 基于该 widget 构建一个 painter，准备开始画图
    QPainter painter(this);
    // 设置 painter 的抗锯齿，让画出来的线更平滑
    painter.setRenderHint(QPainter::Antialiasing);
    // 设置 painter 的坐标系装换
    painter.translate(width() / 2, height() / 2);
    painter.scale(side / 200.0, side / 200.0);

    // 设置 painter 所使用的 pen（可以认为是边框颜色，此处无边框）
    painter.setPen(Qt::NoPen);
    // 设备 painter 锁使用的 brush（可以认为是填充颜色）
    // 此处打算先画时针，于是将 brush 设置为时针颜色
    painter.setBrush(hourColor);

    // 将此时此刻的 painter 保存下来，后面可以用 restore 恢复到此时的状态
    painter.save();
    // 根据当前的小时数和分钟数，旋转 painter 所看的坐标系
    painter.rotate(30.0 * ((time.hour() + time.minute() / 60.0)));
    // 根据给定的点，绘制出闭合多边形（三个点就是三角形）
    painter.drawConvexPolygon(hourHand, 3);
    // 恢复之前保存的状态（相当于把刚刚的坐标系旋转操作的效果去除了）
    painter.restore();

    // 开始小时刻度，由于要画线，所以 setPen
    painter.setPen(hourColor);
    // 一个 12 个小时刻度，可以到
    for (int i = 0; i < 12; ++i) {
        // 自己查文档看看这 4 个参数是什么意思，可以在 drawLine 上点右键，选择 Context Help（中文系统请自行翻译一下）
        painter.drawLine(88, 0, 96, 0);
        // 旋转，这个所以下次 drawLine 的参数没变，但是位置变了
        painter.rotate(30.0);
    }

    // 准备开始画分针了
    painter.setPen(Qt::NoPen);
    painter.setBrush(minuteColor);

    // 和之前一样哟
    painter.save();
    painter.rotate(6.0 * (time.minute() + time.second() / 60.0));
    painter.drawConvexPolygon(minuteHand, 3);
    painter.restore();

    // 5 分钟刻度
    painter.setPen(minuteColor);
    for (int j = 0; j < 60; ++j) {
        // 想想这个判断是为了啥
        if ((j % 5) != 0)
            painter.drawLine(92, 0, 96, 0);
        painter.rotate(6.0);
    }

    painter.setPen(Qt::NoPen);
    painter.setBrush(secondColor);
    painter.save();
    painter.rotate(0.1*((time.hour()*3600+time.minute()*60+time.second())%60));
    painter.drawConvexPolygon(secondHand,3);
    painter.restore();
}

void AnalogClock::keyPressEvent(QKeyEvent *event)
{
    if(!f&&event->key()==0x50){
        timer->stop();
        f=true;
        return ;
    }
    if(f&&event->key()==0x50){
        timer->start();
        f=false;
        return ;
    }
}


void game::paintEvent(QPaintEvent *)
{
    // 基于该 widget 构建一个 painter，准备开始画图
    QPainter painter(this);
    // 设置 painter 的抗锯齿，让画出来的线更平滑
    painter.setRenderHint(QPainter::Antialiasing);
    QColor circlecolor(255,0,0);
    painter.setPen(Qt::NoPen);
    painter.setBrush(circlecolor);
    painter.save();
    painter.drawEllipse((x-r+width()-1)%width(),(y-r+height()-1)%height(),2*r,2*r);
    painter.restore();//画实心圆

    QColor rectcolor(0,0,255);
    painter.setPen(Qt::NoPen);
    painter.setBrush(rectcolor);
    painter.save();
    painter.drawRect((x1+width()-1)%width(),(y1+height()-1)%height(),l,l);
    painter.restore();//画正方形
}

/*void game::keyPressEvent(QKeyEvent *event)
{
    painter=new QPainter(this);
    int wide=width();
    int high=height();
    QColor circlecolor(255,0,0);
    QColor rectcolor(0,0,255);
    if(event->key()==0x41){             //A
        x-=5;
        if(f1&&event->key()==0x41){
            x1-=5;
            f1=false;
        }
        if(x<=0){
            x=wide-r;
        }
        if((y-r==y1&&x1+l+r==x)||(x1+r==x&&y+r==y1)||(x1+r==x&&y1+l+r==y)){
            f1=true;
        }
        else f1=false;
        update();
        painter->setPen(Qt::NoPen);
        painter->setBrush(circlecolor);
        painter->save();
        painter->drawEllipse(x-r,y-r,2*r,2*r);
        painter->restore();
        painter->setPen(Qt::NoPen);
        painter->setBrush(rectcolor);
        painter->save();
        painter->drawRect(x1,y1,l,l);
        painter->restore();
        return ;
    }
    if(event->key()==0x44){             //D
        x+=5;
        if(f1&&event->key()==0x44){
            x1+=5;
            f1=false;
        }
        if(x>=wide){
            x=r;
        }
        if((y-r==y1&&x+r==x1)||(x1+r==x&&y+r==y1)||(x1+r==x&&y1+l+r==y)){
            f1=true;
        }
        else f1=false;
        update();
        painter->setPen(Qt::NoPen);
        painter->setBrush(circlecolor);
        painter->save();
        painter->drawEllipse(x-r,y-r,2*r,2*r);
        painter->restore();
        painter->setPen(Qt::NoPen);
        painter->setBrush(rectcolor);
        painter->save();
        painter->drawRect(x1,y1,l,l);
        painter->restore();
        return ;
    }
    if(event->key()==0x53){             //S
        y+=5;
        if(f1&&event->key()==0x53){
            y1+=5;
            f1=false;
        }
        if(y>=high){
            y=r;
        }
        if((x1+r==x&&y+r==y1)||(y-r==y1&&x1+l+r==x)||(y-r==y1&&x+r==x1)){
            f1=true;
        }
        else f1=false;
        update();
        painter->setPen(Qt::NoPen);
        painter->setBrush(circlecolor);
        painter->save();
        painter->drawEllipse(x-r,y-r,2*r,2*r);
        painter->restore();
        painter->setPen(Qt::NoPen);
        painter->setBrush(rectcolor);
        painter->save();
        painter->drawRect(x1,y1,l,l);
        painter->restore();
        return ;
    }
    if(event->key()==0x57){             //W
        y-=5;
        if(f1&&event->key()==0x57){
            y1-=5;
            f1=false;
        }
        if(y<=0){
            y=high-r;
        }
        if((x1+r==x&&y1+l+r==y)||(y-r==y1&&x1+l+r==x)||(y-r==y1&&x+r==x1)){
            f1=true;
        }
        else f1=false;
        update();
        painter->setPen(Qt::NoPen);
        painter->setBrush(circlecolor);
        painter->save();
        painter->drawEllipse(x-r,y-r,2*r,2*r);
        painter->restore();
        painter->setPen(Qt::NoPen);
        painter->setBrush(rectcolor);
        painter->save();
        painter->drawRect(x1,y1,l,l);
        painter->restore();
        return ;
    }

}*/

void game::keyPressEvent(QKeyEvent *event)
{
    painter=new QPainter(this);
    bool f1=false;
    bool f2=false;
    bool f3=false;
    bool f4=false;
    if(y-r==y1&&x1+l+r==x) f1=true;
    else if(y-r==y1&&x+r==x1) f2=true;
    else if(x1+r==x&&y+r==y1) f3=true;
    else if(x1+r==x&&y1+l+r==y) f4=true;
    if(event->key()==0x41){     //A
        x-=5;
        if(f1){
            x1-=5;
        }
        update();
        return ;
    }
    if(event->key()==0x44){  //D
        x+=5;
        if(f2){
            x1+=5;
        }
        update();
        return ;
    }
    if(event->key()==0x53){  //S
        y+=5;
        if(f3){
            y1+=5;
        }
        update();
        return ;
    }
    if(event->key()==0x57){  //W
        y-=5;
        if(f4){
            y1-=5;
        }
        update();
        return ;
    }
}
