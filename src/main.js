import Vue from 'vue';

import CuteConfig from './lib/cuteConfig';
import hljs from './lib/highlight';
import VueHljs from 'vue-hljs-lite';
import VueClipboard from 'vue-clipboard2';
import VSelect from 'vue-select';

import App from './App';
import ErrorPage from './ErrorPage';

Vue.config.productionTip = false;
Vue.use(VueHljs, { hljs });
Vue.use(VueClipboard);
Vue.component('v-select', VSelect);

const root = document.getElementById('app');
const rootPath = root.getAttribute('data-root') || '';

const url = process.env.NODE_ENV === 'demo'
  ? '/insomnia-documenter/insomnia.json'
  : `${rootPath}/insomnia.json`;

window.INSOMNIA_URL = url;

const buildVM = async () => {
  try {
    const json = await fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    const config = new CuteConfig(json).generate();

    return new Vue({
      render: h => h(App, {
        props: { config }
      })
    });
  } catch (err) {
    console.error(err);

    return new Vue({
      render: h => h(ErrorPage)
    });
  }
};

(async () => {
  const vm = await buildVM();
  return vm.$mount('#app');
})();
