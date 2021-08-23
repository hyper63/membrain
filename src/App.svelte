<script>
  import { loggedIn, logout } from "./store.js";
  import { Route, router } from "tinro";
  import Home from "./Home.svelte";
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

<Route path="/">
  <Home />
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

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
