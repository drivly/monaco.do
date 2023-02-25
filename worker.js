

export default {
  fetch: async (req, env) => {
    const { user, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())
    
    // TODO: Implement this
    const [ resource, id ] = pathSegments
    const data = { resource, id, hello: user.city }
    
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' }})
  }
}

const html = `<!DOCTYPE html>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Monaco editor</title>
<link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.0/min/vs/editor/editor.main.min.css">
</head>
<body>
<div id="container" style="height:400px;border:1px solid black;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.0/min/vs/loader.min.js"></script>
<script>
// require is provided by loader.min.js.
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.0/min/vs' }});
require(["vs/editor/editor.main"], () => {
  monaco.editor.create(document.getElementById('container'), {
    value: \`function x() {
  console.log("Hello world!");
}\`,
    language: 'javascript',
    theme: 'vs-dark',
  });
});
</script>
</body>
</html>`
