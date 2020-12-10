<script>
  import { router } from 'tinro'
  import { store } from './store.js'
  import { pathOr } from 'ramda'

  const {id} = router.params()
  const i = $store.find(i => i.itemId === id)
  // if not found go to home screen
  if (!i) { router.goto('/') }

  const doc = pathOr({}, ['item', 'doc'], i)

  async function remove() {
    try {
      if (confirm('Are you sure?')) {
        await userbase.deleteItem({
          databaseName: 'docs',
          itemId: id
        })
        router.goto('/list')
      }

    } catch (e) {
      alert('ERROR: ' + e.message)
    }
  }
</script>
<section>
  <aside>
    <nav>
      <h3>{doc.name}</h3>
      <ul>
        <li><a href="/list"><b>List</b></a></li>
        <li><a href="/edit/{id}"><b>Edit</b></a></li>
        <li><button on:click={remove}>Delete</button></li>
      </ul>
    </nav>
    <article>
      <h3>{doc.description}</h3>
      <pre>{doc.content}</pre>
      <h5>{doc.tags}</h5>
    </article>
    
  </aside>
</section>
<style>
  
  aside {
    width: 100%;
  }

  article {
    text-align: left;
  }
</style>