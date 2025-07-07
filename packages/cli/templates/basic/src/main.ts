import "./index.css";
import { render } from "./App.cnx";
import { ConnextComponent, router } from "@connext/runtime";

// Configurar rutas básicas
router.addRoute('/', () => {
  new ConnextComponent(document.getElementById("app")!, render);
});

// Ruta por defecto
router.addRoute('*', () => {
  new ConnextComponent(document.getElementById("app")!, render);
});

// Ejecutar el enrutamiento inicial una vez registradas las rutas
router.navigate(window.location.pathname, true);
