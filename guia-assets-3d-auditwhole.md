# Guia de assets 3D e imagenes para Audit Whole

Objetivo visual: web premium de auditoria y tributacion con estetica fintech/compliance: azul oscuro, cian, vidrio, dashboards, documentos, datos, movimiento suave y sensacion ejecutiva.

## 1. Mejores sitios para crear 3D interactivo

- Spline: https://spline.design/
  - Ideal para crear escenas 3D interactivas sin saber modelar desde cero.
  - Sirve para hero premium con dashboard financiero, documentos flotantes, graficos, sellos de cumplimiento.
  - Se puede integrar en HTML, React, Webflow, Framer o Next.js con spline-viewer.

- Tripo 3D: https://www.tripo3d.ai/
  - Genera modelos 3D desde texto, imagen o boceto.
  - Util para objetos: documento auditado, carpeta financiera, sello, grafico, calculadora premium, cubos de datos.

- Meshy: https://www.meshy.ai/
  - Genera modelos 3D desde texto o imagen y exporta en formatos utiles para web como GLB, FBX y OBJ.
  - Buena opcion si se necesita un objeto 3D real para Three.js o React Three Fiber.

- Krea: https://www.krea.ai/
  - Suite para imagen, video y 3D.
  - Util para crear renders premium, fondos, imagenes hero, upscaling y variaciones de estilo.

## 2. Mejores sitios para comprar o descargar assets 3D

- Sketchfab: https://sketchfab.com/3d-models
  - Biblioteca enorme de modelos 3D. Revisar siempre la licencia antes de usar comercialmente.

- LS Graphics: https://www.ls.graphics/
  - Mockups, abstracciones, iconos 3D y recursos premium muy pulidos.

- Craftwork: https://craftwork.design/
  - Packs de 3D, mockups, UI kits, ilustraciones y plantillas modernas.

- Magnific / Freepik: https://www.magnific.com
  - Stock, IA, imagenes, 3D, iconos, mockups y herramientas creativas.

- LottieFiles: https://lottiefiles.com/
  - Animaciones ligeras para web. Perfecto para pequenos iconos animados o detalles.

## 3. Herramientas para generar imagenes premium

- Krea: renders e imagenes premium, con upscale y control de estilo.
- Recraft: https://www.recraft.ai/
  - Muy bueno para graficos, iconos, vectores, mockups y consistencia visual.
- Magnific: imagenes, video, stock, 3D y workflows de marca.
- Adobe Firefly: imagenes comerciales, edicion y recursos generativos.
- Midjourney: muy bueno para imagenes conceptuales premium y moodboards.
- Luma: https://lumalabs.ai/
  - Mas orientado a video/imagen/movimiento cinematografico.

## 4. Tipos de assets que convienen para Audit Whole

- Hero 3D principal:
  - Dashboard financiero flotante.
  - Documentos tributarios en vidrio.
  - Grafico de riesgo fiscal.
  - Sello de cumplimiento.
  - Lineas de datos suaves.

- Iconos 3D para servicios:
  - Auditoria externa.
  - Auditoria tributaria.
  - Cumplimiento fiscal.
  - Control interno.
  - NIIF / estados financieros.
  - Consultoria contable.

- Fondos:
  - Azul noche con grid sutil.
  - Luz cian muy suave.
  - Patrones de datos, no decoracion infantil.

- Animaciones:
  - Flotacion lenta.
  - Rotacion muy sutil.
  - Cards que entran al hacer scroll.
  - Numeros que cuentan.
  - Lineas de conexion entre datos.

## 5. Formatos recomendados para darle a Claude

- 3D real: .glb o .gltf
- Imagenes hero: .webp o .avif
- Transparencias: .png o .webp con alpha
- Animaciones ligeras: .json de Lottie
- Videos cortos de fondo: .mp4 y .webm
- Iconos vectoriales: .svg

Regla practica:
- Si el 3D debe ser interactivo: usar Spline, GLB, Three.js o React Three Fiber.
- Si solo se vera como decoracion premium: renderizarlo como WebP/PNG y animarlo con CSS.

## 6. Prompts para generar imagenes o 3D

Hero premium:

```text
Premium 3D hero visual for a tax and audit consulting firm, dark navy background, floating glass financial dashboard, transparent tax documents, compliance seal, subtle cyan glow, elegant fintech style, realistic 3D render, clean corporate premium, no text, no people, no cartoon, isometric 3/4 view, high detail, soft reflections, depth of field
```

Iconos 3D:

```text
Set of premium 3D glass icons for an audit and tax consulting website: audit report, tax document, compliance shield, financial chart, calculator, document folder, dark navy and cyan palette, transparent background, consistent style, elegant fintech look, no text
```

Fondo abstracto:

