<template>
  <div class=" bg_light">
    <Alertmsg/>
    <FixedNav/>
    <div class="home_wrap">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import FixedNav from '../../components/front/FixedNav.vue';
import Footer from '../../components/front/Footer.vue';
import Alertmsg from '../../components/AlertMessage.vue';

export default {
  components: {
    FixedNav,
    Footer,
    Alertmsg,
  },
};
</script>

<style lang="scss" scoped>
  .home_wrap{
    margin-top: 57px;
    min-height: 700px;
  }
</style>
