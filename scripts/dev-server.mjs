import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDirectory, '..');

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
]);

function resolveFilePath(rawUrl = '/') {
  const pathname = decodeURIComponent(new URL(rawUrl, 'http://localhost').pathname);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.resolve(projectRoot, `.${requestedPath}`);

  if (filePath !== projectRoot && !filePath.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error('Caminho inválido.');
  }

  return filePath;
}

async function serveFile(request, response) {
  try {
    const filePath = resolveFilePath(request.url);
    const metadata = await stat(filePath);

    if (!metadata.isFile()) {
      throw new Error('Recurso não encontrado.');
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404 · Recurso não encontrado');
  }
}

export async function startDevServer({ port = 4173, host = '127.0.0.1' } = {}) {
  const server = createServer(serveFile);

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });

  return server;
}

const isDirectExecution = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  const port = Number.parseInt(process.env.PORT ?? '4173', 10);
  const host = process.env.HOST ?? '127.0.0.1';
  const server = await startDevServer({ port, host });
  const address = server.address();
  const actualPort = typeof address === 'object' && address ? address.port : port;

  console.log(`TaskFlow Lite disponível em http://${host}:${actualPort}`);
}
