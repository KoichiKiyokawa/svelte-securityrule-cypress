<script lang="ts">
  import { onMount } from 'svelte'
  import { goto, url } from '@roxi/routify'
  import { UserRepository } from '@/models/user/repository'
  import { AuthService } from '@/services/AuthService'
  import type { User } from '@/models/user/entity'
  import type { WithID } from '@/models/base/repository'

  let users: WithID<User>[] = []

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
      <li><a href={$url('/users/:id', { id: user.id })}>{user.name}</a></li>
    {/each}
  </ul>
{/if}
