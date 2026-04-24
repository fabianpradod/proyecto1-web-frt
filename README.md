## LINKS
- **Backend:** https://github.com/fabianpradod/proyecto1-web-bck
- **Backend API:** https://proyecto1-web-bck.onrender.com
- **Swagger UI:** https://proyecto1-web-bck.onrender.com/docs
- **Frontend link:** https://fabianpradod.github.io/proyecto1-web-frt/


## Correr localmente

El frontend es estático, no necesita servidor ni instalación. Dos opciones:

### Opción 1 — Abrir directo
Simplemente abrir `index.html` en tu navegador.

### Opción 2 — Servidor local
```bash
npx serve .
```
Luego abrir `http://localhost:3000`.

> **Nota:** Por defecto apunta a la API en producción (`https://proyecto1-web-bck.onrender.com`).
> ```javascript
> const BASE_URL = "http://localhost:8080";
> ```

## Funcionalidades

- Ver lista de series con imagen, género, estado, episodios y rating
- Crear, editar y eliminar series
- Buscar series por nombre
- Ordenar por ID, nombre, género o episodios
- Paginación
- Agregar y ver ratings (1-10) por serie
- Exportar lista a CSV

## Challenges implementados

- Calidad visual del cliente
- Calidad del historial de Git
- Organización del código (archivos separados por responsabilidad)
- Exportar lista de series a CSV generado manualmente desde JavaScript, sin librerías
- Sistema de rating visible en el cliente

## Reflexión

Trabajar con JavaScript vanilla y fetch() fue interesante para mi ya que realmente hasta ahora no entendia como realizar un proyecto de frontend de manera correcta, entendiendo lo que los frameworks. Manejar el estado de la UI manualmente (cuándo re-renderizar, cómo evitar llamadas duplicadas, cómo sincronizar formularios con datos del servidor) es algo que React o Vue resuelven automáticamente.

Lo que más me gustó: no tener que configurar nada, el navegador simplemente corre el código. Lo que menos: el DOM es DETALLADO y propenso a errores si no se estructura bien desde el inicio.

Lo usaría de nuevo para proyectos pequeños o prototipos rápidos donde no vale la pena el overhead de un framework. Para algo más grande, prefiero React.