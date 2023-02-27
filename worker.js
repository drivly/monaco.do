

export default {
  fetch: async (req, env) => {
    const { user, url, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())

    // if pathname.startsWith('/_')

    const target = pathname == '/' ? undefined : url.includes('/_/') ? url.replace('/_','').replace('://', '://proxy.as/') : 'https:/' + pathname
    const res = target ? await fetch(target) : undefined
    const body = res ? await res.text() : undefined
    const contentType = res?.headers?.get('content-type')
    const type = contentType?.includes('html') ? 'html' : contentType?.includes('json') ? 'json' : contentType?.includes('javascript') ? 'javascript' : 'text'
    const html = `<!DOCTYPE html>
<!doctype html>
<html class="h-full bg-gray-100">
<head>
  <meta charset="utf-8">
  <title>Monaco editor</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.0/min/vs/editor/editor.main.min.css">
</head>
<body class="h-full">
  <div class="min-h-full">
    <main class="h-full">
      <div id="container" class="h-full"></div>
    </main>
  </div>

  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.0/min/vs/loader.min.js"></script>
  <script>
  // require is provided by loader.min.js.
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.0/min/vs' }});
  require(["vs/editor/editor.main"], () => {
    monaco.editor.create(document.getElementById('container'), {
      value: \`${body}\`,
      language: '${type}',
      theme: 'vs-dark',
      scrollBeyondLastLine: false,
      padding: {
        top: 10,
        bottom: 10
      },
    });
  });
  </script>
</body>
</html>`

    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' }})
  }
}


