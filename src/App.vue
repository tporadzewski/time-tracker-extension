<template>
  <div part="container">
    {{ formattedHours }}:{{ formattedMinutes }}:{{ formattedSeconds }}
    <button
      part="timer-button"
      @click="handleToggleTimerClick()"
    >{{buttonLabel}}</button>
  </div>
</template>
<script>
import { computed, ref } from 'vue'

const formatTime = time => (String(time).length === 1 ? `0${time}` : time)
export default {
  setup () {
    const counter = ref(null)

    const seconds = ref(0)
    const minutes = ref(0)
    const hours = ref(0)
    const formattedSeconds = computed(() => formatTime(seconds.value))
    const formattedMinutes = computed(() => formatTime(minutes.value))
    const formattedHours = computed(() => formatTime(hours.value))
    const isTimerActive = computed(() => typeof counter.value === 'number')
    const buttonLabel = computed(() =>
      isTimerActive.value ? 'Stop' : 'Play'
    )

    const initCounter = () => {
      counter.value = setInterval(() => {
        seconds.value = seconds.value + 1
        if (seconds.value > 59) {
          minutes.value = minutes.value + 1
          seconds.value = 0
          if (minutes.value > 59) {
            hours.value = hours.value + 1
            minutes.value = 0
          }
        }
      }, 1000)
    }

    const stopCounter = () => {
      counter.value = clearInterval(counter.value)
    }

    const handleToggleTimerClick = () => {
      if (isTimerActive.value) {
        stopCounter()
      } else {
        initCounter()
      }
    }

    window.addEventListener('blur', () => stopCounter())
    window.addEventListener('focus', () => initCounter())

    initCounter()

    return {
      seconds,
      minutes,
      hours,
      formattedSeconds,
      formattedMinutes,
      formattedHours,
      handleToggleTimerClick,
      buttonLabel,
      counter
    }
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';

#timer-chrome-extenstion-container {
  &::part(container) {
    background: linear-gradient(180deg, color('secondary') 0%, color('secondary', 'light') 100%);
    padding: 1em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: $font-family;
    font-size: $font-size-lg;
  }

  &::part(timer-button) {
    display: inline-block;
    padding: 16px 48px;
    margin-top: 1em;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    outline: 0;
    transition: 0.1s ease;
    font-family: $font-family;
    font-size: $font-size;
    font-weight: $font-bold;
    background: color('primary');
    color: color('light');

    &:hover {
      box-shadow: 0 4px 20px color('primary', 'light');
    }
  }
}
</style>
