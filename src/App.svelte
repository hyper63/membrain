<script>
	import { loggedIn, logout } from './store.js'
	import { Route, router } from 'tinro'
	import Signup from './Signup.svelte'
	import Login from './Login.svelte'
	import Form from './DocForm.svelte'
	import List from './DocList.svelte'
	import Show from './DocShow.svelte'

	function doLogout() {
		logout(async _ => {
			await userbase.signOut()
			router.goto('/')
		})
	}
</script>
<header>
	<nav>
		<a href="/">MEMBRAIN</a>
		<ul>
			{#if !$loggedIn}
			<li><a href="/signup">SignUp</a></li>
			<li><a href="/login">Login</a></li>
			{:else}
			<li><a href="/list">Documents</a></li>
			<li><a href="/new">New Document</a></li>
			<li><button on:click={doLogout}>Logout</button></li>
			{/if}
		</ul>
	</nav>
</header>
<main>
	<Route path="/">
		<h1>MEMBRAIN</h1>	
		<p>Welcome to membrain!</p>
		<p>Membrain allows users to store small documents in an end to end encrypted environment for safe keeping.</p>
		{#if !$loggedIn}
		<a href="/signup"><b>Sign Up</b></a>
		<a href="/login"><b>Login</b></a>
		{:else}
		<a href="/list"><b>Documents</b></a>
		<a href="/new"><b>New Document</b></a>
		{/if}
	</Route>
	<Route path="/signup"><Signup /></Route>
	<Route path="/login"><Login /></Route>
	<Route path="/new"><Form /></Route>
	<Route path="/list"><List /></Route>
	<Route path="/show/:id"><Show /></Route>
	<Route path="/edit/:id"><Form /></Route>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>