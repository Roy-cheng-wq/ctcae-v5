<template>
  <div class="container">
    <h1>JSON 美化工具 ✨</h1>
    <div class="editor">
      <textarea
        v-model="inputJson"
        placeholder="貼上你的 JSON 字串到這裡～"
      ></textarea>
      <textarea
        :value="formattedJson"
        readonly
        placeholder="這裡會顯示整理好的結果喔！"
      ></textarea>
    </div>
    <button @click="formatJson">整理 JSON</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputJson = ref('');
const formattedJson = ref('');

function formatJson() {
  try {
    const parsed = JSON.parse(inputJson.value);
    formattedJson.value = JSON.stringify(parsed, null, 2); // 美化，2個空白縮排
  } catch (e) {
    formattedJson.value = '❌ 無效的 JSON！請重新檢查喔～';
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.editor {
  display: flex;
  gap: 20px;
}
textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
}
button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #38a17c;
}
</style>
