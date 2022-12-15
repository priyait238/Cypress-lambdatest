#!/bin/bash
npm ci
npm start &
npm run e2e:chrome