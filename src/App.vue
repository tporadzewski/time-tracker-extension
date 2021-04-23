<template>
  <div part="app">
    {{ formattedHours }}:{{ formattedMinutes }}:{{ formattedSeconds }}
    <BaseButton color="secondary" @click="handleToggleTimerClick()">
      {{ timerButtonLabel }}
    </BaseButton>
    <BaseButton @click="handleCloseExtensionClick()">{{ closeLabel }}</BaseButton>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import BaseButton from './components/BaseButton'
import { APP_ID } from './constants'

const formatTime = time => (String(time).length === 1 ? `0${time}` : time)
export default {
  name: 'App',
  components: { BaseButton },
  setup (props, context) {
    const counter = ref(null)

    const seconds = ref(0)
    const minutes = ref(0)
    const hours = ref(0)
    const formattedSeconds = computed(() => formatTime(seconds.value))
    const formattedMinutes = computed(() => formatTime(minutes.value))
    const formattedHours = computed(() => formatTime(hours.value))

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

    const isTimerActive = computed(() => typeof counter.value === 'number')
    const timerButtonLabel = computed(() => (isTimerActive.value ? 'Stop' : 'Resume'))

    const handleToggleTimerClick = () => {
      if (isTimerActive.value) {
        stopCounter()
      } else {
        initCounter()
      }
    }

    const closeLabel = 'Close'
    const handleCloseExtensionClick = () => {
      const appContainer = document.querySelector(`#${APP_ID}`)

      appContainer.remove()
      window.removeEventListener('blur', () => stopCounter())
      window.removeEventListener('focus', () => initCounter())
    }

    window.addEventListener('blur', () => stopCounter())
    window.addEventListener('focus', () => initCounter())

    initCounter()

    return {
      formattedSeconds,
      formattedMinutes,
      formattedHours,
      handleToggleTimerClick,
      timerButtonLabel,
      closeLabel,
      handleCloseExtensionClick
    }
  }
}
</script>
<style lang="scss">
@import "scss/variables.scss";

#{$app-selector} {
  &::part(app) {
    background: linear-gradient(
      180deg,
      color("primary") 0%,
      color("primary", "light") 100%
    );
    padding: 1em;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: $font-family;
    font-size: $font-size-lg;
    color: color("light");
  }
}
</style>
