
export const link = (h, text, routeName, id) => h('router-link', {
  class: 'ivu-btn ivu-btn-text',
  props: {
    to: {
      name: routeName,
      params: {
        id,
      },
    },
  },
}, text);

export const button = (h, text, handler) => h('Button', {
  props: {
    type: 'text',
  },
  on: {
    click: handler,
  },
}, text);
