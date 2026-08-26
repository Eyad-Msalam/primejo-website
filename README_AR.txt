PRIME HOME CMS FINAL

Cloudflare settings:
Build command: node build.mjs
Build output: dist
Root directory: empty
Production branch: main

النسخة تستخدم content/home.json كمصدر للمحتوى. أثناء البناء يتم توليد content-data.js، لذلك الموقع لا يعتمد على fetch في المتصفح ويعمل على Cloudflare وعلى المعاينة المحلية عبر file://.
