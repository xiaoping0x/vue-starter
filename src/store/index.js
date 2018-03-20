import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vapi from 'vuex-rest-api';
import router from '../router';
import vapiPatch from './vapi-patch';
import initVueAuth from './init-vue-auth';
import plugin from './local-plugin';

function byId(name) {
  return ({ dispatch }, id) => dispatch(name, {
    params: {
      id,
    },
  });
}

function updateById(name) {
  return ({ dispatch }, item) => dispatch(name, {
    params: {
      id: item.id,
    },
    data: item,
  });
}

vapiPatch(Vapi);

Vue.use(Vuex);

Vue.use(VueAxios, axios); // TODO(pj) can be replaced
// Vue.axios.defaults.baseURL = '/api';

initVueAuth(Vue, router);

const oldStore = JSON.parse(localStorage.getItem('ido-store'));

const api = new Vapi({
  baseURL: '/api',
  state: oldStore || {
    defaultPageSize: 10,
    user: {},

    tasks: [],
    tasksPage: 1,
    tasksPageSize: 10,
    task: {},
  },
});

api.rest('task');

const store = api.getStore();
store.plugins = [plugin];

store.actions.getTaskById = byId('getTask');
store.actions.updateTaskById = updateById('updateTask');
store.actions.deleteTaskById = byId('deleteTask');

export default new Vuex.Store(store);
