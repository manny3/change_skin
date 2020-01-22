<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrap">
        <div class="footer-link">
          <router-link
          @click.native="menuOpen = false"
          to="/products">產品列表</router-link>
          <router-link
          @click.native="menuOpen = false"
          to="/discounts">優惠訊息</router-link>
        </div>
        <div class="footer-data">
          <p>地址：彰化縣溪湖鎮彰水路二段762號</p>
          <p>TEL：（04）8852111</p>
          <p>信箱：test555@gmail.com</p>
          <div class="footer-icon">
            <a href="#" target="_blank">
                <i class="fab fa-2x fa-facebook-square"></i>
            </a>
            <a href="#" target="_blank">
                <i class="fab fa-2x fa-instagram"></i>
            </a>
            <a href="#" target="_blank">
                <i class="fab fa-2x fa-line"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center py-3">
      Copyright © 2020 版型
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="scss">
  .footer {
    background-color: #343a40;
    color: #fff;
    .footer-wrap {
      padding-top: 3rem;
      display: flex;
      justify-content: space-around;
      @media (max-width: 767px) {
        display: block;
        > *:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
    .footer-link {
      text-align: center;
      > *:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      a {
        line-height: 1.4;
        color: #fff;
        display: block;
        position: relative;
        text-decoration: none;
        &:after {
          content: '';
          width: 0;
          height: 2px;
          background-color: #fff;
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        &:hover {
          &:after {
            width: 100%;
            @media (max-width: 767px) {
              width: 60%;
            }
          }
        }
      }
    }
    .footer-data {
      text-align: center;
      > *:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      .footer-icon {
        padding-top: 0.5rem;
        > *:not(:last-child) {
          margin-right: 0.5rem;
        }
        a {
          color: #fff;
        }
      }
    }
  }
</style>
