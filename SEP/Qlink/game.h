#pragma once
#ifndef GAME_H
#define GAME_H

#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QPainter>
#include <QKeyEvent>
#include <cstdlib>
#include <iostream>
#include <QPushButton>
#include <QMessageBox>
#include <QFileDialog>
#include <QDebug>
#include <QTime>
#include <QDir>
#include <QFile>
#include <QIODevice>
namespace Ui {
class Game;
}

class Game : public QWidget
{
    Q_OBJECT

public:
    MainWindow *w;
    explicit Game(QWidget *parent = nullptr);
    ~Game();

private:
    Ui::Game *ui;
    static const int size_x = 19;
    static const int size_y = 19;               //设置界面最大宽度，每个格子宽度50
private slots:
    void ButtonAPressEvent();
    void ButtonBPressEvent();
    void ButtonCPressEvent();
};

#endif // GAME_H
