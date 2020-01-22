
<template>
  <div class="discount">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <section class="mt-5">
        <div class="block_list_content">
          <h2>優惠訊息</h2>
        </div>
        <div class="discount_list">
          <div class="discount_item" v-for="(item) in coupons" :key="item.id">
            <div class="discount_item_title text-danger">{{ item.title }}</div>
            <div class="discount_item_percent">{{ 100 - item.percent }}％OFF</div>
            <div class="discount_item_code">CODE:{{ item.code }}</div>
            <div class="discount_item_date">到期日：{{ item.due_date | date }}</div>
          </div>
        </div>
      </section>
      <div class="discount_btn mt-3 text-right">
        <router-link to="/products" tag="button" class="btn btn-outline-primary rounded-pill">購物去<i class="fas fa-long-arrow-alt-right"></i></router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      coupons: [],
      isLoading: false,
    };
  },
  methods: {
    getCoupons() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            vm.isLoading = false;
            vm.coupons = res.data.coupons;
          }
        });
    },
  },
  created() {
    const vm = this;
    vm.getCoupons();
  },
};
</script>

<style scoped lang="scss">
  .discount {
    padding: 2rem 0;
  }
  .block_list_content {
    padding: 0 6rem 3rem;
    h2 {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      &:after {
        content: '';
        width: 50%;
        height: 4px;
        background-color: #000;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    @media (max-width: 767px) {
      padding: 0 3rem 5rem;
    }
    @media (max-width: 565px) {
      padding: 0 1rem 5rem;
    }
  }
  .discount_list {
    >*:not(:last-child){
      margin-bottom: 3rem;
    }
    .discount_item{
      font-size: 1.75rem;
      background-image: url(../../assets/images/discount_bg.jpg);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      padding: 2rem;
      .discount_item_title {
        text-align: left;
      }
      .discount_item_percent {
        font-size: 5rem;
        font-weight: 700;
        text-align: center;
        @media (max-width: 565px) {
          font-size: 2rem;
      }
      }
      .discount_item_code {
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        @media (max-width: 565px) {
          font-size: 2rem;
      }
      }
      .discount_item_date {
        text-align: right;
      }
    }
  }
</style>
