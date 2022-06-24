/********************************************************************************
** Form generated from reading UI file 'game.ui'
**
** Created by: Qt User Interface Compiler version 5.14.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_GAME_H
#define UI_GAME_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Game
{
public:
    QLabel *Label;
    QPushButton *ButtonA;
    QPushButton *ButtonB;
    QLabel *Label1;

    void setupUi(QWidget *Game)
    {
        if (Game->objectName().isEmpty())
            Game->setObjectName(QString::fromUtf8("Game"));
        Game->resize(783, 659);
        Label = new QLabel(Game);
        Label->setObjectName(QString::fromUtf8("Label"));
        Label->setGeometry(QRect(130, 60, 291, 111));
        ButtonA = new QPushButton(Game);
        ButtonA->setObjectName(QString::fromUtf8("ButtonA"));
        ButtonA->setGeometry(QRect(480, 180, 111, 31));
        ButtonB = new QPushButton(Game);
        ButtonB->setObjectName(QString::fromUtf8("ButtonB"));
        ButtonB->setGeometry(QRect(480, 220, 111, 31));
        Label1 = new QLabel(Game);
        Label1->setObjectName(QString::fromUtf8("Label1"));
        Label1->setGeometry(QRect(70, 50, 54, 12));

        retranslateUi(Game);

        QMetaObject::connectSlotsByName(Game);
    } // setupUi

    void retranslateUi(QWidget *Game)
    {
        Game->setWindowTitle(QCoreApplication::translate("Game", "Form", nullptr));
        Label->setText(QCoreApplication::translate("Game", "<html><head/><body><p><br/></p></body></html>", nullptr));
        ButtonA->setText(QCoreApplication::translate("Game", "\345\215\225\344\272\272\346\270\270\346\210\217", nullptr));
        ButtonB->setText(QCoreApplication::translate("Game", "\345\217\214\344\272\272\346\270\270\346\210\217", nullptr));
        Label1->setText(QString());
    } // retranslateUi

};

namespace Ui {
    class Game: public Ui_Game {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_GAME_H
