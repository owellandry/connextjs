// Inicializar error handler automáticamente
if (typeof window !== 'undefined') {
    import('@connext/error-handler').then(({ errorHandler }) => {
        window.connextErrorHandler = errorHandler;
    }).catch(() => {
        // Error handler no disponible, continuar sin él
    });
}
export class ConnextComponent {
    target;
    renderFn;
    isDestroyed = false;
    componentId;
    constructor(target, renderFn) {
        this.target = target;
        this.renderFn = renderFn;
        this.componentId = Math.random().toString(36).substr(2, 9);
        // Realizar el renderizado inicial
        this.render();
    }
    render() {
        if (this.isDestroyed)
            return;
        try {
            this.renderFn(this.target);
        }
        catch (error) {
            console.error('Error rendering component:', error);
            if (window.connextErrorHandler) {
                window.connextErrorHandler.reportError(error, `Component Rendering (${this.componentId})`);
            }
        }
    }
    destroy() {
        this.isDestroyed = true;
        this.target.innerHTML = '';
    }
    getId() {
        return this.componentId;
    }
}
// Sistema de rutas avanzado para SPA
export class ConnextRouter {
    routes = new Map();
    currentRoute = '';
    currentComponent = null;
    isNavigating = false;
    constructor() {
        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            this.handleRouteChange();
        });
        // Interceptar clicks en enlaces para navegación SPA
        document.addEventListener('click', (e) => {
            const target = e.target;
            const link = target.closest('a[href]');
            if (link && this.isInternalLink(link.href)) {
                e.preventDefault();
                const path = new URL(link.href).pathname;
                this.navigate(path);
            }
        });
        this.handleRouteChange();
    }
    isInternalLink(href) {
        try {
            const url = new URL(href);
            return url.origin === window.location.origin;
        }
        catch {
            return false;
        }
    }
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }
    navigate(path, replace = false) {
        if (this.isNavigating)
            return;
        this.isNavigating = true;
        try {
            // Actualizar la URL sin recargar
            if (replace) {
                window.history.replaceState({ path }, '', path);
            }
            else {
                window.history.pushState({ path }, '', path);
            }
            this.handleRouteChange();
        }
        catch (error) {
            console.error('Error navigating:', error);
            if (window.connextErrorHandler) {
                window.connextErrorHandler.reportError(error, 'Router Navigation');
            }
        }
        finally {
            this.isNavigating = false;
        }
    }
    handleRouteChange() {
        const path = window.location.pathname;
        // Destruir componente anterior si existe
        if (this.currentComponent) {
            this.currentComponent.destroy();
            this.currentComponent = null;
        }
        // Buscar handler para la ruta
        let handler = this.routes.get(path);
        // Si no hay handler exacto, buscar rutas con parámetros
        if (!handler) {
            for (const [routePath, routeHandler] of this.routes.entries()) {
                if (this.matchRoute(routePath, path)) {
                    handler = routeHandler;
                    break;
                }
            }
        }
        // Usar handler por defecto si no se encuentra ninguno
        if (!handler) {
            handler = this.routes.get('*');
        }
        if (handler) {
            try {
                this.currentRoute = path;
                handler();
            }
            catch (error) {
                console.error('Error executing route handler:', error);
                if (window.connextErrorHandler) {
                    window.connextErrorHandler.reportError(error, `Route Handler (${path})`);
                }
            }
        }
    }
    matchRoute(routePath, actualPath) {
        // Soporte básico para rutas con parámetros (/user/:id)
        const routeParts = routePath.split('/');
        const actualParts = actualPath.split('/');
        if (routeParts.length !== actualParts.length) {
            return false;
        }
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const actualPart = actualParts[i];
            if (routePart.startsWith(':')) {
                // Es un parámetro, continuar
                continue;
            }
            else if (routePart !== actualPart) {
                return false;
            }
        }
        return true;
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    getRouteParams(routePath) {
        const params = {};
        const routeParts = routePath.split('/');
        const actualParts = this.currentRoute.split('/');
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            if (routePart.startsWith(':')) {
                const paramName = routePart.slice(1);
                params[paramName] = actualParts[i] || '';
            }
        }
        return params;
    }
    setCurrentComponent(component) {
        this.currentComponent = component;
    }
}
// Instancia global del router
export const router = new ConnextRouter();
