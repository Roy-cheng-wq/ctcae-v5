<template>
  <h1>記憶卡牌遊戲</h1>

  <div class="options">
    <label>
      選擇遊戲模式：
      <select v-model.number="selectedCount" @change="startGame">
        <option :value="12">12 張 (4x3)</option>
        <option :value="16">16 張 (4x4)</option>
      </select>
    </label>
    <button @click="startGame">重新開始</button>
  </div>

  <div class="board-wrapper">
    <div
      class="board"
      :style="{ gridTemplateColumns: `repeat(${columns}, minmax(50px, 1fr))` }"
    >
      <Card
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @flip="onFlip"
      />
    </div>
  </div>

  <div class="stats">
    <div>時間：{{ formattedTime }}</div>
    <div>翻對次數：{{ matchedCount }}</div>
    <div>翻錯次數：{{ wrongCount }}</div>
    <div>正確率：{{ accuracy }}%</div>
  </div>

  <div v-if="isWin" class="win-message">
    <p>恭喜你過關了！🎉</p>
    <p>用時：{{ formattedTime }}</p>
    <p>翻對次數：{{ matchedCount }}</p>
    <p>翻錯次數：{{ wrongCount }}</p>
    <p>正確率：{{ accuracy }}%</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Card from './components/Card.vue'

const allEmojiList = [
  '🍎', '🍌', '🍓', '🍇', '🍊', '🍉', '🍍', '🥝',
  '🥥', '🍒', '🥭', '🍑', '🍐', '🍋', '🍈', '🍏'
]

const selectedCount = ref(12)
const cards = ref([])
const flippedCards = ref([])
const isWin = ref(false)

const layoutMap = {
  12: 4,
  16: 4
}

const columns = computed(() => layoutMap[selectedCount.value] || 4)

const startTime = ref(null)
const elapsedTime = ref(0)
let timerId = null

const matchedCount = ref(0)
const wrongCount = ref(0)

const formattedTime = computed(() => {
  const totalSeconds = Math.floor(elapsedTime.value / 1000)
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const s = String(totalSeconds % 60).padStart(2, '0')
  return `${m}:${s}`
})

const accuracy = computed(() => {
  const total = matchedCount.value + wrongCount.value
  if (total === 0) return 0
  return ((matchedCount.value / total) * 100).toFixed(1)
})

function startTimer() {
  startTime.value = Date.now()
  elapsedTime.value = 0
  if (timerId) clearInterval(timerId)
  timerId = setInterval(() => {
    elapsedTime.value = Date.now() - startTime.value
  }, 1000)
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

function startGame() {
  isWin.value = false
  flippedCards.value = []
  matchedCount.value = 0
  wrongCount.value = 0
  elapsedTime.value = 0
  startTimer()

  const count = selectedCount.value
  const chosenEmojis = allEmojiList.slice(0, count / 2)

  let id = 0
  const duplicated = [...chosenEmojis, ...chosenEmojis].map(content => ({
    id: id++,
    content,
    isFlipped: false,
    isMatched: false
  }))

  cards.value = duplicated.sort(() => Math.random() - 0.5)
}

function onFlip(card) {
  if (flippedCards.value.length >= 2) return
  if (card.isFlipped || card.isMatched) return

  card.isFlipped = true
  flippedCards.value.push(card)
  cards.value = [...cards.value]

  if (flippedCards.value.length === 2) {
    const [a, b] = flippedCards.value
    if (a.content === b.content) {
      a.isMatched = true
      b.isMatched = true
      matchedCount.value++
      flippedCards.value = []
      checkWin()
    } else {
      wrongCount.value++
      setTimeout(() => {
        a.isFlipped = false
        b.isFlipped = false
        flippedCards.value = []
        cards.value = [...cards.value]
      }, 1000)
    }
  }
}

function checkWin() {
  if (cards.value.every(card => card.isMatched)) {
    isWin.value = true
    stopTimer()
  }
}

onMounted(() => {
  startGame()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style>
body {
  background: #e6f2ff;
  font-family: sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.options {
  max-width: 500px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-wrapper {
  background-color: #cce0ff;
  border: 4px solid #333;
  border-radius: 16px;
  padding: 20px;
  max-width: 95vw;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.board {
  display: grid;
  gap: 8px;
  justify-content: center;
}

.stats {
  max-width: 500px;
  margin: 20px auto;
  font-size: 1rem;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
}

.win-message {
  max-width: 500px;
  margin: 20px auto;
  font-size: 1.5rem;
  color: green;
  text-align: center;
  font-weight: bold;
}
</style>

