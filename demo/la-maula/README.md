# La Maula · demo DENEXA

Propuesta comercial estática. No usa datos, credenciales ni endpoints de comercios activos. No registra órdenes ni envía mensajes. El carrito y los favoritos se guardan solo en el navegador; los datos del formulario no se guardan en almacenamiento persistente.

## Referencia de diseño

Recorrido inspirado en `demo/empanadas-calentitas`: bienvenida, portada interna, categorías con fotografías, promoción, productos, carrito, retiro/delivery, datos del cliente, pago y confirmación. Identidad propia de La Maula: negro, verde lima, personaje, escudo y lema.

## Catálogo y fotos

Fotos originales descargadas del perfil público `https://www.instagram.com/carrito_lamaula/`, consultado el 5 de noviembre de 2026. Las URLs exactas de las publicaciones están en `CATALOG` en `app.js`.

- Promo 2 hamburguesas completas + fritas: $400, publicación 9/10/2026.
- Gramajo: $480, imagen publicada el 24/10/2026.
- Ensalada de frutas: $100, imagen publicada el 7/10/2026.
- Chivito, milanesa con cheddar y huevo, milanesa napolitana y napolitana con pan: **precio a confirmar**, no se inventan importes. El nombre descriptivo de la milanesa con cheddar está pendiente de confirmar.

Precios son de referencia, sujetos a confirmación. No se afirma disponibilidad actual. No se añaden variantes o adicionales no verificados ni una tarifa ficticia de delivery. El simulador permite productos pendientes y distingue el subtotal conocido del importe pendiente.

## Logo

`assets/la-maula-logo.webp`: propuesta de renovación generada a partir del logo aportado por Denis. Mantiene personaje, escudo, cinta, nombre, lema e identidad de colores; fondo exterior transparente. No representa aprobación del comercio.

## Verificación

Validar en móvil: bienvenida → categoría → producto → cantidad/aclaración → carrito → retiro/delivery → datos → efectivo/transferencia → simulación → resumen. Verificar búsqueda, favoritos, persistencia de carrito, quitar/vaciar, validación de datos, precios pendientes y reinicio. Revisión sintáctica: `node --check app.js`.

### Resultado de revisión · 05/11/2026

Verificados en navegador con vista móvil de 390×844: bienvenida, categorías y filtro, producto con cantidad y nota, 2 combos = $800, reducción a 1 = $400, validación de nombre/teléfono/dirección, delivery + transferencia, resumen completo, reinicio, búsqueda por chivito, favoritos y persistencia después de recargar, producto con precio pendiente, carrito mixto ($400 más importe pendiente), conservar y vaciar carrito. Bienvenida adicional revisada a 320×640. Sin fotos rotas ni desborde horizontal en la revisión móvil. JS validado con `node --check`. `preview-mobile.jpg` muestra la revisión del menú.
