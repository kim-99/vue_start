<template>
  <div class="list_right">
      <div class="list_tit"><span><i>◆</i></span>您现在所在的位置：<a href="##">首页</a>&gt;公司简介</div>
        <div class="deatil">
         <h2>{{ detailData.title }}</h2>
            <span class="deatil_span">发布于：{{ parseDate(detailData.createDate) }}</span>
            <div style="margin-bottom: 30px;" v-html="detailData.content"></div>
        </div>
        <!-- <div class="page">
          <a class="page_Cur" href="##">1</a>
            <a href="##">2</a>
            <a href="##">3</a>
            <a href="##">4</a>
            <a href="##">5</a>
            <span>...</span>
            <a href="##">18</a>
            <a href="##">19</a>
            <a href="##">20</a>
        </div> -->
    </div>
</template>

<script>
import { getProductDetail } from '@/api/product';
import { parseDate } from '@/utils/date';

export default {
  data () {
    return {
      detailData: {},
    }
  },
  created() {
    this.getProductDetail();
  },
  methods: {
    parseDate,
    getProductDetail() {
      var _this = this;
      var id = _this.$route.params.id;//获取路径上的id值
      getProductDetail({
        params: {
          id
        },
      }).then(function(res) {
        console.log(res);
        var data = res.data.data;
        _this.detailData = data;
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
