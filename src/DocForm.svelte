<script>
  import { router } from "tinro";
  import { store, loggedIn, logout } from "./store.js";
  import MobileMenu from "./components/MobileMenu.svelte";
  import Error from "./components/Error.svelte";

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

  let error;
  let name,
    description,
    content,
    tags = "";

  if (!$loggedIn) {
    router.goto("/");
  }

  const { id } = router.params();

  if (id) {
    const { item } = $store.find((i) => i.itemId === id);
    name = item.doc.name;
    description = item.doc.description;
    content = item.doc.content;
    tags = item.doc.tags.join(",");
  }

  // need to open database and insert item
  async function handleSubmit() {
    try {
      //await userbase.openDatabase({databaseName: 'docs', changeHandler: store.set })
      if (id) {
        await userbase.updateItem({
          databaseName: "docs",
          itemId: id,
          item: {
            doc: {
              name,
              description,
              content,
              tags: tags.split(","),
            },
          },
        });
      } else {
        await userbase.insertItem({
          databaseName: "docs",
          item: {
            doc: {
              name,
              description,
              content,
              tags: tags.split(","),
            },
          },
        });
      }
      // navigate back to list
      router.goto("/list");
    } catch (e) {
      error = e.message;
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

  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">New/Edit Document</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <section>
        <form
          class="space-y-8 divide-y divide-gray-200"
          on:submit|preventDefault={handleSubmit}
        >
          {#if error}
            <Error {error} />
          {/if}
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  class="flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
                  bind:value={name}
                  id="name"
                  type="text"
                />
              </div>
            </div>
            <div class="sm:col-span-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <textarea
                  class="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  bind:value={description}
                  id="description"
                  style="height: 100px"
                />
              </div>
            </div>
            <div class="sm:col-span-4">
              <label
                for="content"
                class="block text-sm font-medium text-gray-700">Content</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <textarea
                  class="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  bind:value={content}
                  id="content"
                  style="height: 400px"
                />
              </div>
            </div>
            <div class="sm:col-span-4">
              <label for="tags" class="block text-sm font-medium text-gray-700"
                >Tags</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  bind:value={tags}
                  id="tags"
                  type="text"
                  class="flex-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
          </div>
          <div class="pt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-4 flex justify-end">
              <a
                href="/list"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Cancel
              </a>
              <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</div>
