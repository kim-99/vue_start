<template>
<div style="float: left;">
  <div class="main_middle">
    <div class="main_tit main_M_tit">
        <h3>公司简介<i>ABOUT US</i></h3>
          <a href="##">更多&gt;&gt;</a>
      </div>
      <div class="main_M_intr">
        <img src="@/assets/img/intr.jpg" width="140" height="140" alt="公司简介" />
          <div v-html="data1"></div>
      </div>
      <div class="main_tit main_M_tit">
        <h3>产品简介<i>PRODUCTS</i></h3>
          <a href="##">更多&gt;&gt;</a>
      </div>
      <div class="main_pro_list">
        <div class="main_pro_div">
              <!-- <dl>
                  <dt><a href="##"><img src="@/assets/img/1.jpg" width="125" height="125" alt="产品1" /></a></dt>
                  <dd><a href="##">产品电器F0000001号</a></dd>
              </dl> -->
              <dl v-for="item in productData" :key="item.id">
                  <dt><a href="##"><img src="@/assets/img/1.jpg" width="125" height="125" alt="产品1" /></a></dt>
                  <dd><a href="##">{{item.title}}</a></dd>
              </dl>
           </div>
      </div>
  </div>
  <div class="main_right">
    <div class="main_tit main_R_tit">
        <h3>行业资讯<i>News</i></h3>
          <a href="##">更多&gt;&gt;</a>
      </div>
      <div class="main_R_flash">
        <ul class="m_R_img">
            <li><a href="##"><img width="190" height="190" src="@/assets/img/1.jpg" alt="图" /></a></li>
              <li class="m_R_imgCur"><a href="##"><img width="190" height="190" src="@/assets/img/intr.jpg" alt="图" /></a></li>
              <li><a href="##"><img width="190" height="190" src="@/assets/img/contact.jpg" alt="图" /></a></li>
          </ul>
          <ul class="m_R_btn">
            <li>1</li>
              <li class="m_R_btnCur">2</li>
              <li>3</li>
          </ul>
      </div>
      <ul class="main_R_news">
          <!-- <li><i>&gt;</i><a href="##">的说法撒旦发射撒旦撒旦飒沓</a></li> -->
          <li v-for="item in newsData" :key='item.id'><i>&gt;</i><a href="##">{{ item.title }}</a></li>
      </ul>
  </div>
</div>
</template>

<script>
import { getIndex } from '@/api/index'

export default {
  data () {
    return {
      data1:{},
      newsData:[],
      productData:[],
    }
  },
 created() {
    this.getIndex();
  },
  methods: {
    getIndex() {
      var _this = this;
      var id = _this.$route.params.id;//获取路径上的id值
      getIndex({
        params: {
          a:1
        },
      }).then(function(res) {
        console.log(res);
        // var data = res.data.data;
        _this.data1=res.data.data1;
        _this.newsData = res.data.newsData;
        _this.productData=res.data.productData;
      }).catch(function(err) {
        console.log(err);
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
