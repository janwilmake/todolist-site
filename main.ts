export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    
    // Serve static files from the public directory
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(await fetch("public/index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    if (url.pathname === "/app.js") {
      return new Response(await fetch("public/app.js"), {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};