<script lang="ts">
  import { goto } from '@roxi/routify'
  import { AuthService } from '@/services/AuthService'

  let email: string
  let password: string

  let loading = false
  function onSubmit() {
    loading = true
    AuthService.login(email, password)
      .then(() => $goto('/index'))
      .catch((err) => {
        console.error(err)
        alert('ログインに失敗しました')
      })
      .finally(() => (loading = false))
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="email" bind:value={email} autocomplete="email" />
  <input type="password" bind:value={password} autocomplete="current-password" />
  <button disabled={loading}>ログイン</button>
</form>
