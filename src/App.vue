<template>
  <NavBar :srcImgLogo="srcImgLogo" :titleImgLogo="titleImgLogo" />
  <router-view />
  <Footer />
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: "App",
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      srcImgLogo: '/img/logo.png',
      titleImgLogo: 'logo-hamburguer',
    }
  }
}
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main-container {
  margin: 50px;
  min-height: 378px;


}
h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;

}
</style>