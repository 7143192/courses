TEMPLATE = app
CONFIG += console c++11
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += \
        HashTable.cpp \
        SkipList.cpp \
        main.cpp

HEADERS += \
    Container.h \
    HashTable.h \
    SkipList.h
