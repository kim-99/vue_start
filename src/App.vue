<template>
  <div id="app">
    <app-header></app-header>
    <app-main></app-main>
    <app-footer></app-footer>
    
  </div>
</template>

<script>
import appHeader from '@/components/AppHeader';
import appFooter from '@/components/AppFooter';
import appMain from '@/components/AppMain';

export default {
  name: 'App',
  data(){//储存数据
    return {

    };
  },
  methods: {//储存方法

  },
  components: {//注册组建
    appHeader,//appHeader: appHeader,
    appFooter,
    appMain,
  },
}
</script>

<style lang='scss'>
    // @import url(./assets/css/css.css);
    @import './assets/css/css.css';
</style>
