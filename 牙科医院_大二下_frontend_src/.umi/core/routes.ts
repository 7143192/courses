// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/dentist_frontEnd/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "exact": true,
    "path": "/",
    "component": require('@/pages/index').default
  },
  {
    "exact": true,
    "path": "/home",
    "component": require('@/pages/home').default
  },
  {
    "exact": true,
    "path": "/login",
    "component": require('@/pages/login').default
  },
  {
    "exact": true,
    "path": "/signIn",
    "component": require('@/pages/signIn').default
  },
  {
    "exact": true,
    "path": "/depart",
    "component": require('@/pages/depart').default
  },
  {
    "exact": true,
    "path": "/patient",
    "component": require('@/pages/patient').default
  },
  {
    "exact": true,
    "path": "/registration",
    "component": require('@/pages/registration').default
  },
  {
    "exact": true,
    "path": "/registration/doctor",
    "component": require('@/pages/registration/selectdoctor').default
  },
  {
    "exact": true,
    "path": "/registration/doctor/calender",
    "component": require('@/pages/registration/selectdate').default
  },
  {
    "exact": true,
    "path": "/doctor",
    "component": require('@/pages/doctor').default
  },
  {
    "exact": true,
    "path": "/doctorHome",
    "component": require('@/pages/doctorHome').default
  },
  {
    "exact": true,
    "path": "/location",
    "component": require('@/pages/location').default
  },
  {
    "exact": true,
    "path": "/question",
    "component": require('@/pages/helper').default
  },
  {
    "exact": true,
    "path": "/admin",
    "component": require('@/pages/admin').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
