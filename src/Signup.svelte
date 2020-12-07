<script>
import { router } from 'tinro'

let username, password, error = ''

function handleSignup(e) {
  //console.log(username)
  
  userbase.signUp({username, password, rememberMe: 'none'})
    .then(user => router.goto('/list'))
    .catch(e => error = e.message) 
  
}
</script>
<h1>Create an account</h1>

<section>
  <form id="signup-form" on:submit|preventDefault={handleSignup}>
    <div id="signup-error">{error}</div>
    <input id="signup-username" type="text" required placeholder="Username" bind:value={username}>
    <input id="signup-password" type="password" required placeholder="Password" bind:value={password}>
    <input type="submit" value="Create an account">
  </form>
  
</section>