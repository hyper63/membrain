<script>
  import { loggedIn, store, set } from "./store.js";
  import { router } from "tinro";
  import Error from "./components/Error.svelte";

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

<div
  class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h1 class="text-center text-5xl text-gray-400">MEMBRAIN</h1>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <a
          href="/signup"
          class="font-medium text-yellow-600 hover:text-yellow-500"
        >
          signup for a free account
        </a>
      </p>
    </div>
    {#if error}
      <Error {error} />
    {/if}
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input
            bind:value={username}
            id="username"
            name="username"
            type="text"
            autocomplete="off"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Username"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            bind:value={password}
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            bind:value={remember}
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <!--
        <div class="text-sm">
          <a href="#" class="font-medium text-yellow-600 hover:text-yellow-500">
            Forgot your password?
          </a>
        </div>
        -->
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting}
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg
              class="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
