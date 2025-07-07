export class ConnextComponent {
    target;
    renderFn;
    isDestroyed = false;
    constructor(target, renderFn) {
        this.target = target;
        this.renderFn = renderFn;
        // Realizar el renderizado inicial
        this.render();
    }
    render() {
        if (this.isDestroyed)
            return;
        this.renderFn(this.target);
    }
    destroy() {
        this.isDestroyed = true;
        this.target.innerHTML = '';
    }
}
// Sistema de rutas básico
export class ConnextRouter {
    routes = new Map();
    currentRoute = '';
    constructor() {
        window.addEventListener('popstate', () => this.handleRouteChange());
        this.handleRouteChange();
    }
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }
    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRouteChange();
    }
    handleRouteChange() {
        const path = window.location.pathname;
        const handler = this.routes.get(path) || this.routes.get('*');
        if (handler) {
            this.currentRoute = path;
            handler();
        }
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
}
// Instancia global del router
export const router = new ConnextRouter();
