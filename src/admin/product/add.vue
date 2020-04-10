<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formNode" status-icon label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model.trim="formData.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="none-line-height" label="正文" prop="content">
        <ueditor v-model.trim="formData.content" :options="options" id="news-add" ref="ueditor"></ueditor>
      </el-form-item>
      <el-form-item class="news-add">
        <el-button @click="$router.back();">返回</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import { postProductAdd } from '@/api/product'

export default {
  data () {
    return {
      formData: {
        title: '',
        content: '',
      },

      options: {
        UEDITOR_HOME_URL: '/static/ueditor/',
        initialFrameWidth: '100%',
      },

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },//required: true,必填   trigger: 'blur' 失去焦点时触发
        ],
        content: [
          { required: true, message: '请输入正文', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submit(){
      this.$refs.formNode.validate((valid) => {//$refs获取节点formNode节点名称 validate验证 如果前面rule通过valid为true若标题或正文为空则false
        if(valid){
          this.postProductAdd();//如果成功，提交请求发一个数据给后台，然后插入到数据库---->设置api接口（new.js）
        }
      });
    },
    postProductAdd(){
      var data = this.formData;
      postProductAdd({
        data
      }).then(res =>{
        var code = res.data.code;
        if(code == 0){//成功
          this.$message({
            message: res.data.msg,
            type: 'success'
          });

          this.formData = {//清空数据
            title: '',
            content: '',
          };
          this.$router.push('/admin/product');//跳转到列表页面
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err =>{
        this.$message({
          message: 'Error',
          type: 'error'
        });
      });
    }
  },
  watch: {
    ['formData.content'](newval,oldval){
      this.$refs.formNode.validateField('content');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news-header{
  text-align: right;
  margin-bottom: 10px;
}
.news-add{
  text-align: right;
}
/deep/.none-line-height .el-form-item__content{
  line-height: inherit;
}
</style>
