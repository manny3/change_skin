
<template>
  <div class="checkpay">
    <div class="container">
      <form @submit.prevent="payOrder">
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
        <div class="text-right mt-3" v-if="order.is_paid === false">
          <button class="btn btn-outline-primary rounded-pill">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.order = res.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(url).then((res) => {
        if (res.data.success) {
          vm.getOrder();
          vm.$bus.$emit('messsage:push', res.data.message, 'success');
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
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
