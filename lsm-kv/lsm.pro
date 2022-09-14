TEMPLATE = app
CONFIG += console c++14
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += \
        correctness.cpp \
        kvstore.cpp

HEADERS += \
    Compaction.h \
    MurmurHash3.h \
    kvstore.h \
    kvstore_api.h \
    test.h \
    utils.h
