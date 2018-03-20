<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="form" :model="formModel" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="formModel.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formModel.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      formModel: {
        username: 'pj@pj.com',
        password: 'pj#123',
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.doSubmit();
        }
      });
    },
    doSubmit() {
      // access_token: 'g1HN3rrHxWc9HngdMNBWRXY3Oidbl2as',
      const ret = this.$auth.login({
        auth: this.formModel,
        rememberMe: true,
      }).then(res => {
        console.log('login ret', ret, this.$auth, res);

        this.$router.push({
          name: 'tasks',
        });
      }).catch(err => {
        console.error('login error', err);
      });
    },
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  &-con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%, -50%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>

