
<template>
  <div class="checkpay">
    <div class="container">
      <form>
        <!-- @submit.prevent="payOrder" -->
        <div class="order_table">
          <table class="table mb-0">
            <thead>
              <tr>
                <th>商品名稱</th>
                <th>數量</th>
                <th class="text-right">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | round }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | round }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="order_table">
          <table class="table mb-0">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div class="d-flex justify-content-between mt-3" v-if="order.is_paid === false">
        <router-link to="/products" tag="button" class="btn btn-outline-primary">回到商品頁</router-link>
        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#payModal">確認付款去</button>
      </div>
      <div class="text-center mt-3" v-if="order.is_paid === true">
        <router-link to="/products" tag="button" class="btn btn-outline-primary btn-lg">繼續購物</router-link>
      </div>
    </div>
    <div class="modal fade" id="payModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">是否同意授權扣款</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            立即支付 ${{ order.total | round }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="payOrder">確認付款</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$http.get(url).then((res) => {
        vm.order = res.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(url).then((res) => {
        if (res.data.success) {
          vm.getOrder();
          vm.$store.dispatch('alertModules/updateMessage', { message: res.data.message, status: 'success' });
        }
        $('#payModal').modal('hide');
      });
    },
  },
  created() {
    const vm = this;
    vm.orderId = vm.$route.params.orderId;
    vm.getOrder();
  },
};
</script>

<style scoped lang="scss">
  .checkpay {
    padding: 2rem 0;
  }
  .order_table {
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 5px;
    }
    th {
      background-color: #e6e6e6;
      font-weight: bold;
    }
    th, td {
      white-space: nowrap;
      vertical-align: middle;
    }
  }
</style>
