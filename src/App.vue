<template>
  <div id="app">
    <nav v-if="currentUser">
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">HRMS</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AuthService from './services/AuthService';

export default {
  name: 'App',
  data() {
    return {
      currentUser: null
    };
  },
  methods: {
    async logout() {
      try {
        await AuthService.logout();
        localStorage.removeItem('user');
        this.currentUser = null;
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
