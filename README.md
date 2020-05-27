# Welcome to vue-use-worker 👋

[![Version](https://img.shields.io/npm/v/vue-use-worker.svg)](https://www.npmjs.com/package/vue-use-worker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: tarektweeti](https://img.shields.io/twitter/follow/tarektweeti.svg?style=social)](https://twitter.com/tarektweeti)

> Web Worker API implemented as Vue.js composition functions

### 🏠 [Homepage](https://github.com/Tarektouati/vue-use-worker)

## Install

```sh
# install with yarn
yarn add @vue/composition-api vue-use-worker

# install with npm
npm install @vue/composition-api vue-use-worker
```

## Usage

```vue
<template>
  <button @click="runReduce()">run reduce</button>
</template>

<script>
import useWorker from 'vue-use-worker';

export default {
  setup() {
    const reduce = array => array.reduce((acc, cur) => (acc * cur) / cur - Math.random(), 1);
    const [workerReduce] = useWorker(reduce);
    const numbers = [...Array(9000000)].map(() => Math.floor(Math.random() * 1000000));
    return { workerReduce, numbers };
  },
  methods: {
    async runReduce() {
      await this.workerReduce(this.numbers);
    }
  }
};
</script>
```

## Author

👤 **Tarek Touati**

- Twitter: [@tarektweeti](https://twitter.com/tarektweeti)
- Github: [@Tarektouati](https://github.com/Tarektouati)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Tarektouati/vue-use-worker/issues).

## Show your support

Give a ⭐️ if this project helped you!

## Inspiration

This library is inspired by [useWorker](https://github.com/alewin/useWorker) for React.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
