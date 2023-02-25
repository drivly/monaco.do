

export default {
  fetch: async (req, env) => {
    const { user, url, hostname, pathname, rootPath, pathSegments, query } = await env.CTX.fetch(req).then(res => res.json())

    // if pathname.startsWith('/_')

    const target = pathname == '/' ? undefined : url.includes('/_/') ? url.replace('/_','').replace(':/', ':/proxy.as/') : 'https:/' + pathname
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
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <!-- 
                <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a> -->
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">View notifications</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <div>
                  <button type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="${ user?.image ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}" alt="">
                  </button>
                </div>
                <!-- <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <div class="h-full">
        <div id="container" class="h-full"></div>
      </div>
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


