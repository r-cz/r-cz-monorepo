export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { hostname, pathname } = url;
    
    // Check which domain is being accessed
    if (hostname === 'tools.ryancruz.com' || hostname.includes('tools')) {
      // Redirect to the tools directory
      return fetch(new URL(`/tools${pathname}`, url));
    } else {
      // Default to the main site for all other domains
      return fetch(new URL(`/main${pathname}`, url));
    }
  }
};
