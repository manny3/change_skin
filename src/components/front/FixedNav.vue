<template>
  <div class="header bg-light">
    <Loading :active.sync="isLoading"></Loading>
    <div class="container">
      <div class="header_wrap">
        <div class="header_logo">
          <router-link to="/" class="d-block logo_link" >
            <h3>Change Skin</h3>
          </router-link>
        </div>
        <div class="header_items_wrap"
        :class="{ 'menu_item_open': menuOpen === true }">
          <div class="menu">
            <ul>
              <li>
                <router-link class="menu_link d-block"
                @click.native="menuOpen = false"
                to="/products">產品列表</router-link>
              </li>
              <li>
                <router-link class="menu_link d-block"
                @click.native="menuOpen = false"
                to="/discounts">優惠訊息</router-link>
              </li>
            </ul>
          </div>
          <div class="top_icon">
            <router-link to="/login"><i class="fas fa-user"></i>
            </router-link>
            <router-link to="/check_order" class="btn_cart"><i class="fas fa-shopping-cart"></i>
            <span class="badge badge-pill badge-dark" v-if="cart.carts.length !== 0">{{ cart.carts.length }}</span>
            </router-link>
          </div>
        </div>
        <div class="menu_btn d-lg-none d-block"
        :class="{ 'menu_open': menuOpen === true }"
        @click="menuOpen = !menuOpen">
          <a href="javascript: void(0)" class="bar_btn">
            <span></span>
          </a>
        </div>
      </div>
    </div>
    <div class="fixed_cart d-block d-lg-none">
      <router-link to="/check_order" class="btn_cart"><i class="fas fa-shopping-cart fa-2x"></i>
        <span class="badge badge-pill badge-dark" v-if="cart.carts.length !== 0">{{ cart.carts.length }}</span></router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartModules', ['cart']),
  },
  methods: {
    ...mapActions('cartModules', ['getCart']),
  },
  created() {
    const vm = this;
    vm.getCart();
  },
};
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 30;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    padding: 0.5rem 0;
  }
  .header_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_logo {
      font-family: 'Kaushan Script', cursive;
      >.logo_link{
        text-decoration: none;
      }
    }
  }
  .header_items_wrap {
    align-self: center;
    @media (min-width: 992px) {
      display: flex;
    }
    @media (max-width: 991px) {
      position: fixed;
      background: #fff;
      width: 100%;
      top: 61px;
      height: calc(100% - 61px);
      left: 0;
      z-index: 110;
      overflow-y: auto;
      transition: transform 1s ease-in-out;
      transform: translateX(100%);
      padding-top: 1rem;
      &.menu_item_open {
        transform: translateX(0%);
      }
    }
    .menu {
      align-self: center;
      @media (max-width: 991px) {
        width: 100%;
      }
      ul {
        margin: 0;
        padding: 0;
        li {
        list-style: none;
          > a{
            text-decoration: none;
            padding: 0 1rem;
            text-align: center;
            color: #000;
          }
        }
        @media (max-width: 991px) {
          display: block;
          >:not(:last-child){
              margin-bottom: 1rem;
          }
          li {
            .menu_link {
              position: relative;
            }
          }
        }
        @media (min-width: 992px) {
          display: flex;
          li {
            position: relative;
            &:hover {
              .menu_link {
                &:after {
                  width: 100%;
                }
              }
            }
            .menu_link {
              position: relative;
              &:after {
                content: '';
                width: 0;
                height: 2px;
                background-color: #000;
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translateX(-50%);
                transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
              }
            }
          }
        }
      }
    }
    .top_icon {
      text-align: center;
      a {
        margin: 0 0.5rem;
        display: inline-block;
        padding: 0.5rem;
      }
      .btn_cart {
        position: relative;
        .badge {
          position: absolute;
          top: 1px;
          right: -5px;
        }
      }
      @media (max-width: 991px) {
        margin-top: 1rem;
      }
    }
  }
  .menu_btn {
    align-self: center;
    .bar_btn {
      display: block;
      width: 45px;
      height: 45px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 28px;
        height: 3px;
        background: #cb1340;
        left: 8px;
        transition: transform .3s;
        top: 10px;
      }
      &::after {
        content: '';
        position: absolute;
        width: 28px;
        height: 3px;
        background: #cb1340;
        left: 8px;
        transition: transform .3s;
        top: 30px;
      }
    }
    span {
      position: absolute;
      width: 28px;
      height: 3px;
      background: #cb1340;
      top: 20px;
      left: 8px;
      transform: scale(1);
      transition: transform .3s,opacity .3s,visibility .3s;
    }
    &.menu_open {
      .bar_btn {
        &::before {
          transform: translateY(11px) rotate(135deg);
        }
        &::after {
          transform: translateY(-8px) rotate(225deg);
        }
      }
      span {
        opacity: 0;
        visibility: hidden;
        transform: scale(0);
      }
    }
  }
  .fixed_cart {
    position: fixed;
    bottom: 23px;
    right: 23px;
    z-index: 100;
    background-color: #fff;
    border: 1px solid #cccccc;
    border-radius: 50%;
    padding: 0.75rem;
    .btn_cart{
      .badge {
        position: absolute;
        top: 10px;
        right: 5px;
      }
    }
  }
</style>
