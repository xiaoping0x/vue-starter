export default function(Vue, router) {
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
      url: '/api/auth',
      fetchUser: false,
    },
    logoutData: {
      url: '/api/auth/logout',
      redirect: '/login',
    },
    fetchData: {
      url: '/api/users/me',
    },
  });

  // init axios
  Vue.axios.interceptors.response.use((config) => {
      return config;
    }, (err) => {
      const status = err.response.status;

      if (status === 401) {
        Vue.auth.logout({
          redirect: { name: 'login' },
        });
      } else if (status === 500) {
        Vue.router.push({ name: 'error-500' });
      }

      return Promise.reject(err);
    },
  );
}
