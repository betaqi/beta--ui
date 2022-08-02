import STree from './src/tree'
import type { App } from 'vue'

export { STree }

export default {
  install(app: App) {
    app.component(STree.name, STree)
  }
}
