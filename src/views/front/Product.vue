
<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="border-bottom border-primary pb-3 mb-3">
        <h2>{{ product.title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8 col-12 mb-lg-0 mb-3">
          <div class="proitem-main">
            <img :src="product.imageUrl" class="img-fluid" :alt=" product.title">
          </div>
        </div>
        <div class="col-md-4 col-12 align-self-center">
          <div class="border border-secondary p-3">
            <h4 class="font-weight-bold">特價：{{ product.price }} 元/ {{ product.unit }}</h4>
            <del class="d-block mb-3">原價:{{ product.origin_price }}元</del>
            <div class="mb-3">
              <p class="font-h6 mb-2">請選擇數量</p>
              <select class="form-control" v-model="product.num">
                <option>數量</option>
                <option :value="num" v-for="num in 10" :key="num">
                  {{num}} {{product.unit}}
                </option>
              </select>
            </div>
            <button class="btn btn-primary btn-lg"
            @click="addCart(itemID, product.num)">
              <i class="fas fa-cart-plus mr-2"></i>
              <span>加入購物車</span>
            </button>
          </div>
        </div>
      </div>
      <section class="mt-5">
        <div class="row">
          <div class="col-md-8 col-12">
            <div class="block_list_content">
              <h4>產品描述</h4>
              <p class="text-justify px-3">
                {{ product.description }}
              </p>
              <p class="text-justify px-3">
                {{ product.content }}
              </p>
            </div>
          </div>
          <div class="col-md-8 col-12">
            <div class="block_list_content">
              <h4>產品資訊</h4>
              <div class="content_table">
                <table class="table">
                  <tr>
                    <th width="10%">劑型</th>
                    <td width="30%">幕斯</td>
                  </tr>
                  <tr>
                    <th>適用髮質</th>
                    <td>乾燥髮質</td>
                  </tr>
                  <tr>
                    <th>容量</th>
                    <td>500ml</td>
                  </tr>
                  <tr>
                    <th>產地</th>
                    <td>歐洲</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button class="btn btn-outline-primary mb-3" onclick="history.back()"><i class="fas fa-long-arrow-alt-left mr-1"></i>返回</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      product: {},
      itemID: '',
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.product = res.data.product;
        } else {
          vm.$store.dispatch('alertModules/updateMessage', { message: res.data.message, status: 'danger' });
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addCart(id, qty = 1) {
      const vm = this;
      vm.$store.dispatch('cartModules/addToCart', { id, qty });
    },
  },
  created() {
    const vm = this;
    vm.itemID = vm.$route.params.itemID;
    vm.getProduct(vm.itemID);
  },
};
</script>

<style scoped lang="scss">
  .product {
    padding: 2rem 0;
  }
  .block_list_content {
    h4 {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      &:after {
        content: '';
        width: 50%;
        height: 3px;
        background-color: #000;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    padding: 0 3rem 5rem;
    @media (max-width: 767px) {
      padding: 0 3rem 5rem;
    }
    @media (max-width: 565px) {
      padding: 0 1rem 5rem;
    }
    .content_table {
      width: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 5px;
      }
      .content_table_head {
        background-color: #e6e6e6;
        font-weight: bold;
      }
      th, td {
        white-space: nowrap;
        vertical-align: middle;
      }
    }
  }
</style>
