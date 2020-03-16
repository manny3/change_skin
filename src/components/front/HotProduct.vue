<template>
  <div class="hot_product">
    <h2 class="hot_product_title">熱門商品</h2>
    <div class="container">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(item) in products" :key="item.id">
          <div class="product_list" @click="itemPage(item.id)">
            <div class="product_photo">
              <img :src="item.imageUrl" class="img-fluid" :alt=" item.title">
            </div>
              <div class="product_content text_main">
                <div class="product_title text-primary">
                  <h5>{{ item.title }}</h5>
                </div>
                <div class="badge badge-secondary">{{ item.category }}</div>
                <div class="product_price">
                  <del>原價:{{ item.origin_price }}</del>
                  <h4 class="text-justify">特價：{{ item.price }}</h4>
                </div>
              </div>
          </div>
          </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          565: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

        },
      },
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.selected === '所有商品') {
        return vm.products;
      }
      return vm.products.filter((item) => {
        const data = item.category.toLowerCase().includes(vm.selected.toLowerCase());
        return data;
      });
    },
    ...mapGetters('productModules', ['categories', 'products']),
  },
  methods: {
    ...mapActions('productModules', ['getProducts']),
    itemPage(id) {
      const vm = this;
      vm.$router.push(`product/${id}`);
    },
  },
  created() {
    const vm = this;
    vm.getProducts();
  },
};
</script>

<style scoped lang="scss">
  .hot_product {
    padding: 5rem 0;
    .hot_product_title {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      color: #cb1340;
      &:after {
        content: '';
        width: 50%;
        height: 3px;
        background-color: #cb1340;
        position: absolute;
        bottom: -40%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .product_list {
    margin-bottom: 3rem;
    box-shadow: 9px 10px 5px 0px #F8F8F8;
    border-radius: 20px;
    cursor: pointer;
    .product_content {
      padding: 1rem;
      background-color: #fff;
      position: relative;
      border-radius: 0 0 20px 20px;
      > *:not(:last-child) {
        margin-bottom: 1rem;
      }
      .product_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .product_price {
        > *:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
    .product_photo {
      text-align: center;
      img {
        height: 250px;
        object-fit: cover;
        border-radius: 20px 20px 0px 0px;
        @media (max-width: 767px) {
          width: 100%;
        }
      }
    }
  }
</style>
