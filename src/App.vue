<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initDynamicRouter } from './router/index'

export default {
  name: 'App',
  created () {
    initDynamicRouter()
  }
}
</script>
