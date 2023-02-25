

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
<html>
	<head>
		<title>browser-amd-editor</title>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	</head>
	<body>
		<h2>Monaco Editor Sample</h2>
		<div id="container" style="width: 800px; height: 600px; border: 1px solid grey"></div>

		<!-- OR ANY OTHER AMD LOADER HERE INSTEAD OF loader.js -->
		<script src="../node_modules/monaco-editor/min/vs/loader.js"></script>
		<script>
			require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });

			require(['vs/editor/editor.main'], function () {
				var editor = monaco.editor.create(document.getElementById('container'), {
					value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
					language: 'javascript'
				});
			});
		</script>
	</body>
</html>`
