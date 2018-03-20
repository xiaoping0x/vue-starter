<template>
<div class="view-container">
  <TaskForm :initialModel="formModel"></TaskForm>
</div>
</template>

<script>
import TaskForm from './TaskForm';

export default {
  components: {
    TaskForm,
  },

  data() {
    return {
      formModel: {},
    };
  },
};
</script>
