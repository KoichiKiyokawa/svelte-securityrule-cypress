<script lang="ts">
  import type { Post } from '@/models/post/entity'
  import { PostRepository } from '@/models/post/repository'
  import { params } from '@roxi/routify'
  import { onMount } from 'svelte'

  let form: Omit<Post, 'authorName'> = { title: '', body: '' }
  let posts: Post[] = []
  let loading = false

  $: postRepo = new PostRepository($params.id)

  onMount(async () => {
    posts = await postRepo.all()
  })

  function substring(str: string) {
    if (str.length >= 10) return str.substring(0, 10) + '...'
    else return str
  }

  function onSubmit() {
    loading = true
    postRepo
      .create(form)
      .then((createdData) => {
        posts = [createdData, ...posts]
      })
      .catch(() => alert('投稿に失敗しました'))
      .finally(() => (loading = false))
  }
</script>

<h1>投稿一覧</h1>
<form on:submit|preventDefault={onSubmit}>
  <label>
    タイトル<br />
    <input bind:value={form.title} />
  </label>

  <label>
    本文<br />
    <textarea bind:value={form.body} />
  </label>

  <button>送信</button>
</form>

<ul>
  {#each posts as post}
    <p>タイトル：{post.title}</p>
    <p>投稿者：{post.authorName}</p>
    <div>
      <p>本文：{substring(post.body)}</p>
    </div>
  {/each}
</ul>
