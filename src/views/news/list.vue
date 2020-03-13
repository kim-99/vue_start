<template>
  <div class="list_right">
      <div class="list_tit"><span><i>◆</i></span>您现在所在的位置：<a href="##">首页</a>&gt;行业资讯</div>
        <ul class="news_list">
          <!-- <li><em>2013-3-08</em><a href="##" target="_blank">{{contentData.title}}</a></li> -->
          <li v-for="(item,index) in listData" :key="item.id"><em>{{ parseDate(item.createDate) }}</em><router-link :to="'/news/detail/'+item.id">{{ item.title }}</router-link></li>
        </ul>
        <div class="page">
          <!-- <a class="page_Cur" href="##">1</a>
            <a href="##">2</a>
            <a href="##">3</a>
            <a href="##">4</a>
            <a href="##">5</a>
            <span>...</span>
            <a href="##">18</a>
            <a href="##">19</a>
            <a href="##">20</a> -->
            <a v-for="item in totalPage()" :key="item" href="javascript:;" :class="{'page_Cur':page.page==item}" @click="changePage(item)" style="margin-right: 10px;">{{ item }}</a>
        </div>
    </div>
</template>

<script>
import { getNews } from '@/api/news'
import { parseDate } from '@/utils/date';

export default {
  data () {
    return {
      listData: [],//列表数据

      page:{
        total:0,
        page:1,
        pageNum:10,
      },
    }
  },
  created() {
    this.getNews();
  },
  methods: {
    parseDate: parseDate,
    getNews() {
      var _this = this;
      getNews({
        params: {
          page: _this.page.page,
        },
      }).then(function(res) {
        console.log(res);
        var data = res.data.data;
        _this.listData = data;
        _this.page.total = res.data.total;
      }).catch(function(err) {
        console.log(err);
      });
    },
    totalPage(){
      return Math.ceil(this.page.total/this.page.pageNum);
    },
    changePage(page){
       var _this = this;
      _this.page.page = page;
      _this.getNews();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

