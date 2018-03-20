
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
  },
  component: () => import('@/views/Login'),
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在',
  },
  component: () => import('@/views/error-page/404'),
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足',
  },
  name: 'error-403',
  component: () => import('@/views/error-page/403'),
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误',
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500'),
};
