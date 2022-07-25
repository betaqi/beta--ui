import Theme from 'vitepress/theme';
import HelloWorld from '../../../src/components/HelloWorld';
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
export default {
  ...Theme, //继承所有配置
  // 扩展应用实例
  enhanceApp({app}) {
    app.component('HelloWorld', HelloWorld);
    app.component('Demo', Demo);
    app.component('DemoBlock', DemoBlock);

  }
}