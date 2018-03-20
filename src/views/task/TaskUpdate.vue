<template>
<div class="view-container">
  <TaskForm :initialModel="task" :isUpdate="true"></TaskForm>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TaskForm from './TaskForm';

export default {
  components: {
    TaskForm,
  },

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
