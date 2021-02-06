<script lang="ts">
  import { PostRepository } from '@/models/post/repository'
  import { params } from '@roxi/routify'
  import { onMount } from 'svelte'
  import type { Post } from '@/models/post/entity'

  export let post: Post | null = null

  onMount(async () => {
    post = await new PostRepository($params.userID).find($params.postID)
  })
</script>

<div class="card">
  <span class="title">{post?.title}</span>
  <span class="body">{post?.body}</span>
  <span class="author">{post?.authorName}</span>
</div>

<style>
  .card {
    display: block;
    max-width: 640px;
    border: 1px solid #111;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 10px;
  }
  .title {
    display: block;
    font-size: 2rem;
  }
  .author {
    display: block;
    color: #777777;
    text-align: right;
  }
</style>
