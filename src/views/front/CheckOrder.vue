
<template>
  <div class="checkout">
     <Loading :active.sync="isLoading"></Loading>
    <div class="container">
      <div class="empty_cart" v-if="cart.carts.length === 0">
        <div class="empty_cart_img">
          <img src="../../assets/images/img-cart.png" class="img-fluid" alt="empty_cart_img">
        </div>
        <h3>目前購物車是空的</h3>
        <div class="empty_cart_btn">
        <router-link to="/products" tag="button" class="btn btn-outline-primary btn-lg">購物去</router-link>
      </div>
      </div>
      <div class="row" v-if="cart.carts.length > 0">
        <div class="col-md-6 col-12">
          <div class="cart_table shadow" >
            <table class="table mb-0">
              <thead class="cart_table_head">
                <tr>
                  <th width="60">刪除</th>
                  <th>商品名稱</th>
                  <th class="text-center">數量</th>
                  <th class="text-right">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <a @click.prevent="removeCartItem(item.id)" class="text-danger">
                      <i class="fas fa-times-circle fa-lg"></i>
                    </a>
                  </td>
                  <td>
                    {{ item.product.title }}
                  </td>
                  <td class="text-center">
                    <span class="px-3">
                      {{ item.qty }}/{{ item.product.unit }}
                    </span>
                  </td>
                  <td class="text-right">
                    {{ item.total }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                      <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" @click="addCouponCode">
                          套用優惠碼
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="text-right">總計</td>
                  <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">{{ cart.final_total | round }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="cart_from">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <form  @submit.prevent="handleSubmit(createOrder)" >
                <div class="form-group">
                  <label for="useremail" class="cart_from_title mb-2"><span>*</span>Email</label>
                  <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <input v-model="form.user.email" class="form-control form-control-sm" id="useremail" type="email"
                  :class="{'is-invalid': errors[0]}"
                  placeholder="請輸入Email">
                  <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="username" class="cart_from_title mb-2"><span>*</span>收件人姓名</label>
                  <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                  <input v-model="form.user.name" class="form-control form-control-sm" id="username" type="text"
                  :class="{'is-invalid': errors[0]}"
                  placeholder="請輸入姓名">
                  <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="usertel" class="cart_from_title mb-2"><span>*</span>收件人電話</label>
                  <ValidationProvider name="電話" rules="required" v-slot="{ errors }">
                  <input v-model="form.user.tel" class="form-control form-control-sm" id="usertel" type="tel"
                  :class="{'is-invalid': errors[0]}"
                  placeholder="請輸入電話">
                  <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="address" class="cart_from_title mb-2"><span>*</span>收件人地址</label>
                  <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
                  <input v-model="form.user.address" class="form-control form-control-sm" id="address" type="text"
                  :class="{'is-invalid': errors[0]}"
                  placeholder="請輸入地址">
                  <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="useraddress" class="cart_from_title mb-2">留言</label>
                  <textarea name="" id="" class="form-control form-control-sm" cols="30" rows="10"
                  v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                  <button class="btn btn-outline-primary">送出訂單</button>
                </div>
              </form>
            </ValidationObserver>
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
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartModules', ['cart']),
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
    removeCartItem(id) {
      const vm = this;
      vm.$store.dispatch('cartModules/removeCartItem', id);
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.dispatch('updateLoading', true);
      vm.$http.post(url, { data: coupon }).then((res) => {
        if (res.data.success) {
          vm.$store.dispatch('cartModules/getCart');
        } else {
          vm.$bus.$emit('messsage:push', res.data.message, 'danger');
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.post(url, { data: order }).then((res) => {
        if (res.data.success) {
          vm.$router.push(`/check_pay/${res.data.orderId}`);
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    const vm = this;
    vm.$store.dispatch('cartModules/getCart');
  },
};
</script>

<style scoped lang="scss">
  .checkout {
    padding: 2rem 0;
  }
  .empty_cart{
    >:not(:last-child){
      margin-bottom: 3rem;
    }
    .empty_cart_img{
      text-align: center;
      img {
        width: 250px;
      }
    }
    h3 {
      text-align: center;
    }
    .empty_cart_btn {
      text-align: center;
    }
  }
  .cart_table {
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 5px;
    }
    .cart_table_head {
      background-color: #e6e6e6;
      font-weight: bold;
    }
    th, td {
      white-space: nowrap;
      vertical-align: middle;
    }
  }
  .cart_from{
    @media (max-width: 768px) {
      margin-top: 3rem;
    }
    .cart_from_title {
      background-color: #e6e6e6;
      display: block;
      padding: 0.5rem;
      font-weight: bold;
      span {
        color:red;
      }
    }
  }
</style>