```text
Abstract premium fintech background, deep navy blue, subtle data grid, floating glass panels, cyan highlights, soft light beams, professional corporate, elegant, minimal, no text, no people, web hero background
```

Escena Spline:

```text
Interactive 3D scene for a premium audit and tax consulting website. Create a dark navy scene with a floating glass dashboard, financial charts, tax documents, compliance badge, subtle cyan lights, slow rotation, mouse parallax, smooth floating motion. Keep it optimized for web and professional.
```

## 7. Brief listo para Claude

```text
Necesito una landing page premium para una firma de auditoria y tributacion llamada Audit Whole.

Estilo visual:
- Premium fintech/compliance.
- Azul noche, azul profundo, cian y blanco.
- 3D sutil, profesional, no caricaturesco.
- Movimiento suave al hacer scroll.

Assets:
- Hero 3D: dashboard financiero flotante con documentos y sello de cumplimiento.
- Iconos 3D para servicios.
- Fondo azul oscuro con grid de datos sutil.

Implementacion:
- Usar React + Tailwind.
- Usar Spline embed o Three.js si se entrega un archivo GLB.
- Lazy-load del 3D.
- En mobile usar imagen WebP fallback.
- Respetar prefers-reduced-motion.
- Mantener buen performance: modelos comprimidos, imagenes WebP/AVIF.

Secciones:
1. Hero con 3D premium.
2. Servicios principales.
3. Beneficios: claridad, cumplimiento, control, confianza.
4. Proceso de trabajo.
5. Industrias.
6. Testimonios o metricas.
7. CTA final.
```

## 8. Recomendacion final

Para Audit Whole conviene combinar:

- Spline para el hero 3D interactivo.
- Krea o Recraft para imagenes e iconos premium.
- LS Graphics o Craftwork para mockups/recursos ya pulidos.
- LottieFiles para pequenos movimientos.
- WebP/AVIF como fallback para que la pagina cargue rapido.

No usar demasiados 3D. Un hero fuerte, 6 iconos de servicios y algunos detalles animados son suficientes para que se vea premium.

## 9. Ruta premium, rapida y funcional

La pagina no debe depender de 3D en todas partes. Para que se vea linda y corra bien:

- Hero:
  - 1 escena 3D o video/render premium.
  - Fallback WebP para mobile.
  - Cargar el 3D despues del contenido principal.

- Servicios:
  - Iconos 3D estaticos en WebP/PNG transparente.
  - Hover suave con CSS, no 3D real en cada card.

- Animaciones:
  - Rive para microinteracciones premium.
  - Lottie para iconos simples y livianos.
  - CSS/Framer Motion para entradas al hacer scroll.

- 3D real:
  - Solo si aporta valor visual.
  - Archivo GLB comprimido.
  - No usar modelos enormes.
  - Optimizar con glTF Transform antes de pasarlo a Claude.

## 10. Herramientas recomendadas por tipo de necesidad

Si quieres algo tipo SleepyMotion / motion premium:

- Rive: animaciones interactivas, botones, iconos, estados, microinteracciones.
- LottieFiles: animaciones listas para usar, mas simples.
- Spline: escenas 3D interactivas para hero.
- LS Graphics: mockups e iconos 3D premium.
- Craftwork: kits visuales, 3D assets, mockups, templates.
- Recraft: iconos, vectores e imagenes consistentes con marca.
- Krea: imagenes premium, renders, upscale, video y 3D.

## 11. Reglas de performance para Claude

Pedirle a Claude lo siguiente:

```text
Reglas de performance:
- Mantener LCP por debajo de 2.5s.
- No bloquear el hero con una escena 3D pesada.
- Cargar primero texto, CTA e imagen fallback.
- Lazy-load de Spline/Three.js/Rive cuando sea posible.
- Usar prefers-reduced-motion.
- Usar WebP/AVIF para imagenes.
- Usar GLB comprimido para modelos 3D.
- Optimizar GLB con gltf-transform optimize input.glb output.glb --compress draco --texture-compress webp
- En mobile, reemplazar 3D interactivo por imagen estatica o animacion liviana.
- Probar Lighthouse y PageSpeed antes de terminar.
```

## 12. Arquitectura visual recomendada

- Home profesional e intuitiva:
  1. Hero claro: que hace la empresa y para quien.
  2. Visual premium 3D: dashboard/documentos/cumplimiento.
  3. Servicios en cards faciles de leer.
  4. Beneficios: menos riesgo, mas claridad, cumplimiento, control.
  5. Proceso en 4 pasos.
  6. Industrias.
  7. Prueba de confianza.
  8. CTA final.

La prioridad es que el visitante entienda rapido, confie rapido y pueda contactar facil. El movimiento debe acompanar, no distraer.
