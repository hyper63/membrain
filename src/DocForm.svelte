<script>
  import { router } from 'tinro'
  import { store, loggedIn } from './store.js'
  let error = null
  let name, description, content, tags = ''

  if (!$loggedIn) { router.goto('/') }

  const { id } = router.params()

  if (id) { 
    const { item } = $store.find(i => i.itemId === id)
    name = item.doc.name
    description = item.doc.description
    content = item.doc.content
    tags = item.doc.tags.join(',')
  }

  // need to open database and insert item
  async function handleSubmit() {
    try {
      //await userbase.openDatabase({databaseName: 'docs', changeHandler: store.set })
      if (id) {
        await userbase.updateItem({databaseName: 'docs', itemId: id, item: { doc: {
          name,
          description,
          content,
          tags: tags.split(',')
        }}})
      } else {
        await userbase.insertItem({databaseName: 'docs', item: { doc: {
          name,
          description,
          content,
          tags: tags.split(',')
        }}})
      }
      // navigate back to list
      router.goto('/list')
    } catch (e) {
      error = e.message
    }
  }
  
</script>
<section>
  <form on:submit|preventDefault={handleSubmit}>
    {#if error}
    <div class="error">
      {error}
    </div>
    {/if}
    <div>
      <label for="name">Name</label>
      <input bind:value={name} id="name" type="text" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea bind:value={description} id="description" style="height: 100px"></textarea>
    </div>    
    <div>
      <label for="content">Content</label>
      <textarea bind:value={content} id="content" style="height: 400px"></textarea>
    </div>
    <div>
      <label for="tags">Tags</label>
      <input bind:value={tags} id="tags" type="text" />
    </div>
    <div class="buttons">
      <button type="submit">Submit</button>
      <a href="/list">Cancel</a>
    </div>
  </form>
</section>
<style>
  form {
    width: 100%;
  }
  input, textarea {
    width: 90%;
  }
  .buttons {
    text-align: right;
    padding-right: 72px;
  }
</style>