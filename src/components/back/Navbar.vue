<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">後台系統</a>
          <ul class="navbar-nav px-3">
              <li class="nav-item text-nowrap">
              <a class="nav-link" href="#" @click.prevent="loginOut">Sign out</a>
              </li>
          </ul>
      </nav>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(url).then((res) => {
        if (res.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
