/****************************************************************************
** Meta object code from reading C++ file 'Test.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.14.2)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include <memory>
#include "../../Test/Test.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'Test.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.14.2. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_SimpleTest_t {
    QByteArrayData data[12];
    char stringdata0[113];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_SimpleTest_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_SimpleTest_t qt_meta_stringdata_SimpleTest = {
    {
QT_MOC_LITERAL(0, 0, 10), // "SimpleTest"
QT_MOC_LITERAL(1, 11, 9), // "TestCase1"
QT_MOC_LITERAL(2, 21, 0), // ""
QT_MOC_LITERAL(3, 22, 9), // "TestCase2"
QT_MOC_LITERAL(4, 32, 9), // "TestCase3"
QT_MOC_LITERAL(5, 42, 9), // "TestCase4"
QT_MOC_LITERAL(6, 52, 9), // "TestCase5"
QT_MOC_LITERAL(7, 62, 9), // "TestCase6"
QT_MOC_LITERAL(8, 72, 9), // "TestCase7"
QT_MOC_LITERAL(9, 82, 9), // "TestCase8"
QT_MOC_LITERAL(10, 92, 9), // "TestCase9"
QT_MOC_LITERAL(11, 102, 10) // "TestCase10"

    },
    "SimpleTest\0TestCase1\0\0TestCase2\0"
    "TestCase3\0TestCase4\0TestCase5\0TestCase6\0"
    "TestCase7\0TestCase8\0TestCase9\0TestCase10"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_SimpleTest[] = {

 // content:
       8,       // revision
       0,       // classname
       0,    0, // classinfo
      10,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    0,   64,    2, 0x08 /* Private */,
       3,    0,   65,    2, 0x08 /* Private */,
       4,    0,   66,    2, 0x08 /* Private */,
       5,    0,   67,    2, 0x08 /* Private */,
       6,    0,   68,    2, 0x08 /* Private */,
       7,    0,   69,    2, 0x08 /* Private */,
       8,    0,   70,    2, 0x08 /* Private */,
       9,    0,   71,    2, 0x08 /* Private */,
      10,    0,   72,    2, 0x08 /* Private */,
      11,    0,   73,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void SimpleTest::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<SimpleTest *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->TestCase1(); break;
        case 1: _t->TestCase2(); break;
        case 2: _t->TestCase3(); break;
        case 3: _t->TestCase4(); break;
        case 4: _t->TestCase5(); break;
        case 5: _t->TestCase6(); break;
        case 6: _t->TestCase7(); break;
        case 7: _t->TestCase8(); break;
        case 8: _t->TestCase9(); break;
        case 9: _t->TestCase10(); break;
        default: ;
        }
    }
    Q_UNUSED(_a);
}

QT_INIT_METAOBJECT const QMetaObject SimpleTest::staticMetaObject = { {
    QMetaObject::SuperData::link<QObject::staticMetaObject>(),
    qt_meta_stringdata_SimpleTest.data,
    qt_meta_data_SimpleTest,
    qt_static_metacall,
    nullptr,
    nullptr
} };


const QMetaObject *SimpleTest::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *SimpleTest::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_SimpleTest.stringdata0))
        return static_cast<void*>(this);
    return QObject::qt_metacast(_clname);
}

int SimpleTest::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QObject::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 10)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 10;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 10)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 10;
    }
    return _id;
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
