export default function plugin(store) {
  store.subscribe((mutation, state) => {
    localStorage.setItem('ido-store', JSON.stringify(state));
  });
}
