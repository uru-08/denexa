# Enlace de Instagram de DENEXA en los menús

Preferencia indicada por Denis el 5 de noviembre de 2026: incorporar en los próximos menús y demos un enlace directo y visible a Instagram de DENEXA, para que los visitantes puedan conocer la plataforma.

- Perfil: https://www.instagram.com/denexa.uy/
- Colocación: pie del menú, junto a la firma «Impulsado por DENEXA».
- Texto visible: «Conocé DENEXA en Instagram» y «@denexa.uy».
- Abrir en otra pestaña con `target="_blank" rel="noopener noreferrer"`, conservando el pedido y el menú abiertos.
- Usar el estilo reutilizable `css/denexa-social.css`, ajustando la ruta relativa según el menú. Respeta `--lime` cuando el menú define esa variable.
- Mantener texto legible de 14–15 px, icono de Instagram y objetivo táctil amplio. No mezclar este enlace con el Instagram o WhatsApp del comercio.

Primera integración: `demo/la-maula/index.html`, clase `.denexa-social`. Usar ese enlace como referencia para los próximos menús. No se modificaron retroactivamente los menús de otros comercios.
