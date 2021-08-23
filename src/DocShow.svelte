<script>
  import { store, loggedIn, logout } from "./store";
  import { router } from "tinro";
  import { pathOr } from "ramda";
  import MobileMenu from "./components/MobileMenu.svelte";

  if (!$loggedIn) {
    router.goto("/login");
  }

  let showMenu = false;
  function toggleMenu() {
    showMenu = !showMenu;
  }

  function doLogout() {
    logout(() => router.goto("/login"));
  }

  const { id } = router.params();
  const i = $store.find((i) => i.itemId === id);
  // if not found go to home screen
  if (!i) {
    router.goto("/");
  }

  const doc = pathOr({}, ["item", "doc"], i);

  async function remove() {
    try {
      if (confirm("Are you sure?")) {
        await userbase.deleteItem({
          databaseName: "docs",
          itemId: id,
        });
        router.goto("/list");
      }
    } catch (e) {
      alert("ERROR: " + e.message);
    }
  }
</script>

<div>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="/">Membrain</a>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                href="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Home</a
              >

              <a
                href="/list"
                class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >Documents</a
              >

              <a
                href="/profile"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Profile</a
              >

              <a
                href="/settings"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Settings</a
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  type="button"
                  class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  on:click={toggleMenu}
                >
                  <span class="sr-only">Open user menu</span>
                  <div
                    class="h-8 w-8 rounded-full bg-black text-white text-2xl flex items-center justify-center"
                  >
                    T
                  </div>
                </button>
              </div>

              <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
              {#if showMenu}
                <div
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <button
                    on:click={doLogout}
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2">Sign out</button
                  >
                </div>
              {/if}
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <MobileMenu />
  </nav>

  <header class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <button
        class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium float-right"
        on:click={remove}>Delete</button
      >
      <a
        class="mx-4 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium float-right"
        href="/edit/{id}"><b>Edit</b></a
      >

      <h3 class="text-lg leading-6 font-medium text-gray-900">View Document</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Document Title, Description, Content and tags.
      </p>
    </div>
  </header>
  <main>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900">{doc.name}</dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm w-full text-gray-900">
              {doc.description}
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Content</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <pre><code>{doc.content}</code></pre>
            </dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Tags</dt>
            <dd class="mt-1 text-sm text-gray-900">{doc.tags}</dd>
          </div>
        </dl>
      </div>
    </div>
  </main>
</div>
