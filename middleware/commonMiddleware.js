import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '../config.js';

export const setupMiddlewares = (app) => {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    // Serve static files from public directory
    app.use(express.static(config.paths.static));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
};