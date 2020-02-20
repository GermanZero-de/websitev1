Simple webpack template
--

#### Launch:

Development (by default available on http://localhost:3000):
```console
npm i
npm start
```

Production:
```
npm i && npm run build
```
---

####Tips:

- If deployed with Netlify: in settings/deploys#post-processing disable "assets optimizations" -> "Bundle CSS" as Netlify can't bundle styles with "preload" and 'onload' OR disable critical css generation in webpack config. 

@ysbm-group
