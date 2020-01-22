<template>
    <div>
        <Navbar/>
        <Alertmsg/>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import Alertmsg from '../AlertMessage.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    Alertmsg,
  },

};
</script>

<style lang="scss" scoped>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
</style>
