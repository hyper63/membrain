<script>
  import { loggedIn, store, set } from "./store.js";
  import { router } from "tinro";

  let submitting = false;
  let username,
    password,
    remember,
    error = "";

  userbase.init({ appId: "__YOUR_APP_ID__" });

  if ($loggedIn) {
    router.goto("/list");
  }

  async function handleLogin() {
    submitting = true;
    try {
      await userbase.signIn({
        username,
        password,
        rememberMe: remember ? "session" : "none",
      });
      await userbase.openDatabase({ databaseName: "docs", changeHandler: set });
      router.goto("/list");
    } catch (e) {
      error = e.message;
      submitting = false;
    }
  }
</script>

<style>
  h1 {
    color: var(--color);
    font-family: Poppins;
    font-weight: 600;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--justify-important);
  }

  section form {
    border: 1px solid var(--color-bg-secondary);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow) var(--color-shadow);
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  label {
    width: 100%;
    text-align: left;
    margin-bottom: 0.5rem;
    margin-right: 8px;
    margin-top: 1rem;
    text-transform: lowercase;
  }

  .error {
    font-family: Poppins;
    background-color: red;
    color: white;
    border-radius: var(--border-radius);
    padding: 0.5rem;
  }

  .error-button {
    border-radius: 100%;
    border: 1px solid white;
    background-color: transparent;
    color: white;
    padding: 0 0.3rem;
    margin: 0;
    margin-left: 8px;
  }
</style>

<h1>Login</h1>
<section>
  <form id="login-form" on:submit|preventDefault={handleLogin}>
    {#if error}
      <div class="error">
        {error}
        <button class="error-button" on:click={() => (error = '')}>x</button>
      </div>
    {/if}
    <label for="login-username">Username</label>
    <input
      id="login-username"
      type="text"
      required
      placeholder="Username"
      bind:value={username} />
    <label for="login-password">Password</label>
    <input
      id="login-password"
      type="password"
      required
      placeholder="Password"
      bind:value={password} />
    <label> <input type="checkbox" bind:value={remember} /> Remember Me </label>
    <button type="submit" disabled={submitting}>Login</button>
  </form>
</section>
