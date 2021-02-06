<script lang="ts">
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import { params, url } from '@roxi/routify'
  import { UserRepository } from '@/models/user/repository'
  import type { User } from '@/models/user/entity'

  let user: User | null = null
  onMount(async () => {
    user = await new UserRepository().find($params.userID)
  })
</script>

{#if user == null}
  <span>Loading...</span>
{:else}
  <p>
    <a href={$url('./edit')}>編集</a>
  </p>
  <span>氏名:</span><span>{user.name}</span>
  <span>誕生日:</span><span>{dayjs(user.birthday).format('YYYY/MM/DD')}</span>
  <a href={$url('./posts')}>投稿一覧</a>
{/if}
