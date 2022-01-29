/**
 * Simple API for updating the current URL with search queries
 *
 * Uses BrowserAPIs: URL API and History API's replaceState method
 */
const URLparams = {
  url: new URL(window.location.toString()),

  add: function (key: string, value: string) {
    let { url } = this;
    url.searchParams.set(key, value);
    window.history.replaceState({}, document.title, url.toString());
  },

  get: function (key: string) {
    return this.url.searchParams.get(key);
  },
};

export default URLparams;
