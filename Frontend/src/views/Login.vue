<template>
  <div class="login-container">
    <form class="login-card" @submit.prevent="login" novalidate>
      <div class="brand">
        <svg viewBox="0 0 24 24" class="logo" aria-hidden="true"><path d="M12 2L2 7v6c0 5 3.8 9 10 9s10-4 10-9V7l-10-5z"/></svg>
        <h1>Welcome Back</h1>
        <p class="muted">Sign in to continue to your dashboard</p>
      </div>

      <div class="field">
        <label for="email">Email</label>
        <div class="input-wrap">
          <input
            id="email"
            type="email"
            v-model.trim="email"
            placeholder="you@example.com"
            autocomplete="username"
            aria-required="true"
            :class="{ invalid: showError && !validEmail }"
          />
        </div>
      </div>

      <div class="field">
        <label for="password">Password</label>
        <div class="input-wrap">
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="••••••••"
            autocomplete="current-password"
            aria-required="true"
            :class="{ invalid: showError && !password }"
          />
        </div>
      </div>

      <div class="actions">
        <label class="remember">
          <input type="checkbox" v-model="remember" /> Remember me
        </label>
        <a class="forgot" href="#" @click.prevent>Forgot?</a>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button
        type="submit"
        class="primary"
        :disabled="isSubmitting || !canSubmit"
        aria-busy="isSubmitting"
      >
        <span v-if="!isSubmitting">Sign in</span>
        <span v-else>Signing in…</span>
      </button>

      <p class="signup">Don't have an account? <router-link to="/register">Create one</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  name: "NeatLogin",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      error: "",
      isSubmitting: false,
      showError: false,
    };
  },
  computed: {
    validEmail() {
      
      return /^\S+@\S+\.\S+$/.test(this.email);
    },
    canSubmit() {
      return this.validEmail && this.password.length >= 4;
    },
  },
  methods: {
    async login() {
      this.error = "";
      this.showError = false;

      if (!this.validEmail || !this.password) {
        this.showError = true;
        this.error = "Please enter a valid email and password.";
        return;
      }

      this.isSubmitting = true;

      
      await new Promise((r) => setTimeout(r, 500));

      const validUser = { email: "admin@user.com", password: "1234" };

      if (this.email === validUser.email && this.password === validUser.password) {
        localStorage.setItem("loggedIn", "true");
        if (this.remember) localStorage.setItem("remember", "true");
        this.$router.push("/dashboard");
      } else {
        this.error = "Invalid email or password.";
        this.showError = true;
      }

      this.isSubmitting = false;
    },
  },
};
</script>

<style scoped>
:root{
  --bg: #f1f5ff; 
  --card: 255 255 255;
  --muted: #6b7280;
  --accent-rgb: 59,130,246;  
  --accent-light-rgb: 147,197,253; 
}

*{box-sizing: border-box}

.login-container{
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: var(--bg);
}

.login-card{
  width: 100%;
  max-width: 420px;
  background: rgb(var(--card));
  border-radius: 14px;
  padding: 30px;
  border: 1px solid rgba(59,130,246,0.15);
  box-shadow: 0 8px 25px rgba(59,130,246,0.15);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform .18s ease, box-shadow .18s ease;
}

.login-card:hover{
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(59,130,246,0.22);
}

.brand{
  text-align: center;
}
.logo{
  width: 58px;
  height: 58px;
  display: inline-block;
  fill: rgba(var(--accent-rgb),1);
  margin-bottom: 10px;
}
.brand h1{
  margin: 0;
  font-size: 22px;
  color: #1e3a8a;
}
.muted{
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.field label{
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #1e3a8a;
  font-weight: 600;
}

.input-wrap{ position: relative; }

input[type="email"], input[type="password"]{
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(59,130,246,0.3);
  background: rgb(100, 73, 207);
  font-size: 14px;
  outline: none;
  transition: box-shadow .14s ease, border-color .14s ease;
}

input:focus{
  border-color: rgba(var(--accent-rgb),1);
  box-shadow: 0 0 8px rgba(var(--accent-rgb),0.3);
}

input.invalid{
  border-color: #dc2626;
  box-shadow: 0 0 7px rgba(220,38,38,0.25);
}

.actions{
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:14px;
  color:#1e3a8a;
}

.remember input{ margin-right:8px }
.forgot{ color: #0214dd; text-decoration:none }
.forgot:hover{ text-decoration:underline }

.error{
  color: #b91c1c;
  background: rgba(185,28,28,0.06);
  border: 1px solid rgba(185,28,28,0.15);
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
}

button.primary{
  appearance: none;
  border: none;
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(90deg, rgba(var(--accent-rgb),1), rgba(var(--accent-light-rgb),1));
  color: rgb(0, 55, 218);
  font-size: 15px;
  transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
}
button.primary:hover{
  box-shadow: 0 6px 18px rgba(0, 95, 248, 0.3);
  transform: translateY(-2px);
}
button.primary:active{
  transform: translateY(1px);
}
button.primary:disabled{
  opacity:0.6;
  cursor: not-allowed;
  transform: none;
}

.signup{
  text-align:center;
  margin: 6px 0 0;
  color: var(--muted);
  font-size:13px;
}
.signup a{
  color:#0b0bd0;
  font-weight:600;
}

@media (max-width:420px){
  .login-card{ padding: 22px; border-radius: 12px }
  .logo{ width:48px; height:48px }
}
</style>
