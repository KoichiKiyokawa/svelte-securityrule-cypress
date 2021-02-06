<script lang="ts">
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'
  import { goto, params } from '@roxi/routify'
  import { UserRepository } from '@/models/user/repository'
  import type { User } from '@/models/user/entity'
  import type { DateStringify } from '@/models/base/repository'

  let form: DateStringify<User> = {
    email: '',
    name: '',
    birthday: '',
  }

  let loading = false
  onMount(async () => {
    const { id, ...userData } = await new UserRepository().find($params.id)
    form = { ...userData, birthday: dayjs(userData.birthday).format('YYYY-MM-DD') }
  })

  function save() {
    loading = true

    new UserRepository()
      .update($params.id, { ...form, birthday: new Date(form.birthday) })
      .then(() => $goto('/users/:id'))
      .catch((err) => {
        console.error(err)
        alert('更新に失敗しました')
      })
      .finally(() => (loading = false))
  }
</script>

<form on:submit|preventDefault={save}>
  <!-- <label>
    メールアドレス
    <input type="email" bind:value={form.email} />
  </label> -->
  <label>
    氏名
    <input bind:value={form.name} />
  </label>
  <label>
    誕生日
    <input type="date" bind:value={form.birthday} />
  </label>

  <button disabled={loading}>更新</button>
</form>
