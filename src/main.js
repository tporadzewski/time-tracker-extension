import { createApp } from 'vue'
import App from './App.vue'

const APP_ID = 'timer-chrome-extenstion-container'

const createAppContainer = () => {
  const container = document.createElement('div')

  container.id = APP_ID
  container.style.all = 'initial'
  container.style.position = 'fixed'
  container.style.top = '40px'
  container.style.right = '40px'
  container.style.zIndex = '999999999999999999999'

  return container
}

const createTimer = () => {
  const mountTarget = document.createElement('div')
  const appContainer = createAppContainer()

  document.body.appendChild(appContainer)

  appContainer.attachShadow({ mode: 'closed' }).appendChild(mountTarget)

  createApp(App).mount(mountTarget)
}

const checkIsTimerInitialized = () => !document.querySelector(`#${APP_ID}`)

const initializeTimer = () => {
  if (checkIsTimerInitialized()) {
    createTimer()
  }
}

initializeTimer()
