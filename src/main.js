import App from './App.svelte';

userbase.init({ appId: '__YOUR_APP_ID__' })

const app = new App({
	target: document.body
});

export default app;