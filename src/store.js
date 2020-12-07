import { writable } from 'svelte/store'

export const store = writable([])
export let loggedIn = writable(false)

export function set(v) {
  loggedIn.set(true);
  return store.set(v)
}

export function logout(cb) {
  loggedIn.set(false);
  store.set([])
  cb()
}