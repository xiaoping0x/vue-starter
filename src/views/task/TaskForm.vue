<template>
<Form ref="form" :model="formModel" :label-width="80">
  <p class="error" v-if="taskError">Error: {{ taskError.response.data.message }}</p>

  <FormItem label="标题" prop="name">
    <Input type="text" :disabled="hasSubmit" v-model="formModel.title"></Input>
  </FormItem>
  <FormItem label="描述" prop="name">
    <Input type="textarea" :disabled="hasSubmit" v-model="formModel.description"></Input>
  </FormItem>
  <FormItem label="奖励" prop="rewards">
    <InputNumber :disabled="hasSubmit" v-model="formModel.rewards"></InputNumber>
  </FormItem>
  <FormItem label="报名人数" prop="maxJobs">
    <InputNumber :disabled="hasSubmit" v-model="formModel.maxJobs"></InputNumber>
  </FormItem>
  <FormItem label="状态" prop="status">
    <Select :disabled="hasSubmit" v-model="formModel.status">
      <Option value="草稿">草稿</Option>
      <Option value="已发布">已发布</Option>
      <Option value="已结束">已结束</Option>
    </Select>
  </FormItem>
  <FormItem>
    <Button type="primary" :disabled="hasSubmit" @click="handleSubmit">提交</Button>
    <router-link class="ivu-btn ivu-btn-ghost" :to="{ name: 'tasks/list' }">返回</router-link>
  </FormItem>
</Form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
    initialModel: Object,
  },
  data() {
    return {
      hasSubmit: false,
      formModel: {
        name: '',
      },
      formRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
          },
        ],
      },
    };
  },

  computed: {
    ...mapState({
      taskError: ({ error }) => error.task,
    }),
  },

  watch: {
    initialModel: {
      handler(val) {
        this.formModel = Object.assign({}, val);
      }
    },
    immediate: true,
  },

  methods: {
    ...mapActions(['createTask', 'updateTaskById']),

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.doSubmit();
        }
      });
    },
    doSubmit() {
      const model = Object.assign({}, this.formModel);
      delete model.__v;
      delete model._id;

      // 更新成功后需要能够跳转到页面，或者显示报错信息
      // valid=0表示错误，提示message错误信息 this.$Message('error');
      if (this.isUpdate) {
        this.updateTaskById(model);
      } else {
        this.createTask({
          data: model,
        });
      }
    }
  },
};
</script>
