import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from '../router';

Vue.use(Vuex);

Vue.use(VueAxios, axios); // TODO(pj) can be replaced
Vue.axios.defaults.baseURL = '/api';

// TODO(pj) fix vue-auth error
Vue.router = router;

// Vue Auth
Vue.use(require('@websanova/vue-auth'), {
  auth1: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  auth: {
    request(req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: 'Bearer ' + token,
      });
    },
    response(res) {
      console.log('res.data', res.data);

      return (res.data || {}).token;
    },
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'role',

  refreshData: {
    enabled: false,
  },

  // token: [
  //   {
  //     request: 'Authorization',
  //     response: 'token',
  //     authType: 'accessToken',
  //     foundIn: 'response',
  //   },
  // ],

  // parseUserData(data) {
  //   return data ? data.data : null;
  // },
  loginData: {
    url: '/auth',
    fetchUser: false,
  },
  logoutData: {
    url: '/auth/logout',
    redirect: '/login',
  },
  fetchData: {
    url: '/users/me',
  },
});

// this.$auth.watch.data = {}; // user object
// this.$auth.watch.loaded = true;
// this.$auth.watch.authenticated = true;
// v-if="$auth.ready()"

// axios.interceptors.request.use((config) => {
//   return config;
// }, (err) => {
//   return Promise.reject(err);
// });

const store = new Vuex.Store({
  state: {
    defaultPageSize: 10,
    user: {},

    // task: crud
    task: {},
    tasksCount: 0,
    tasks: [],
    tasksPage: 1,
    tasksPageSize: 10,
    loadingTasks: false,
    loadingTasksError: null,
  },

  mutations: {
    GET_TASKS(state, flag) {
      state.loadingTasks = flag;
    },
    GET_TASKS_SUCCESS(state, data) {
      state.tasksCount = data.count;
      state.tasks = data.rows;
    },
    GET_TASKS_FALIURE(state, err) {
      state.loadingTasksError = err;
    },
  },

  actions: {
    getTasks({ commit, state }, payload) {
      commit('GET_TASKS', true);

      axios
        .get('/tasks', {
          limit: state.tasksPageSize,
          page: state.tasksPage,
          ...payload,
        })
        .then(res => {
          commit('GET_TASKS_SUCCESS', res.data);
        })
        .catch(err => {
          commit('GET_TASKS_FALIURE', err);
        })
        .finally(() => {
          commit('GET_TASKS', false);
        });
    },
  },
});

export default store;
