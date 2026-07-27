# Prompts del recorrido — AuditWhole (efecto dron premium)

## El efecto (cómo se logra)
- **Agua + neblina:** se mueven SIEMPRE (aunque no hagas scroll). Por eso el exterior son
  **videos en loop con cámara QUIETA** y solo el agua/neblina en movimiento.
- **El "dron" (abajo → frente → entrar):** sale del **crossfade entre clips de distinto
  ÁNGULO** controlado por el scroll. Más ángulos = dron más suave.
- **Cambio de cuarto:** lleva un **motion blur** (barrido) — eso lo hace el motor (postprocessing),
  no las imágenes.
- **Interior:** fotos fijas (ahí no hay agua, así no pesa tanto).
- **Labels editoriales** (código, título, FIN-03, links): los pone la web por encima (HTML),
  por eso cada imagen debe dejar **espacio negativo** arriba-izq y esquinas.

## Archivos finales — van TODOS en la carpeta `public/escenas/`
| # | Escena | Nombre exacto del archivo | Tipo |
|---|--------|---------------------------|------|
| EXT-1 | Exterior desde ABAJO (contrapicado) | `ext-1-abajo.mp4` | VIDEO loop |
| EXT-2 | Exterior de FRENTE (elevación) | `ext-2-frente.mp4` | VIDEO loop |
| EXT-3 | Exterior ACERCÁNDOSE / por entrar | `ext-3-entrada.mp4` | VIDEO loop |
| INT-1 | Recepción / lobby | `int-1-recepcion.jpg` | foto |
| INT-2 | Sala de reuniones | `int-2-reuniones.jpg` | foto |
| INT-3 | Corredor / lounge (escalera + agua) | `int-3-corredor.jpg` | foto |

> Empieza con EXT-1 y EXT-3 (EXT-2 ya la tienes). Si quieres el dron aún más suave, añade un
> ángulo intermedio entre frente y entrada.

---

## ⭐ Ancla de consistencia = la IMAGEN 1 elegida (de frente)
Esa imagen es la **EXT-2** y la **referencia para todas las demás**. Súbela siempre como
*style / image reference* al generar EXT-1 y EXT-3 → mismo edificio (dos volúmenes de hormigón,
entrada central de madera cálida, oficinas iluminadas), misma cascada, mismo espejo de agua con
caída al frente, misma hora azul y neblina.

## ⚙️ Cómo generar cada exterior (2 pasos)
1. **Imagen del ángulo:** usa la **Imagen 1 como referencia** (style/IP reference)
   para que sea EL MISMO edificio/cascada/neblina, solo cambiando el ángulo de cámara.
2. **Animarla en Kling (image-to-video):** con el *MOTION PROMPT* (cámara quieta, solo agua+neblina).
   16:9, audio off. La neblina tapa cualquier diferencia mínima entre ángulos.

