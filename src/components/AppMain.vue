<template>
<div class="clearFix">
  <div class="main_left">
      <div class="main_tit main_L_tit">
          <h3>栏目导航<i>NAVIGATION</i></h3>
        </div>
        <ul class="main_L_nav">
          <li><a href="##">公司简介</a></li>
            <li><a href="##">产品介绍</a></li>
            <li><a href="##">行业资讯</a></li>
            <li><a href="##">联系我们</a></li>
        </ul>
        <a class="main_L_contact" href="##"><img src="@/assets/img/contact.jpg" width="184" height="70" alt="联系我们" /></a>
        <ul class="main_L_address">
          <li>联系地址：杭州下载区杭州下载区杭州下载区xxxx3-2-901</li>
            <li>办公电话：0571-8890Xxxxx</li>
            <li>联系电话：1360000000000</li>
            <li>邮政编码：310000</li>
            <li>电子邮件：xxxxxxks@163.com</li>
        </ul>
    </div>
    
    <router-view/>
</div>
</template>

<script>
export default {
    data () {
        return {
        
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
