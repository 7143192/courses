TEMPLATE = app
CONFIG += qt console warn_on depend_includepath testcase
CONFIG -= app_bundle
QT += testlib
SOURCES += \
        main.cpp \
        simple.cpp \
        simpletest.cpp

HEADERS += \
    simple.h \
    simpletest.h
