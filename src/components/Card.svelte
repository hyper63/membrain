<script>
  export let href = "";
  export let name = "";
  export let description = "";
  export let tags = [];
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }
  aside {
    font-family: Poppins;
    font-weight: 600;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: var(--border-radius);
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    margin: 1rem 0;
  }
  aside:hover {
    border: 1px solid var(--color);
  }
  aside p {
    font-family: var(--font-family);
    font-weight: 200;
  }

  .tags {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
  }

  .tags a {
    color: var(--color);
    margin: 0 0.5rem;
  }
</style>

<a {href}>
  <aside>
    <h1>{name}</h1>
    <p>{description}</p>
    <div class="tags">
      {#each tags as tag}<a href="/list?q={tag}">#{tag}</a>{/each}
    </div>
  </aside>
</a>
