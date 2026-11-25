# Super Liguilla 2.0

Quiniela de la Liguilla Liga MX para un grupo cerrado de participantes.

- **App:** https://quiniela.protectsoft.com.mx
- **Motor:** Google Apps Script + Google Sheets (datos, códigos por correo, puntos, bitácora).
- **Front:** Cloudflare Worker (`worker/worker.js`) que sirve la página y reenvía `/api` a Apps Script.

## Reglas
- Marcador exacto = 2 pts · resultado (local/empate/visita) = 1 pt.
- Desempate: menor diferencia acumulada de goles entre pronóstico y resultado real.
- Sin quiniela: se toma 0-0 solo para la diferencia, nunca suma puntos.
- Los pronósticos ajenos se ven cuando empieza cada partido.

## Imágenes (`img/`)
Portada, ícono e insignias ilustradas por equipo (no son escudos oficiales).
