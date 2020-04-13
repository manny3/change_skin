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
import FixedNav from '@/components/front/FixedNav.vue';
import Footer from '@/components/front/Footer.vue';
import Alertmsg from '@/components/AlertMessage.vue';

export default {
  components: {
    FixedNav,
    Footer,
    Alertmsg,
  },
  metaInfo() {
    return {
      title: 'Change Skin',
      meta: [
        { property: 'keywords', content: 'Change Skin、保養品、洗髮乳、沐浴乳、乳液、保養組' },
        { property: 'description', content: '融納植物精華，綻放青春年華，為妳的肌膚留住潤澤與養分，令肌膚長期保持晶瑩剔透。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://manny3.github.io/change_skinUI/' },
        { property: 'og:description', content: '融納植物精華，綻放青春年華，為妳的肌膚留住潤澤與養分，令肌膚長期保持晶瑩剔透。' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .home_wrap{
    margin-top: 57px;
    min-height: 700px;
    @media (min-width: 991px) {
      margin-top: 80px;
    }
  }
</style>
