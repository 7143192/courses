@echo off
SetLocal EnableDelayedExpansion
(set PATH=C:\Qt\Qt5.14.2\5.14.2\mingw73_64\bin;!PATH!)
if defined QT_PLUGIN_PATH (
    set QT_PLUGIN_PATH=C:\Qt\Qt5.14.2\5.14.2\mingw73_64\plugins;!QT_PLUGIN_PATH!
) else (
    set QT_PLUGIN_PATH=C:\Qt\Qt5.14.2\5.14.2\mingw73_64\plugins
)
%*
EndLocal
