<template>
  <div>
    <div class="news-header"><el-button type="primary" @click="$router.push('/admin/product/add')">添加文章</el-button></div>  
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          label="标题">
          <template slot-scope="scope">
           <router-link :to="`/product/detail/${scope.row.id}`">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope">
           {{ parseDate(scope.row.createDate) }} 
          </template>
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" height="50" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="$router.push(`/admin/product/edit/${scope.row.id}`)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click.native="deleteFun(scope.row)"></el-button>
            <el-button class="file-upload" type="primary">
              上传<i class="el-icon-upload el-icon--right"></i>
              <label class="file-upload-label">
                <input type="file" accept=".jpg,.jpeg,.png,.gif" @change="uploadFun($event,scope.row.id)">
              </label>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageNum"
          :current-page="page.page"
          @current-change="currentChange">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import { parseDate } from '@/utils/date';
import { getProduct, deleteProductById, putProductImgById } from '@/api/product'

export default {
  data () {
    return {
      tableData: [],

      page: {//分页数据
        total: 0,
        page: 1,
        pageNum: 8,
      },
    }
  },
  created(){
    this.getProduct();
  },
  methods: {
    parseDate,
    getProduct(){
      getProduct({
        params: this.page
      }).then(res =>{
        var data = res.data.data;
        this.tableData = data;
        this.page.total = res.data.total;
      });
    },
    currentChange(page){
      this.page.page = page;
      this.getProduct();
    },
    deleteFun(row){
      /*var title = row.title;
      var id = row.id;*/
      var { title, id } = row;//等价注释的写法，es6写法，结构赋值
      this.$confirm(`确认删除 - 《${title}》？`, '确认删除信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {//成功的处理
        deleteProductById({
          params: {
            id
          }
        }).then(res =>{
          var { code, msg, data } = res.data;
          if(code == 0){//成功
            this.$message({
              message: msg,
              type: 'success'
            });
            this.getProduct();
          }
          else{
            this.$message({
              message: msg,
              type: 'error'
            });
          }
        }).catch(err =>{
          this.$message({
            message: 'Error',
            type: 'error'
          });
        });
      })
      .catch(action => {//取消的处理
        
      });
    },
    uploadFun(e,id){//e是事件对象，id是指文件的id
      var file = e.target.files[0];
      if(file){
        var formData = new FormData();//创建一个formData类型，把文件转成一个值/临时文件放进数据库
        formData.append('file',file);//append添加到表单里里面
        formData.append('id',id);//--->传到后台，写接口
        putProductImgById({
          data: formData
        }).then(res =>{
          console.log(res);
          this.getProduct();
        }).catch(err =>{
          console.log(err);
        });
      }
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.news-header{
  text-align: right;
  margin-bottom: 10px;
}
.page{
  text-align: right;
}
.file-upload{
  position: relative;
  overflow: hidden;
  .file-upload-label{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
  }
  [type="file"]{
    opacity: 0;
    position: absolute;
  }
}
</style>
