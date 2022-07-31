import type { App } from 'vue'
import ButtonPlugin, { SButton } from '../src/button'
export { SButton }

const installs = [ButtonPlugin]

export default {
  install(app: App) {
    installs.forEach(comp => app.use(comp))
  }
}
