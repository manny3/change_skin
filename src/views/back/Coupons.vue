<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCoupon(true)">建立新優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠券名稱</th>
          <th width="120">到期日</th>
          <th width="120">折扣百分比</th>
          <th width="100">是否啟用</th>
          <th width="140">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.due_date | date }}</td>
          <td class="text-right">
            {{ item.percent}}%
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
            @click="openCoupon(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelCouponModel(item)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="getCoupons"></Pagination>

    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入標題">
                </div>
                <div class="form-group">
                  <label for="coupon_code">優惠碼</label>
                  <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                    placeholder="請輸入優惠碼">
                </div>
                 <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="due_date">到期日</label>
                    <input type="date" class="form-control" id="due_date"
                      v-model="due_date"
                      placeholder="請輸入到期日">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="percent">折扣百分比</label>
                    <input type="text" class="form-control" id="percent"
                      v-model="tempCoupon.percent"
                      placeholder="請輸入折扣百分比">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateopenCoupon()">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除<span class="text-danger">{{tempCoupon.title}}</span>優惠券
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="delCoupon()">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [
      ],
      pagination: {},
      tempCoupon: {
        due_date: 0,
      },
      due_date: '2020-01-01',
      isNews: false,
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            vm.isLoading = false;
            vm.coupons = res.data.coupons;
            vm.pagination = res.data.pagination;
          }
        });
    },
    openCoupon(isNews, item) {
      $('#couponModal').modal('show');
      if (isNews) {
        this.tempCoupon = {};
        this.isNews = true;
      } else {
        this.tempCoupon = Object.assign({}, item);// 防止物件傳參考
        this.isNews = false;
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
        [this.due_date] = dateAndTime;
      }
    },
    updateopenCoupon() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNews) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon })
        .then((res) => {
          if (res.data.success) {
            $('#couponModal').modal('hide');
            vm.getCoupons();
          } else {
            $('#couponModal').modal('hide');
            vm.getCoupons();
          }
        });
    },
    openDelCouponModel(item) {
      $('#delCouponModal').modal('show');
      this.tempCoupon = Object.assign({}, item);
    },
    delCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.isLoading = true;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          $('#delCouponModal').modal('hide');
          vm.getCoupons();
        } else {
          $('#delCouponModal').modal('hide');
          vm.getCoupons();
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
