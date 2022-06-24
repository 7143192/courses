#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "battlefield.h"
QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    ~MainWindow();
    MainWindow(QWidget *parent = nullptr);
    // use data in the file to init the battle field
    void load_data();

private:
    Ui::MainWindow *ui;
    BattleField battle_field;
    QColor enemy_color;
    QColor safe_color;
    QColor path_color;
    int data[N][2];
    int N1 = 0;
    bool f;
    int pos1[2][2];
    int k;

protected:
    // draw battle field
    void paintEvent(QPaintEvent *event) override;
    // listen to the key press event
    void keyPressEvent(QKeyEvent *event) override;
private slots:
    void on_actionOpen_triggered();
};
#endif // MAINWINDOW_H
