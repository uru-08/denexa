# Carro Kechu: pausa solicitada por Denis, 22 de octubre de 2026

Retomar mañana o más tarde cuando Denis lo pida. No hay recordatorio programado.

## Estado al pausar

- Main: 22ec5cb951bd12838d44e2d3cb8ab9f18f76545b (v192).
- V191 publicada y verificada en navegador: promo compacta de unos 119px en escritorio, sin megáfono; textos negros sobre amarillo; categorías Arial blancas legibles; tarjetas de delivery y estado amarillas; marca DENEXA blanca/X amarilla en bienvenida.
- V192 enviada: evita superposición entre DENEXA y el logo Kechu en bienvenida móvil. El rótulo pasa de absoluto a flujo normal y tiene margen inferior de 18px. Falta revisión visual en teléfono.
- Portada del menú aprobada, preservar. Nombre gráfico de bienvenida aprobado, preservar.
- Navegación fluida según Denis. No tocar flujo de pedidos, precios, productos, pagos ni WhatsApp.
- Respaldo previo a portadas: respaldo-pre-portada-aprobada-v184-20261022.

## Última decisión: pendiente, NO aplicada

1. Invertir colores de las dos tarjetas bajo la portada (motito «De la cocina a tu casa» y estado real «Tomando pedidos»): fondo negro con letras amarillas. Mantener tamaño de las tarjetas; letras grandes, gruesas y centradas.
2. Promo: también fondo negro con letras amarillas, compacta y con volumen/relieve; no volver al cartel alto.
3. Añadir llamitas/fueguitos o destellos discretos animados en el fondo de la promo para que tenga vida. Nunca detrás de letras de forma que perjudique lectura. Mantener navegación fluida y pausa fuera de pantalla.
4. No reintroducir megáfono ni porcentaje que se superpongan al texto. No restaurar firma repetida «Menú online impulsado por DENEXA» eliminada.
5. Conservar tipografía de categorías clara y legible. Denis delegó elección de fuente/color por legibilidad. La tipografía generada de la imagen no es una fuente exacta; aceptó una fuente aproximada para textos dinámicos, pero rechazó Knewave/Lilita One por legibilidad y finalmente se cambió a Arial.

## Archivos relevantes

- index.html: carga css/kechu-cover.css?v=192 y contiene ambas áreas originales de bienvenida y menú.
- css/kechu-cover.css: estilos Kechu específicos; varias versiones al final. Revisar especificidad de reglas previas con !important.
- css/kechu-mobile-future.css: base móvil v183; preservar lo aprobado.
- js/kechu-visual-performance.js: pausa efectos fuera de pantalla y con pestaña oculta; no modifica pedidos.
- assets/kechu/portada-aprobada-v184.webp: imagen aprobada de portada (CSS muestra solo zona superior del boceto).
- assets/kechu/titulo-relieve-v190.webp: rótulo de bienvenida con transparencia.

Los cambios nuevos de negro/amarillo y llamas quedan solo anotados, no publicados, por pedido de pausa.

## Aclaraciones finales antes de despedirse

- Denis confirma que la portada inicial/bienvenida le gusta y debe conservarse.
- Achicar el rótulo/botoncito superior DENEXA, manteniendo blanco con X amarilla y línea, para que sea discreto y no invada el logo Kechu. Además de la separación v192, el tamaño también debe reducirse en la próxima tanda.
- Cambiar el estilo de letra de «De la cocina a tu casa», «Tomando pedidos» y la promo («Caja Kechu» u otro nombre dinámico) por uno más bonito y coherente con la estética del sitio.
- Aclaración importante: ahora se lee perfectamente. El problema final es coherencia visual, no falta de legibilidad; conservar buena lectura y contraste al cambiar el estilo.
- Fondo negro/letras amarillas y llamas discretas continúan pendientes como arriba.
- Usuario cierra explícitamente: «Eso lo hacemos mañana. Listo, chao». No implementar ni publicar esta tanda durante la pausa. No crear automatización ni recordar por iniciativa propia.
