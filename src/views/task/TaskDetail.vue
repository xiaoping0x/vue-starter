<template>
<div class="view-container">
  <h2>Task detail</h2>

  {{ task }}

  <router-link class="ivu-btn ivu-btn-ghost" :to="{ name: 'tasks/list' }">返回</router-link>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['task']),
  },

  created() {
    this.getTaskById(this.$route.params.id);
  },

  methods: {
    ...mapActions(['getTaskById']),
  },
};
</script>
