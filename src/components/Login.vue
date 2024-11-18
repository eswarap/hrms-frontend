<template>
  <div class="login-container">
    <b-card title="Login" class="login-card">
      <b-form @submit.prevent="handleLogin">
        <b-form-group label="Username:" label-for="username">
          <b-form-input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="w-100">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await AuthService.login({
          username: this.username,
          password: this.password
        });
        // Store the token or user data in localStorage/Vuex
        localStorage.setItem('user', JSON.stringify(response.data));
        this.$router.push('/employees');
      } catch (error) {
        console.error('Login failed:', error);
        // Handle error (show error message to user)
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 100%;
  max-width: 400px;
}
</style>