# Craft Burger · Demo DENEXA

Rediseño de las portadas de bienvenida y menú según los dos bocetos entregados por Denis. Identidad negra/naranja, logo oficial de Craft Burger, marca DENEXA en cabecera y pie, categorías desplegables, iconos vectoriales, botones con relieve y efectos de humo/fuego.

## Datos y fotografías
- Catálogo de referencia: https://pedir.uy/craftburger (consultado el 5 de noviembre de 2026).
- Nombres y precios conservados del demo previo; 27 productos, 5 categorías.
- Fotografías originales del comercio: URLs en `assets/photo-sources.json`. Se retiró el fondo mediante edición de imágenes y se optimizaron como WebP con transparencia.
- Logo oficial: `craft_burger_logo_transparente(1).png` aportado previamente por el usuario.
- Logo DENEXA: recurso existente del proyecto.
- Fritas: imagen de referencia, indicada en el pie; https://www.citypng.com/photo/22066/fried-french-fries-transparent-png
- Fondo de ladrillos y fuego: recursos decorativos generados para este demo.

## Recursos visuales
Se utilizó generación/edición integrada para recortar las fotografías, con la instrucción de retirar únicamente fondo, mesa, humo y manos, manteniendo la hamburguesa, ingredientes, textura, proporciones y ángulo originales. Se solicitó transparencia alfa real, encuadre ajustado y ningún elemento o ingrediente añadido. El fondo decorativo pedido fue una pared negra de ladrillos con dos lámparas industriales, luz naranja, sin texto ni comida. El fuego es una banda de llamas fotográficas naranja y amarilla con transparencia; se anima con transformaciones CSS.

## Funcionamiento y revisión
- Demo estático: no envía pedidos ni procesa pagos.
- Carrito y favoritos guardados en el navegador; nombre/dirección solo durante la sesión en memoria.
- Búsqueda, apertura/cierre de categorías, acceso a promos, favoritos, cantidades, eliminación, totales y simulación. POS cambia a entrega y requiere dirección.
- Bienvenida visible al abrir y recuperable desde el pie.
- Se pausaron efectos fuera de pantalla y con la pestaña oculta; se respeta movimiento reducido.
- Revisado a 390×844 y 320×640, con los recortes sobre fondo negro, navegación sin salto al pie y simulación de pedido por $770.