## 🎥 Si Kling te mete zoom aunque el prompt diga que no
1. **Busca "Modo Profesional" (Professional Mode)** en Kling — si tiene sliders manuales de
   cámara (horizontal/vertical/**zoom**), ponlos todos en **0**. Esto es más confiable que el texto.
2. Si no hay sliders, el texto ya está reforzado al **inicio Y al final** del prompt (los modelos
   le dan más peso a lo último que leen) — aun así, es normal que salga un poco de zoom a veces.
3. **Vuelve a generar 2-3 veces** con el mismo prompt — es un proceso con algo de azar, casi
   siempre sale limpio a la segunda o tercera pasada. No es que algo esté mal si la primera falla.

## 🔁 Que el loop no se note (para que no "parezca que el video corta y vuelve a empezar")

**Por qué NO usar "boomerang" (adelante y luego al revés):** funciona genial para niebla o tela
ondeando, pero **NO para la cascada** — el agua se vería cayendo hacia ARRIBA en la mitad reversa,
y eso sí se nota raro. Como nuestros 3 clips tienen agua cayendo, descartamos el boomerang para
los 3 (mejor mantener la misma técnica en todos que mezclar).

**La técnica correcta aquí: loop por MEZCLA (crossfade) en el punto de unión.**
Se superponen ~0.5–1s del final del clip con el inicio (una disolución cortita, SIN invertir la
dirección del agua) — el ojo no detecta el corte porque el agua/neblina es una textura caótica
(no repite un patrón exacto), así que una mezcla corta se camufla sola. Esto se hace en edición
(no en Kling), es un paso rápido que **yo puedo hacerte automáticamente con un script** en cuanto
subas el clip crudo que te entregue Kling — no hace falta que aprendas edición de video.

**Duración ideal: 10–11 segundos** (analizado a fondo, no hace falta llegar a los 15).
Con agua/neblina (movimiento caótico, no cíclico), el ojo detecta la repetición cuando reconoce
un evento puntual (un salpicón, un remolino de niebla) que vuelve a aparecer — con ~9-10s de
contenido único (tras restar ~1s de la mezcla) ya hay margen de sobra para que eso no pase.

**Opción económica: 5 segundos.** Si prefieres cuidar créditos, generar a 5s también funciona —
solo quedan ~4s únicos por vuelta (más corto, algo más de riesgo de notarse si alguien se queda
mirando fijo esa escena mucho rato), pero el motor pausa cada video al alejarse con el scroll, así
que en la práctica casi nadie lo nota. Recomendado: **empieza con 5s para validar todo el flujo
barato**, y si alguna escena en particular se nota repetitiva, regenera solo esa a más duración.

**Sobre "que el final se parezca al inicio":** un modelo de video no "planea hacia atrás" un
fotograma final objetivo, así que pedirlo tal cual es poco confiable. Es mejor describir una
propiedad de TODO el clip en vez de un objetivo final (ya ajustado en los prompts de abajo). El
trabajo real de que no se note el corte lo hace la mezcla en edición (que yo te hago), no el prompt.

## 🎨 STYLE (pégalo en cada prompt de imagen)
> Fija variables físicas concretas (hora/luz, material) — sin esto el modelo puede regenerar el
> edificio ligeramente distinto en cada ángulo.
```
Match the reference image exactly: the SAME modern building — two board-formed concrete volumes
with horizontal 30cm plank-grain formwork, cool grey concrete (NOT beige/tan), same cantilever
proportions — beside a tall waterfall on a misty alpine cliff. Blue hour, sun below the horizon,
flat diffuse overcast light, no direct sunlight or hard shadows. Same warm window-light color
temperature as the reference. Photoreal, ultra-detailed, 8k, architectural-digest quality. Muted
cool color grade, soft contrast, heavy atmospheric haze and drifting mist, filmic. Wide-angle 24mm.
No people. No text. 16:9.
```
## 🚫 NEGATIVE (igual para todas)
```
people, text, letters, watermark, ui, fisheye, warped lines, tilted horizon, clutter, lowres,
blurry, oversaturated, neon, cartoon, illustration, plastic, different building, inconsistent design,
morphing building, flickering geometry, changing window count, changing concrete color, beige concrete,
harsh sunlight, lens flare, logo
```

---

## EXT-1 · DESDE ABAJO (video loop)
**Imagen** (`STYLE` + usar la Imagen 1 como referencia)
```
Match the reference image exactly: same two-volume board-formed concrete building (horizontal
30cm plank-grain formwork, cool grey concrete, NOT beige/tan), same cantilever proportions, same
central warm-wood entrance, same warm-lit glass offices, same waterfall and reflecting pool. Blue
hour, sun below horizon, flat diffuse overcast light, no direct sunlight or hard shadows. Same
warm window-light color temperature as reference. Re-frame as a LOW-angle shot from near the water
looking UP: building looms overhead, waterfall rising behind, thick mist from the reflecting pool
and weir in the foreground, dramatic upward perspective. Negative space top for labels.
```
**Motion (Kling i2v)**
```
Fixed tripod shot, camera bolted in place, zero movement: no pan, no tilt, no zoom, no dolly, no
truck, no parallax, no handheld shake, no drone drift. Frame composition identical from first to
last frame. Only motion allowed: the waterfall water falling and mist/fog drifting and rising
slowly. Maintain a steady-state loopable motion cycle: water flow rate and mist density stay
visually constant throughout, no net accumulation or depletion of mist by the end. Everything else
perfectly still. Static tripod shot, zero zoom, zero pan, zero dolly — locked frame from start to
finish. 10-11 seconds.
```

## EXT-2 · DE FRENTE (video loop) — *= tu IMAGEN 1 (ya la tienes)*
Solo hay que **animarla** (no regenerarla). Recorta la marca de agua de Kling antes.
**Motion (Kling i2v)** → mismo texto que EXT-1 (tripod fijo, sin parallax/dolly; agua de la
cascada + caída del espejo de agua al frente + neblina + reflejos + brillo cálido en las
ventanas; ciclo de movimiento en estado estable; 10-11s).

## EXT-3 · ACERCÁNDOSE / POR ENTRAR (video loop)
**Imagen** (`STYLE` + usar la Imagen 1 como referencia)
```
Match the reference image exactly: same two-volume board-formed concrete building (horizontal
30cm plank-grain formwork, cool grey concrete, NOT beige/tan), same cantilever proportions. Blue
hour, sun below horizon, flat diffuse overcast light, no direct sunlight or hard shadows. Camera
moved CLOSER toward the central warm-wood entrance, framing the warm-lit lobby through the glass
as if approaching to step inside; the reflecting pool in the foreground, the waterfall and mist
behind, stronger warm glow from inside, same warm window-light color temperature as reference.
Slightly off-center for depth. Negative space on one side for labels.
```
**Motion (Kling i2v)**
```
Fixed tripod shot, camera bolted in place, zero movement: no pan, no tilt, no zoom, no dolly, no
truck, no parallax, no handheld shake, no drone drift. Frame composition identical from first to
last frame. Only motion allowed: the mist swirling and drifting slowly, the waterfall flowing at
the side, and a faint warm light shimmer inside the glass. Maintain a steady-state loopable motion
cycle: mist density and water flow stay visually constant throughout, no net accumulation or
depletion by the end. Everything else perfectly still. Static tripod shot, zero zoom, zero pan,
zero dolly — locked frame from start to finish. 10-11 seconds.
```

---

## INTERIOR (fotos fijas)

## 🎨 STYLE INTERIOR (pégalo en cada uno)
```
Photoreal interior of a modern minimalist office, same building language: board-formed concrete,
warm light-oak panels with a hidden warm linear light strip, polished microcement floor with soft
reflections, floor-to-ceiling glass revealing mist and a waterfall outside. Muted cool grade with a
warm glow, atmospheric haze, calm and premium. Wide-angle 24mm, strong one-point perspective with a
deep vanishing point. No people. No text. 16:9.
```

## INT-1 · RECEPCIÓN / LOBBY
```
STYLE INTERIOR + A serene reception/lobby: a low travertine desk, warm oak feature wall with hidden
light cove, a lounge chair, the glass wall on the right showing mist outside. One-point perspective
toward a corridor that leads deeper. Negative space top-left for labels.
```

## INT-2 · SALA DE REUNIONES
```
STYLE INTERIOR + A glass-walled meeting room: long solid light-oak table centered, elegant leather
chairs, warm light cove above, floor-to-ceiling window with a misty cliff view, subtle reflections
on the glass. Perspective straight down the table toward the window.
```

## INT-3 · CORREDOR / LOUNGE (escalera + muro de agua)
```
STYLE INTERIOR + An interior corridor/lounge with a floating cantilevered staircase deep at the end,
warm linear light strips along the walls, a dark stone water-feature wall on one side with a thin
sheet of water, glass partitions with reflections, mist visible outside. Deep one-point perspective
down the corridor toward the stairs.
```
