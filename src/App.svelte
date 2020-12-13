<script>
  import { loggedIn, logout } from "./store.js";
  import { Route, router } from "tinro";
  import Signup from "./Signup.svelte";
  import Login from "./Login.svelte";
  import Form from "./DocForm.svelte";
  import List from "./DocList.svelte";
  import Show from "./DocShow.svelte";
  import Playground from "./Playground.svelte";

  function doLogout() {
    logout(async (_) => {
      await userbase.signOut();
      router.goto("/");
    });
  }
</script>

<style>
  header {
    height: 72px;
  }

  header > nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  header > nav > a {
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    text-transform: lowercase;
    color: var(--color);
  }

  header > nav > ul {
    list-style: none;
    padding: 0;
  }

  header > nav > ul > li {
    display: inline-block;
    margin: 0 0.5rem;
    font-family: Poppins;
    font-weight: 600;
    text-transform: lowercase;
  }
  header > nav > ul > li > a {
    color: var(--color);
  }
  main {
    text-align: center;
    padding: 1em;

    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  article {
    margin: 4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  article > p {
    width: 60%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<header>
  <nav>
    <a href="/">membrain</a>
    <ul>
      {#if !$loggedIn}
        <li><a href="/signup">SignUp</a></li>
        <li><a href="/login">Login</a></li>
      {:else}
        <li>
          <a href="/new"><img
              src="/assets/new.svg"
              alt="create new document" /></a>
        </li>
        <li>
          <a href="/list"><img
              src="/assets/search.svg"
              alt="search documents" /></a>
        </li>
        <li>
          <a href="/profile"><img
              src="/assets/profile.svg"
              alt="account info" /></a>
        </li>
        <!--
        <li><button on:click={doLogout}>Logout</button></li>
        -->
      {/if}
    </ul>
  </nav>
</header>
<main style="max-width: var(--width-content);">
  <Route path="/">
    <article>
      <h1>MEMBRAIN</h1>
      <p>The End to End secure data store</p>
      <p>
        Membrain is a text document manager that encrypts your content from
        browser to cloud, keeping application tokens, keys, and other important
        text content safe and secure.
      </p>
      <p>Create a free account and give `membrain` a try.</p>
      <div class="button-group">
        {#if !$loggedIn}
          <a href="/signup"><b>Sign Up</b></a>
          <a href="/login"><b>Login</b></a>
        {:else}
          <a href="/list"><b>Documents</b></a>
          <a href="/new"><b>New Document</b></a>
        {/if}
      </div>
    </article>
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/new">
    <Form />
  </Route>
  <Route path="/list">
    <List />
  </Route>
  <Route path="/show/:id">
    <Show />
  </Route>
  <Route path="/edit/:id">
    <Form />
  </Route>
  <Route path="/components">
    <Playground />
  </Route>
</main>
