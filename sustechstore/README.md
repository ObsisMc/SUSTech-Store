# sustechstore

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Necessary requirement

```bash
# particles effect
npm install vue-particles
	# in main.js
	import VueParticles from 'vue-particles'
	Vue.use(VueParticles)
	# in index.html
	<script type="text/javascript" src="./static/live2d/L2Dwidget.min.js"></script>

# less & less-loader
npm install less-loader@5.0.0 -s
	# in main.js
	import less from 'less';
	Vue.use(less);
```

