<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formNode" status-icon label-width="100px">
      <el-form-item label="图片" prop="imgUrl">
        <div v-if="isEditStatus">
          <div><img :src="formData.imgUrl" height="100" alt=""></div>
          <el-button class="file-upload" type="primary" v-if="fileData == null">
            上传<i class="el-icon-upload el-icon--right"></i>
            <label class="file-upload-label">
              <input type="file" ref="fileNode" accept=".jpg,.jpeg,.png,.gif" @change="uploadFun">
            </label>
          </el-button>
          <el-tag v-else closable type="info" @close="()=>{ fileData = null; }">{{ fileData.name }}</el-tag>
          <div v-show="isShowFileError" class="el-form-item__error">请输选择图片文件</div>
        </div>
        <img v-else :src="formData.imgUrl" height="100" alt="">
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input type="text" v-model.trim="formData.address" :disabled="!isEditStatus"></el-input>
      </el-form-item>
      <el-form-item label="办公电话" prop="officeTel">
        <el-input type="text" v-model.trim="formData.officeTel" :disabled="!isEditStatus"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactTel">
        <el-input type="text" v-model.trim="formData.contactTel" :disabled="!isEditStatus"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="postcode">
        <el-input type="text" v-model.trim="formData.postcode" :disabled="!isEditStatus"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input type="text" v-model.trim="formData.email" :disabled="!isEditStatus"></el-input>
      </el-form-item>
      <el-form-item class="news-add">
        <el-button v-if="!isEditStatus" type="primary" @click="isEditStatus = true;">编辑</el-button>
        <el-button v-if="isEditStatus" @click="close()">返回</el-button>
        <el-button v-if="isEditStatus" type="primary" @click="submit()">修改</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import { getContact ,putContact } from '@/api/contact'

export default {
  data () {
    return {
      formData: {
        imgUrl:'',
        address: '',
        officeTel: '',
        contactTel: '',
        postcode: '',
        email: '',
      },

      isEditStatus: false,//true表示是在编辑状态，false表示查看状态
      isShowFileError: false,//是否显示文件的错误提示
      fileData: null,//记录文件对象

      rules: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        officeTel: [
          { required: true, message: '请输入办公电话', trigger: 'blur' },
          { pattern:/^[0-9]{8}$/,message:'请输入0-9范围的8位固话', trigger: 'blur'},
        ],
        contactTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern:/^134291(0|1|2|4)([0-9]{4})$/,message:'请输入1342910、1342912、1342911、1342914开头+4的手机号', trigger: 'blur'},
        ],
        postcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { pattern:/^[0-9]{6}$/,message:'请输入0-9范围的6位邮政编码', trigger: 'blur'},
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', pattern:/^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/,message:'请输入正确的邮箱格式', trigger: 'blur'},
        ],
      }
    }
  },
  created(){
    this.getContact();
  },
  methods: {
    close(){
      this.isEditStatus = false;
      this.isShowFileError = false;
      this.getContact();
      this.$refs.formNode.clearValidate();
    },
    submit(){
      let isValid = false;//false校验不通过，true表示通过
      if(this.fileData){
        isValid = true;
        this.isShowFileError = false;
      }
      else{
        this.isShowFileError = true;
      }

      this.$refs.formNode.validate((valid) => {
        if(valid && isValid){//进入if表明所有的字段都符合输入要求
          var data = new FormData();
          data.append('file',this.fileData);//写入文件
          data.append('address',this.formData.address);
          data.append('officeTel',this.formData.officeTel);
          data.append('contactTel',this.formData.contactTel);
          data.append('postcode',this.formData.postcode);
          data.append('email',this.formData.email);
          putContact({
            data
          }).then(res =>{
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.close();
          }).catch(err =>{
            this.$message({
              message: 'Error',
              type: 'error'
            });
          });
        }
      });
    },
    uploadFun(e){
      var file = e.target.files[0];
      this.fileData = file;
      this.isShowFileError = false;
    },
    getContact(){
      getContact({}).then(res =>{
        var data = res.data.data;
        this.formData = data;
      }).catch(err=>{
        console.log(err);
      })
    },

  },
  watch: {
   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
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
.file-upload{
  position: relative;
  overflow: hidden;
  .file-upload-label{
    position: absolute;
    left:0;top:0;
    width: 100%;height: 100%;
  }
  [type='file']{
    opacity: 0;//表示完全透明
    position: absolute;
  }
}
/deep/{
  .el-input.is-disabled .el-input__inner{
    background: transparent;
    border-color: transparent;
    color: #000;
    cursor: auto;
  }
}
</style>
