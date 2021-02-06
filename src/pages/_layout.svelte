<script lang="ts">
  import { AuthService } from '@/services/AuthService'
  import { goto } from '@roxi/routify'

  function logout() {
    AuthService.logout().then(() => $goto('/login'))
  }
</script>

<nav>
  <h1>Demo App</h1>
  <button on:click={logout}>ログアウト</button>
</nav>
<!-- routify:options preload="proximity" -->
<slot />

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    background-color: tomato;
  }
</style>
