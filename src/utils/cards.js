export function generateCards(mode) {
  const emojiPool = ['🍎', '🍌', '🍓', '🍇', '🍍', '🥝', '🍑', '🍒', '🥥', '🍉', '🍋', '🍊']
  let total = mode === '4x4' ? 16 : 12
  const emojis = emojiPool.slice(0, total / 2)

  const values = [...emojis, ...emojis]

  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[values[i], values[j]] = [values[j], values[i]]
  }

  return values.map((v, idx) => ({
    id: idx,
    value: v,
    flipped: false,
    matched: false,
  }))
}