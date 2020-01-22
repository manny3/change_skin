<template>
  <div class="about">
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../../assets/images/banner1.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../../assets/images/banner2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../../assets/images/banner3.jpg" class="d-block w-100" alt="...">
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
    <div class="home-content">
      <div class="home_list">
        <div class="row align-items-center">
          <div class="col-md-6 col-12">
            <div class="home_list_photo">
              <img src="../../assets/images/about1.jpg" class="img-fluid" alt="標題">
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="home_list_content">
              <div class="home-title">
                <h4 class="font-h4 text-main">起源</h4>
              </div>
              <p class="text-justify">
                  早於1970年，SK-II的科學家已經開始尋找能夠讓女士們擁有美麗肌膚的神奇成分。經過千山萬水，科學家們雖然不曾放棄，卻始終找不到美肌的奧秘。 <br> 直至一次偶然的機會，科學家們來到了一所清酒釀造廠，看到年邁釀酒師的臉上佈滿皺紋，雙手卻依然細嫩； 就是這個讓科學家們驚訝的畫面，啟發了他們後來發現美肌的神奇成分，也從此揭開了美麗的奧秘。
              </p>
              <div class="home-btn">
                  <router-link to="/products" tag="button" class="btn btn-outline-primary rounded-pill">購物去</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home_list">
        <div class="row align-items-center">
          <div class="col-md-6 col-12 order-md-12">
            <div class="home_list_photo">
              <img src="../../assets/images/about2.jpg" class="img-fluid" alt="標題">
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="home_list_content">
              <div class="home-title">
                <h4 class="font-h4 text-main">神奇成份</h4>
              </div>
              <p class="text-justify">
                  在看到年邁釀酒師佈滿皺紋的臉，和他們細嫩的雙手這個強列對比後，科學家們一直無法忘懷。當他們回到SK-II的實驗室後， 推測令老釀酒師擁有年輕雙手的奧秘，必定是埋藏在雙手每天接觸的酵母液體中。 <br> 經過一連串嚴謹的研究後，科學家們從當時存在的350種酵母中找到其中一種酵母加以提煉，發現了一種神奇成分，那就是讓肌膚晶瑩剔透的唯一奧秘，PITERA™因此誕生。
              </p>
              <div class="home-btn">
                  <router-link to="/products" tag="button" class="btn btn-outline-primary rounded-pill">購物去</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  .home_list {
    background: linear-gradient(-90deg,#efece8 70%, #ff544e 30%);
    &:nth-child(even){
      background: linear-gradient( 90deg,#efece8 70%, #ff544e 30%);
    }
    background-repeat: no-repeat;
    padding: 5rem;
    .home_list_photo {
      text-align: center;
      img {
        object-fit: cover;
        height: 300px;
      }
    }
    .home_list_content {
      padding: 0 2.5rem;
      > *:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
    @media (max-width: 768px) {
      background: linear-gradient(0deg,#efece8 70%,  #ff544e 30%);
      &:nth-child(even){
        background: linear-gradient(0deg,#efece8 70%, #ff544e 30%);
      }
      padding: 3rem;
      .home_list_photo {
        margin-bottom: 1rem;
      }
    }
    @media (max-width: 576px) {
      padding: 1rem;
    }
  }
</style>
