<template>
  <div class="about">
    <div class="container carousel_container">
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <router-link to="/product/-M2Yvik72iVMht8tg74S">
                <img src="@/assets/images/banner1.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-block">
                  <h3>極喚精靈系列</h3>
                  <p>皮米滲透技術，修復肌膚疲憊問題</p>
                </div>
              </router-link>
            </div>
            <div class="carousel-item">
              <router-link to="/product/-LxHeGHuwbWsCRWHWgxO">
                <img src="@/assets/images/banner2.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-block">
                  <h3>溫°C保養系列</h3>
                  <p>以「溫・冷・溫」平衡肌膚溫度，創造彈力潤澤的透明素肌</p>
                </div>
              </router-link>
            </div>
            <div class="carousel-item">
              <router-link to="/product/-LxMPk2DKh4N1hgIsWMw">
                <img src="@/assets/images/banner3.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-block">
                  <h3>淨荳系列</h3>
                  <p>預防痘痘及毛孔粗糙，打造光滑裸肌</p>
                </div>
              </router-link>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
      </div>
    </div>
    <div class="container">
      <div class="slogan">
        <div class="slogan_text">
          <h2>Change Skin</h2>
          <p>融納植物精華，綻放青春年華</p>
        </div>
      </div>
    </div>
    <div class="home-content">
        <div class="home_list">
          <div class="container home_list_container">
            <div class="row align-items-center no-gutters">
              <div class="col-md-6 col-12">
                <div class="home_list_photo">
                  <img src="@/assets/images/about1.jpg" class="img-fluid" alt="標題">
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="home_list_content">
                  <div class="home-title">
                    <h4 class="font-h4 text-main">起源</h4>
                  </div>
                  <p class="text-justify">
                      早於1970年，科學家已經開始尋找能夠讓女士們擁有美麗肌膚的神奇成分。經過千山萬水，科學家們雖然不曾放棄，卻始終找不到美肌的奧秘。 <br> 直至一次偶然的機會，科學家們來到了一所清酒釀造廠，看到年邁釀酒師的臉上佈滿皺紋，雙手卻依然細嫩； 就是這個讓科學家們驚訝的畫面，啟發了他們後來發現美肌的神奇成分，也從此揭開了美麗的奧秘。
                  </p>
                  <div class="home-btn">
                      <router-link to="/products" tag="button" class="btn btn-outline-primary btn-lg">購物去</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="home_list">
          <div class="container home_list_container">
            <div class="row align-items-center no-gutters">
              <div class="col-md-6 col-12 order-md-12">
                <div class="home_list_photo">
                  <img src="@/assets/images/about2.jpg" class="img-fluid" alt="標題">
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="home_list_content">
                  <div class="home-title">
                    <h4 class="font-h4 text-main">神奇成份</h4>
                  </div>
                  <p class="text-justify">
                      在看到年邁釀酒師佈滿皺紋的臉，和他們細嫩的雙手這個強列對比後，科學家們一直無法忘懷。當他們回到實驗室後， 推測令老釀酒師擁有年輕雙手的奧秘，必定是埋藏在雙手每天接觸的酵母液體中。 <br> 經過一連串嚴謹的研究後，科學家們從當時存在的350種酵母中找到其中一種酵母加以提煉，發現了一種神奇成分，那就是讓肌膚晶瑩剔透的唯一奧秘，PITERA™因此誕生。
                  </p>
                  <div class="home-btn">
                      <router-link to="/products" tag="button" class="btn btn-outline-primary btn-lg  ">購物去</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <HotProduct/>
  </div>
</template>

<script>
import HotProduct from '@/components/front/HotProduct.vue';

export default {
  components: {
    HotProduct,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="scss">

  @media (min-width: 767px) {
    .carousel-item {
      height: 500px;
      object-fit: cover;
    }
  }
  @media (max-width: 992px) {
    .carousel_container {
      max-width: none;
      padding: 0;
    }
  }
  .carousel-caption {
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
    @media (max-width: 576px) {
      padding-top: 16px;
      padding-bottom: 16px;
      h3 {
        font-size: 1.5rem;
      }
    }
  }
  .slogan {
    font-family: 'Kaushan Script', cursive;
    padding: 6rem 0;
    text-align: center;
    .slogan_text {
      display: inline-block;
      text-align: center;
      padding: 1rem 5rem;
      color: #cb1340;
      border: 3px double #8a8a8a;
      >:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
    @media (max-width: 768px) {
      padding: 3rem 0;
    }
  }
  .home_list {
    background-color: #efece8;
    .home_list_photo {
      text-align: center;
      img {
        object-fit: cover;
      }
    }
    @media (min-width: 767px) {
      padding: 5rem 0;
      .home_list_photo {
        img {
          height: 300px;
          box-shadow: -10px -10px 0px 0px #ff544e;
        }
      }
      &:nth-child(even){
        .home_list_photo {
          img {
            box-shadow: 10px 10px 0px 0px #ff544e;
          }
        }
      }
      .home_list_content {
        max-width: 500px;
        padding: 0 5rem;
        > *:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
    @media (max-width: 992px) {
      background-color: #efece8;
    }
    @media (max-width: 768px) {
      .home_list_container {
        max-width: none;
        padding: 0;
      }
      // .home_list_photo {
      //   margin-bottom: 1rem;
      // }
      .home_list_content {
        max-width: 720px;
        padding: 3rem;
      }
    }
    @media (max-width: 576px) {
      .home_list_content {
        max-width: 540px;
        padding: 1rem;
      }
    }
  }
</style>
