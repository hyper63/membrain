<script>
  import { loggedIn, store, set } from "./store.js";
  import { router } from "tinro";

  let submitting = false;
  let username,
    password,
    error = "";

  userbase.init({ appId: "__YOUR_APP_ID__" });

  if ($loggedIn) {
    router.goto("/list");
  }

  async function handleLogin() {
    submitting = true;
    try {
      await userbase.signIn({ username, password, rememberMe: "none" });
      await userbase.openDatabase({ databaseName: "docs", changeHandler: set });
      router.goto("/list");
    } catch (e) {
      error = e.message;
      submitting = false;
    }
  }
</script>

<h1>Login</h1>
<section>
  <form id="login-form" on:submit|preventDefault={handleLogin}>
    <div id="login-error">{error}</div>
    <input
      id="login-username"
      type="text"
      required
      placeholder="Username"
      bind:value={username} />
    <input
      id="login-password"
      type="password"
      required
      placeholder="Password"
      bind:value={password} />
    <input type="submit" disabled={submitting} value="Sign in" />
  </form>
</section>
