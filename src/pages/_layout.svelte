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

<main>
  <!-- routify:options preload="proximity" -->
  <slot />
</main>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    color: white;
    background-color: tomato;
  }

  main {
    padding: 24px;
  }
</style>
