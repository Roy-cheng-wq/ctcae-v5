<template>
  <div class="app">
    <h1><strong>JSON</strong> 排版轉換工具</h1>

    <textarea v-model="rawJson" placeholder="輸入 JSON"></textarea>

    <button @click="convertJson">轉換</button>

    <h2>轉換結果</h2>
    <p v-if="error" class="error">{{ error }}</p>

    <VueJsonPretty :data="formattedJson" v-if="formattedJson" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const rawJson = ref('')
const formattedJson = ref(null)
const error = ref('')

function convertJson() {
  error.value = ''
  try {
    formattedJson.value = JSON.parse(rawJson.value)
  } catch (e) {
    formattedJson.value = null
    error.value = '無效的 JSON 格式！'
  }
}
</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 3rem auto;
  padding: 1.5rem;
  background-color: #f0f8ff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
}

textarea {
  width: 100%;
  height: 100px; /* 更小一點 */
  font-family: monospace;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  margin: 1rem 0;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1.2rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #005fa3;
}

h1 {
  font-size: 1.5rem;
  color: #0d3a71;
  margin-bottom: 1rem;
}

h2 {
  margin-top: 1.5rem;
  color: #0d3a71;
}

.error {
  color: red;
  margin: 0.5rem 0;
  font-weight: bold;
}
</style>
