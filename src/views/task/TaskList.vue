<template>
<div class="view-container">
  <router-link class="ivu-btn ivu-btn-primary" :to="{ name: 'tasks/create' }">创建任务</router-link>
  <Table :columns="columns" :data="tasks.rows" :loading="loadingTasks"></Table>
  <Page :total="tasks.count" show-sizer show-total show-elevator></Page>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { link, button } from '../../utils/renders';

export default {
  data() {
    const vm = this;

    return {
      columns: [
        {
          title: '标题',
          key: 'title',
        },
        {
          title: '描述',
          key: 'description',
        },
        {
          title: '状态',
          width: 80,
          align: 'center',
          key: 'status',
        },
        {
          title: '奖励',
          width: 80,
          align: 'center',
          key: 'rewards',
        },
        {
          title: '报名人数',
          width: 100,
          align: 'center',
          key: 'maxJobs',
        },
        {
          title: '开始时间',
          width: 160,
          align: 'center',
          key: 'startedAt',
        },
        {
          title: '结束时间',
          width: 160,
          align: 'center',
          key: 'finishedAt',
        },
        {
          title: '操作',
          width: 210,
          align: 'center',
          key: 'id',
          render(h, params) {
            const id = params.row[params.column.key];

            return h('span', [
              link(h, '查看', 'tasks/detail', id),
              link(h, '编辑', 'tasks/update', id),
              button(h, '删除', () => vm.deleteTaskById(id))
            ])
          }
        },
      ],
    };
  },

  computed: {
    ...mapState({
      loadingTasks: ({ pending }) => pending.tasks,
      loadingTasksError: ({ error }) => error.tasks,
      tasks: 'tasks',
    }),
  },

  created() {
    this.getTasks();
  },

  methods: {
    ...mapActions(['getTasks', 'deleteTaskById']),
  },
};
</script>
