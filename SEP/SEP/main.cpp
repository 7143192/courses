/*
 * QT Exam by IPADS@SJTU.
 * All rights reserved.
 * */

#include <QApplication>
#include "mainWindow.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    MainWindow mainWindow;
    mainWindow.show();
    return app.exec();
}
