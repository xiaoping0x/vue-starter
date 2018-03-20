import Vue from 'vue';
import Router from 'vue-router';
import { loginRouter, page500, page403, page404 } from './common';
import tasks from './tasks';

Vue.use(Router);

export default new Router({
  routes: [
    loginRouter,
    tasks,
    page500,
    page403,
    page404,
  ],
});
