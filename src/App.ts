import Router from '@src/lib/Router';
import Component from '@src/core/Component';

import Home from '@src/pages/Home';
import Alarm from '@src/pages/Alarm';
import Memo from '@src/pages/Memo';
import Picture from '@src/pages/Picture';

const routerPath = {
  '/': Home,
  '/alarm': Alarm,
  '/memo': Memo,
  '/picture': Picture
};
export const router = new Router(routerPath);
export default class App extends Component {
  setup() {}

  mounted() {
    router.init(this.$target);
  }
}
