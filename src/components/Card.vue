<template>
  <div class="card" @click="handleClick">
    <div class="card-inner" :class="{ flipped: card.isFlipped || card.isMatched }">
      <div class="card-front"></div>
      <div class="card-back">{{ card.content }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  card: { type: Object, required: true }
})
const emit = defineEmits(['flip'])

function handleClick() {
  if (!props.card.isFlipped && !props.card.isMatched) {
    emit('flip', props.card)
  }
}
</script>

<style scoped>
.card {
  width: 20vw;
  max-width: 80px;
  height: 25vw;
  max-height: 100px;
  perspective: 1000px;
  cursor: pointer;
  margin: 2px;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.card-front {
  background: linear-gradient(45deg, #1e90ff, #63b3ed);
  color: transparent;
}

.card-back {
  transform: rotateY(180deg);
  background-color: white;
}
</style>
