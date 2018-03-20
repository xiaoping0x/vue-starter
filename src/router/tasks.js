import AdminView from '@/views/AdminView';

export default {
  path: '/tasks',
  name: 'tasks',
  component: AdminView,
  icon: 'key',
  title: '任务管理',
  children: [
    {
      path: '',
      name: 'tasks/list',
      component: () => import('@/views/task/TaskList'),
      title: '任务列表',
    },
    {
      path: 'create',
      name: 'tasks/create',
      component: () => import('@/views/task/TaskCreate'),
      title: '创建任务',
    },
    {
      path: ':id',
      name: 'tasks/detail',
      component: () => import('@/views/task/TaskDetail'),
      title: '任务详情',
    },
    {
      path: ':id/update',
      name: 'tasks/update',
      component: () => import('@/views/task/TaskUpdate'),
      title: '更新任务',
    },
  ],
};
