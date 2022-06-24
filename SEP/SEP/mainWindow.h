#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#endif // MAINWINDOW_H

#include <QWidget>
#include <QFileDialog>
#include <QAction>
#include <QMenuBar>
#include <QMenu>
#include <qmessagebox.h>
#include <QMainWindow>
#include <QGraphicsView>
#include <QGraphicsScene>
#include <QString>
#include <fstream>
#include <cstring>
#include "battlefield.h"
using namespace std;

const int block=6;
class QGraphicsScene;
class QGraphicsView;
class MainWindow : public QMainWindow
{
    Q_OBJECT
private slots:
    void findPath();
    void loadFile();
private:
    bool ifLoadFile=false;
    bool ifFindPath=false;
    BattleField battle_field;
    QColor enemy_color;
    QColor safe_color;
    QColor path_color;
    QAction *loadAction;
    QAction *findAction;
    QString filename;
    QGraphicsScene *scene;
    QGraphicsView *view;
public:
    MainWindow(QWidget *parent = nullptr);
    // use data in the file to init the battle field
    void load_data();
    void createMenu();
    void createActions();
    void initBattleField();

protected:
    // draw battle field
    void paintEvent(QPaintEvent *event) override;
    // listen to the key press event
    void keyPressEvent(QKeyEvent *event) override;

};
