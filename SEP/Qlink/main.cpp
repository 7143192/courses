#include "mainwindow.h"
#include "game.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    /*MainWindow w;
    w.show();*/
    Game game;
    game.show();
    return a.exec();
}
