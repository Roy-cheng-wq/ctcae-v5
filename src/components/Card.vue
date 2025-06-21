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
  console.log('卡片翻面觸發', props.card)
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
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
.card-front {
  background-color: #fff;
  background-image: repeating-linear-gradient(
    45deg,
    #d62828,
    #d62828 4px,
    #ffffff 4px,
    #ffffff 8px
  );
  background-size: cover;
  color: transparent;
}
.card-back {
  transform: rotateY(180deg);
  background-color: white;
}
</style>
