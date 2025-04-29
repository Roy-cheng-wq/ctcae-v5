<template>
  <div class="container">
    <h1>JSON 排版轉換工具</h1>
    <textarea v-model="rawJson" placeholder="請貼上 JSON 字串"></textarea>
    <button @click="formatJson">轉換</button>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="formattedJson" class="viewer">
      <h2>轉換結果</h2>
      <JsonViewer :value="formattedJson" :expand-depth="2" copyable boxed sort />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JsonViewer from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'

const rawJson = ref('')
const formattedJson = ref(null)
const error = ref('')

function formatJson() {
  error.value = ''
  try {
    formattedJson.value = JSON.parse(rawJson.value)
  } catch (e) {
    error.value = '格式錯誤：請輸入有效的 JSON'
    formattedJson.value = null
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  background: #e6f0f8;
  padding: 2em;
  border-radius: 1em;
  box-shadow: 0 0 12px rgba(0, 0, 128, 0.1);
}

h1 {
  color: #2a5d9f;
}

textarea {
  width: 90%;
  height: 150px;
  padding: 1em;
  font-family: monospace;
  border: 2px solid #a3c2e3;
  border-radius: 8px;
  resize: vertical;
  background-color: #f8fbff;
  color: #003366;
}

button {
  margin-top: 1em;
  background: #5a9bd8;
  color: white;
  border: none;
  padding: 0.6em 1.2em;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #468ccf;
}

.viewer {
  margin-top: 2em;
  text-align: left;
  background: #ffffff;
  padding: 1em;
  border-radius: 0.5em;
  border: 1px solid #d0e3f1;
}

.error {
  color: #c00;
  margin-top: 1em;
}
</style>
