export default class Router {
  constructor(routes) {
    this.routes = routes;
  }

  init(el) {
    this.renderHTML(el, this.routes[location.pathname]);
    window.addEventListener('popstate', () =>
      this.renderHTML(el, this.routes[location.pathname])
    );
  }

  push(el, pathName) {
    window.onpopstate = e => {
      return this.renderHTML(el, this.routes[location.pathname]);
    };
    window.history.pushState({}, pathName, location.origin + pathName);
    this.renderHTML(el, this.routes[pathName]);
  }

  pop() {
    history.back();
  }

  renderHTML(el, route) {
    new route(el);
  }
}
