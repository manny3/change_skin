
<template>
  <div class="productlist">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="minor">
          <div class="minor_title text_main">
            <h2 class="font-h3">
              {{selected}}
            </h2>
          </div>
          <div class="minor_sort">
            <div class="row justify-content-end">
              <div class="col-md-auto col-12">
                <select class="form-control"
                v-model="selected">
                  <option :value="'所有商品'" selected>所有商品</option>
                  <option
                  v-for="item in categories" :key="item"
                  :value="item">{{ item }}</option>
                </select>
              </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12 p-3" v-for="(item) in filterData" :key="item.id">
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
                  <div class="product_link">
                    <button class="btn btn-outline-secondary w-100" @click.stop="itemPage(item.id)">
                      詳情
                    </button>
                    <button class="btn btn-outline-primary w-100"
                    @click="addtoCart(item.id)">
                      加入購物車
                    </button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      selected: '',
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
    ...mapGetters(['isLoading']),
    ...mapGetters('productModules', ['categories', 'products']),
  },
  methods: {
    ...mapActions('productModules', ['getProducts']),
    addtoCart(id, qty = 1) {
      const vm = this;
      vm.$store.dispatch('cartModules/addToCart', { id, qty });
    },
    itemPage(id) {
      const vm = this;
      vm.$router.push(`product/${id}`);
    },
  },
  created() {
    const vm = this;
    vm.getProducts();
    vm.selected = '所有商品';
  },
};
</script>

<style scoped lang="scss">
  .minor {
    padding: 2rem 0;
    >*:not(:last-child){
      margin-bottom: 1rem;
    }
  }
  .minor_title {
    background-image: url('../../assets/images/productTitle.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    position: relative;
    display: flex;
    align-items: center;
    h2 {
      color: #fff;
      margin-left: 5rem;
      @media (max-width: 767px) {
        margin-left: 2rem;
      }
    }
  }
  .minor_sort {
    select {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
      margin-left: auto;
      width: auto;
      &:hover {
        border: 1px solid #ff544e;
      }
    }
  }
  .product_list {
    margin-bottom: 3rem;
    transition: box-shadow .5s ease,;
    box-shadow: 9px 10px 5px 0px #F8F8F8;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      box-shadow: 9px 10px 0px 0px rgba(255,139,167,1);
    }
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
      .product_link {
        text-align: center;
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
