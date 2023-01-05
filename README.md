# 2021 SUSTech store

This repo is the **front end** of our OOAD project, SUSTech store, in 2021 autumn in SUSTech. **Back-end repo** please visit [CS309-SUSTech-Store-Backend](https://github.com/Evens1sen/CS309_SUSTech_Store_Backend).

| Teammates              | Contributions                                               |
| ---------------------- | ----------------------------------------------------------- |
| Ruihao Zhang (ObsisMc) | Team Leader; UI Design; Main Pages; Trading & Errand System |
| Zichen Xu (0d00)       | Chat System; User Profile Pages; Product & Errand System    |
| Jiewen Liu (ak-maker)  | Login & Product Pages; Routing                              |

**Overview**

1. [Project Info](#project-info)
2. [Build Setup](#build-setup)
3. [Demo](#demo)

## Project Info

**Description**

The SUSTech store (SUSTech online flea market) is for students to trade things like second-hand items, books, etc. The store also has errand function so that students can spend money to ask others to fetch something.



**Technology**

| Front end              | Back end                           |
| ---------------------- | ---------------------------------- |
| Vue; axios; Element-UI | Spring Boot; Mysql; Redis; Swagger |



## Build Setup

### Back End

Please see [CS309-SUSTech-Store-Backend](https://github.com/Evens1sen/CS309_SUSTech_Store_Backend).

Pay attention: We use storage server of Alibaba Cloud Computing Co. Ltd.. Due to expiration of the server, the website cannot show any pictures.

### Front End

Pay attention: modify `store.state.database` in `sustechstore/src/store/store.js` to set url of your back end.

#### Fundamental setup

``` bash
# get into project root directory
cd ./sustechstore

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

#### Necessary requirement

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
# baiduMap
npm install vue-baidu-map --save
    # in main.js
    import BaiduMap from 'vue-baidu-map';
    Vue.use(BaiduMap,{ak:'...'})
```





## Demo

> Due to expiration of the server, the website cannot show any pictures.

The whole picture:

https://user-images.githubusercontent.com/71996633/210579238-8651a730-ef37-45ef-abef-4ffd306cd05b.mp4



### Search

Products can be searched by several attributes:

- Categories: study, food, electronic device and living
- Product type: a product is to be sold or is wanted
- Rating: the rating of a product's owner
- Price range: price of a product should be in this range

https://user-images.githubusercontent.com/71996633/210579805-b24a0ef2-b43a-46b7-ad85-6b61ba490e7d.mp4



### Upload Products & Trade

Users can upload their things:

https://user-images.githubusercontent.com/71996633/210579767-8ce8f90c-8c0f-4362-a250-1fa136b2c404.mp4



They can trade things using virtual currency. The following demo shows a trading process, which contains several steps:

1. The buyer places an order and pays the money, then wait the seller to deliver the goods.
2. The seller delivers the goods and then click the button to confirm the delivery.
3. If the buyer get the goods, he/she click the button to confirm the arrival of the goods.

https://user-images.githubusercontent.com/71996633/210580023-ae52d2c9-f8aa-421a-843d-4cf50f5f1d38.mp4



#### Chat System

The project has real-time chat function:

https://user-images.githubusercontent.com/71996633/210579706-352a7366-95f0-47a9-936a-55aa883426cf.mp4



#### Errand System

It's similar to ordinary commodity trading and the difference is that it uses third-party APIs (Baidu Maps) to implement the positioning function.



Main page:

https://user-images.githubusercontent.com/71996633/210688677-568b23bc-6495-4ddd-929a-2c31502bbe20.mp4



Upload a errand task:

https://user-images.githubusercontent.com/71996633/210688682-1b2bcc5d-4e56-4040-8955-0c5f4e9daca9.mp4

