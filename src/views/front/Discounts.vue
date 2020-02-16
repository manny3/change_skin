
<template>
  <div class="discount">
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
        <router-link to="/products" tag="button" class="btn btn-outline-primary">購物去<i class="fas fa-long-arrow-alt-right"></i></router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      coupons: [
        {
          code: '2020SALE',
          due_date: 1582848000,
          id: '-Lz8CxhRWE7Q1nyb6C0D',
          is_enabled: 1,
          num: 1,
          percent: 85,
          title: '年後促銷',
        },
        {
          code: '2020CH',
          due_date: 1585612800,
          id: '-LygcseNS2jQWwoodV5e',
          is_enabled: 1,
          num: 2,
          percent: 80,
          title: '季節優惠',
        },
      ],
    };
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
