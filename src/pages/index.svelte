<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '@roxi/routify'
  import { UserRepository } from '@/models/user/repository'
  import { AuthService } from '@/services/AuthService'
  import type { User } from '@/models/user/entity'

  let users: User[] = []

  let loading = false
  onMount(async () => {
    loading = true
    const hasAuth = await AuthService.checkAuth()
    if (!hasAuth) return await $goto('/login')

    users = await new UserRepository().all()
    console.log(users)
    loading = false
  })
</script>

{#if loading}
  <span>Loading...</span>
{:else}
  <h1>ユーザー一覧</h1>
  <ul>
    {#each users as user}
      <li>{user.name}</li>
    {/each}
  </ul>
{/if}
