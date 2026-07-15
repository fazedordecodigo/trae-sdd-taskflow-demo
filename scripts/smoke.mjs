import assert from 'node:assert/strict';

import { startDevServer } from './dev-server.mjs';

const server = await startDevServer({ port: 0 });

try {
  const address = server.address();
  assert.ok(address && typeof address === 'object');

  const baseUrl = `http://127.0.0.1:${address.port}`;
  const [htmlResponse, scriptResponse, styleResponse] = await Promise.all([
    fetch(`${baseUrl}/`),
    fetch(`${baseUrl}/src/main.js`),
    fetch(`${baseUrl}/src/styles.css`),
  ]);

  assert.equal(htmlResponse.status, 200);
  assert.equal(scriptResponse.status, 200);
  assert.equal(styleResponse.status, 200);

  const [html, script, styles] = await Promise.all([
    htmlResponse.text(),
    scriptResponse.text(),
    styleResponse.text(),
  ]);

  assert.match(html, /TaskFlow Lite/);
  assert.match(html, /id="task-status-filters"/);
  assert.match(html, /data-filter="all"[\s\S]*aria-pressed="true"[\s\S]*data-filter-count="all"/);
  assert.match(html, /data-filter="pending"[\s\S]*aria-pressed="false"[\s\S]*data-filter-count="pending"/);
  assert.match(html, /data-filter="completed"[\s\S]*aria-pressed="false"[\s\S]*data-filter-count="completed"/);
  assert.match(script, /createTaskStorage/);
  assert.match(script, /function isFilterActivationKey\(event\)/);
  assert.match(script, /event\.currentTarget\.dataset\.filter/);
  assert.match(script, /button\.addEventListener\('keydown', handleFilterButtonKeydown\)/);
  assert.match(script, /event\.key === 'Spacebar'/);
  assert.match(script, /event\.code === 'Space'/);
  assert.match(styles, /--accent: #3cd98e/);

  console.log('Smoke test aprovado: HTML, JavaScript e CSS foram servidos corretamente.');
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}
