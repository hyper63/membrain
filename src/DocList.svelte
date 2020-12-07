<script>
  import { store, loggedIn } from './store'
  import { pathOr } from 'ramda'
  import { router } from 'tinro'

  if (!$loggedIn) { router.goto('/') }
</script>
<h1>Your Documents</h1>
<section>
  {#each $store as {item, itemId}}
    <aside>
      <a href="/show/{itemId}">{pathOr('noname', ['doc', 'name'], item)}</a>
      <p>{pathOr('description', ['doc', 'description'], item)}</p>
    </aside>
  {/each}
</section>
<style>
  header {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>