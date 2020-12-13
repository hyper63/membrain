<script>
  import { store, loggedIn } from "./store";
  import { pathOr } from "ramda";
  import { router } from "tinro";
  import Card from "./components/Card.svelte";

  if (!$loggedIn) {
    router.goto("/");
  }
</script>

<style>
</style>

<h1>Your Documents</h1>
<section>
  {#each $store as { item, itemId }}
    <Card
      href="/show/{itemId}"
      name={pathOr('noname', ['doc', 'name'], item)}
      description={pathOr('description', ['doc', 'description'], item)}
      tags={pathOr([], ['doc', 'tags'], item)} />
  {/each}
</section>
