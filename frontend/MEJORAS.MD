1. Agregar el Logo en la pagina de Ofertas Laborales (/ofertas), tal que:

```{
    "docs": [
        {
            ....
            "company": {
                "logo": {
                    ...,
                    "url": AQUí
                }
            }
        }
    ]
}
```

TAL QUE "CMS_URL + url". 2. Mejorar el Analisis de Compatibilidad, usando TAGS, fijate, en cada oferta te debe cargar algo como "skills_requeridas" -> "python, power bi, google workspace, etc" en la petición a projects/:id del CMS, eso lo debemos conectar con nuestra tabla de Skills, tengo las siguientes capacidades (en SKILLS_API) con el url de Backend + el endpoint propuesto. Al final con todo eso haz bien el analisis de datos por usuario, y si no tiene alguna skill mencionale en la pantalla "ofertas/:id" (esta vez del frontend) que agregue algunas en su perfil (/perfil)

3. Cuando se vaya a clickear alguna oferta en (/ofertas), verificar que este logueado, sino no lo abras y muestrale una modal que diga encesitas estar verificado
