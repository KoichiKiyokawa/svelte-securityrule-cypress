<script lang="ts">
  import type { WithID } from '@/models/base/repository'

  import type { Post } from '@/models/post/entity'
  import { PostRepository } from '@/models/post/repository'
  import { params, url } from '@roxi/routify'
  import { onMount } from 'svelte'

  let form: Omit<Post, 'authorName'> = { title: '', body: '' }
  let posts: WithID<Post>[] = []
  let loading = false

  $: postRepo = new PostRepository($params.userID)

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
    <a href={$url('./:postID', { postID: post.id })} class="card">
      <span class="title">{post.title}</span>
      <span class="body">{substring(post.body)}</span>
      <span class="author">{post.authorName}</span>
    </a>
  {/each}
</ul>

<style>
  .card {
    display: block;
    max-width: 640px;
    border: 1px solid #111;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 10px;
  }
  .card + .card {
    margin-top: 1rem;
  }
  .title {
    font-size: 2rem;
  }
  .author {
    display: block;
    color: #777777;
  }
</style>
