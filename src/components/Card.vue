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
  card: {
    type: Object,
    required: true
  }
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
  width: 80px;
  height: 100px;
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
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: bold;
}

.card-front {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: transparent;
  border: 2px solid #ecf0f1;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.1);
}

.card-back {
  transform: rotateY(180deg);
  background-color: white;
  color: #2c3e50;
  border: 2px solid #34495e;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>
