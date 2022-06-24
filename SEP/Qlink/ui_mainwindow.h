/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.14.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenu>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QAction *actionOpen;
    QAction *actionSave;
    QWidget *centralwidget;
    QProgressBar *Bar;
    QProgressBar *bar;
    QLabel *labela1;
    QLabel *labela2;
    QPushButton *button;
    QProgressBar *bar1;
    QLabel *label1;
    QLabel *labelb1;
    QLabel *labelb2;
    QLabel *labelb2_2;
    QLabel *labelb1_2;
    QProgressBar *Bar1;
    QLabel *label;
    QLabel *label_2;
    QLabel *label_3;
    QLabel *label_4;
    QLabel *OutLabel;
    QLabel *OutLabel1;
    QStatusBar *statusbar;
    QMenuBar *menubar;
    QMenu *menuFile;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(894, 620);
        actionOpen = new QAction(MainWindow);
        actionOpen->setObjectName(QString::fromUtf8("actionOpen"));
        actionSave = new QAction(MainWindow);
        actionSave->setObjectName(QString::fromUtf8("actionSave"));
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName(QString::fromUtf8("centralwidget"));
        Bar = new QProgressBar(centralwidget);
        Bar->setObjectName(QString::fromUtf8("Bar"));
        Bar->setGeometry(QRect(30, 0, 621, 21));
        Bar->setValue(24);
        bar = new QProgressBar(centralwidget);
        bar->setObjectName(QString::fromUtf8("bar"));
        bar->setGeometry(QRect(410, 40, 261, 21));
        bar->setValue(24);
        labela1 = new QLabel(centralwidget);
        labela1->setObjectName(QString::fromUtf8("labela1"));
        labela1->setGeometry(QRect(660, 0, 71, 21));
        labela2 = new QLabel(centralwidget);
        labela2->setObjectName(QString::fromUtf8("labela2"));
        labela2->setGeometry(QRect(750, 0, 54, 16));
        button = new QPushButton(centralwidget);
        button->setObjectName(QString::fromUtf8("button"));
        button->setGeometry(QRect(810, 0, 80, 41));
        bar1 = new QProgressBar(centralwidget);
        bar1->setObjectName(QString::fromUtf8("bar1"));
        bar1->setGeometry(QRect(60, 40, 291, 21));
        bar1->setValue(24);
        label1 = new QLabel(centralwidget);
        label1->setObjectName(QString::fromUtf8("label1"));
        label1->setGeometry(QRect(0, 80, 871, 341));
        label1->setMaximumSize(QSize(871, 16777215));
        label1->setStyleSheet(QString::fromUtf8(""));
        labelb1 = new QLabel(centralwidget);
        labelb1->setObjectName(QString::fromUtf8("labelb1"));
        labelb1->setGeometry(QRect(660, 20, 71, 21));
        labelb2 = new QLabel(centralwidget);
        labelb2->setObjectName(QString::fromUtf8("labelb2"));
        labelb2->setGeometry(QRect(750, 20, 54, 16));
        labelb2_2 = new QLabel(centralwidget);
        labelb2_2->setObjectName(QString::fromUtf8("labelb2_2"));
        labelb2_2->setGeometry(QRect(750, 20, 54, 16));
        labelb1_2 = new QLabel(centralwidget);
        labelb1_2->setObjectName(QString::fromUtf8("labelb1_2"));
        labelb1_2->setGeometry(QRect(660, 20, 71, 21));
        Bar1 = new QProgressBar(centralwidget);
        Bar1->setObjectName(QString::fromUtf8("Bar1"));
        Bar1->setGeometry(QRect(30, 20, 621, 21));
        Bar1->setValue(24);
        label = new QLabel(centralwidget);
        label->setObjectName(QString::fromUtf8("label"));
        label->setGeometry(QRect(0, 0, 54, 16));
        label_2 = new QLabel(centralwidget);
        label_2->setObjectName(QString::fromUtf8("label_2"));
        label_2->setGeometry(QRect(0, 20, 41, 16));
        label_3 = new QLabel(centralwidget);
        label_3->setObjectName(QString::fromUtf8("label_3"));
        label_3->setGeometry(QRect(0, 42, 54, 20));
        label_4 = new QLabel(centralwidget);
        label_4->setObjectName(QString::fromUtf8("label_4"));
        label_4->setGeometry(QRect(353, 40, 51, 20));
        OutLabel = new QLabel(centralwidget);
        OutLabel->setObjectName(QString::fromUtf8("OutLabel"));
        OutLabel->setGeometry(QRect(680, 40, 81, 16));
        OutLabel1 = new QLabel(centralwidget);
        OutLabel1->setObjectName(QString::fromUtf8("OutLabel1"));
        OutLabel1->setGeometry(QRect(790, 40, 71, 16));
        MainWindow->setCentralWidget(centralwidget);
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName(QString::fromUtf8("statusbar"));
        MainWindow->setStatusBar(statusbar);
        menubar = new QMenuBar(MainWindow);
        menubar->setObjectName(QString::fromUtf8("menubar"));
        menubar->setGeometry(QRect(0, 0, 894, 21));
        menuFile = new QMenu(menubar);
        menuFile->setObjectName(QString::fromUtf8("menuFile"));
        MainWindow->setMenuBar(menubar);

        menubar->addAction(menuFile->menuAction());
        menuFile->addAction(actionOpen);
        menuFile->addAction(actionSave);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        actionOpen->setText(QCoreApplication::translate("MainWindow", "Open", nullptr));
#if QT_CONFIG(shortcut)
        actionOpen->setShortcut(QCoreApplication::translate("MainWindow", "Ctrl+O", nullptr));
#endif // QT_CONFIG(shortcut)
        actionSave->setText(QCoreApplication::translate("MainWindow", "Save", nullptr));
#if QT_CONFIG(shortcut)
        actionSave->setShortcut(QCoreApplication::translate("MainWindow", "Ctrl+S", nullptr));
#endif // QT_CONFIG(shortcut)
        labela1->setText(QCoreApplication::translate("MainWindow", "A\347\232\204\345\276\227\345\210\206\357\274\232", nullptr));
        labela2->setText(QString());
        button->setText(QCoreApplication::translate("MainWindow", "\346\232\202\345\201\234\351\224\256", nullptr));
        label1->setText(QCoreApplication::translate("MainWindow", "<html><head/><body><p><br/></p></body></html>", nullptr));
        labelb1->setText(QCoreApplication::translate("MainWindow", "B\347\232\204\345\276\227\345\210\206\357\274\232", nullptr));
        labelb2->setText(QString());
        labelb2_2->setText(QString());
        labelb1_2->setText(QCoreApplication::translate("MainWindow", "B\347\232\204\345\276\227\345\210\206\357\274\232", nullptr));
        label->setText(QCoreApplication::translate("MainWindow", "A", nullptr));
        label_2->setText(QCoreApplication::translate("MainWindow", "B", nullptr));
        label_3->setText(QCoreApplication::translate("MainWindow", "Flash", nullptr));
        label_4->setText(QCoreApplication::translate("MainWindow", "Hint", nullptr));
        OutLabel->setText(QString());
        OutLabel1->setText(QString());
        menuFile->setTitle(QCoreApplication::translate("MainWindow", "File", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
