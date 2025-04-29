<template>
  <div class="json-box">
    <h2>這是 JSON Viewer！</h2>

    <JsonViewer
      :value="jsonData"
      :expand-depth="2"
      copyable
      boxed
      sort
    />

    <!-- 備用顯示區：純文字 JSON（幫你除錯用） -->
    <pre class="fallback-json">
      {{ JSON.stringify(jsonData, null, 2) }}
    </pre>
  </div>
</template>

<script setup>
import JsonViewer from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'

const jsonData = {
  name: "喵娘",
  job: "Clumsy Assistant",
  skills: ["meow", "purr", "trip over code"],
  fluff: {
    level: 9000,
    danger: "minimal"
  }
}
</script>

<style scoped>
.json-box {
  border: 2px dashed hotpink;
  padding: 1em;
  margin: 2em auto;
  width: 80%;
  background-color: #fff0f5;
  box-shadow: 0 0 10pxrgb(182, 193, 255);
  border-radius: 12px;
}

h2 {
  color:rgb(24, 10, 221);
  font-size: 1.8em;
}

.fallback-json {
  margin-top: 1em;
  background-color: #fdf6f9;
  color:rgb(61, 88, 241);
  padding: 1em;
  border-radius: 10px;
  font-family: monospace;
  white-space: pre-wrap;
}
</style>