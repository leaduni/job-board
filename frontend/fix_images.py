import requests
from duckduckgo_search import DDGS
import os
import time
import mimetypes

# --- CONFIGURACIÓN ---
CMS_URL = "https://leaduni-cms.up.railway.app"
API_URL = f"{CMS_URL}/api"
EMAIL = "diogofabricio17@gmail.com"  
PASSWORD = "123"                     

# Colecciones
COURSE_COLLECTION = "courses"
MEDIA_COLLECTION = "media"

def login():
    """Se autentica y devuelve el token."""
    print(f"🔑 Iniciando sesión como {EMAIL}...")
    try:
        resp = requests.post(f"{API_URL}/users/login", json={"email": EMAIL, "password": PASSWORD})
        
        # Si falla en 'users', intentamos 'admins' por si acaso
        if resp.status_code == 404:
             print("⚠️ No encontrado en 'users', probando 'admins'...")
             resp = requests.post(f"{API_URL}/admins/login", json={"email": EMAIL, "password": PASSWORD})

        resp.raise_for_status()
        token = resp.json().get("token")
        print("✅ Login exitoso.")
        return token
    except Exception as e:
        print(f"❌ Error en login: {e}")
        exit(1)

def search_image_url(query):
    """Busca imagen en DuckDuckGo."""
    try:
        with DDGS() as ddgs:
            search_query = f"{query} curso logo online education"
            results = list(ddgs.images(search_query, max_results=1))
            if results:
                return results[0]['image']
    except Exception as e:
        print(f"⚠️ Error buscando imagen: {e}")
    return None

def download_image(url):
    """Descarga imagen con User-Agent para evitar 403."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        
        content_type = resp.headers.get('content-type')
        ext = mimetypes.guess_extension(content_type) or ".jpg"
        filename = f"temp_image{ext}"
        
        with open(filename, "wb") as f:
            f.write(resp.content)
        return filename, content_type
    except Exception as e:
        print(f"⚠️ Error descargando: {e}")
        return None, None

def upload_or_update_media(filepath, mime_type, token, alt_text, existing_id=None):
    """
    Si existing_id existe -> PATCH (Actualiza el archivo del registro existente)
    Si no -> POST (Crea nuevo registro)
    """
    headers = {"Authorization": f"JWT {token}"}
    
    # Datos adicionales obligatorios (evita error 400)
    data = {"alt": alt_text} 
    
    try:
        with open(filepath, "rb") as f:
            files = {'file': (os.path.basename(filepath), f, mime_type)}
            
            if existing_id:
                # ACTUALIZAR (PATCH)
                print(f"   🔄 Actualizando Media ID {existing_id}...")
                url = f"{API_URL}/{MEDIA_COLLECTION}/{existing_id}"
                resp = requests.patch(url, files=files, data=data, headers=headers)
            else:
                # CREAR (POST)
                print(f"   ➕ Creando nuevo Media...")
                url = f"{API_URL}/{MEDIA_COLLECTION}"
                resp = requests.post(url, files=files, data=data, headers=headers)
            
            if resp.status_code >= 400:
                print(f"   ❌ Error API ({resp.status_code}): {resp.text}")
                return None
                
            resp.raise_for_status()
            doc = resp.json().get('doc', resp.json()) # A veces devuelve doc, a veces directo
            return doc.get('id')
            
    except Exception as e:
        print(f"❌ Error subiendo/actualizando imagen: {e}")
        return None

def update_course_relation(course_id, media_id, token):
    """Vincula el ID de la imagen al curso (si era nuevo)."""
    headers = {"Authorization": f"JWT {token}", "Content-Type": "application/json"}
    try:
        resp = requests.patch(f"{API_URL}/{COURSE_COLLECTION}/{course_id}", json={"imagen": media_id}, headers=headers)
        resp.raise_for_status()
        return True
    except Exception as e:
        print(f"❌ Error vinculando curso: {e}")
        return False

def main():
    token = login()
    
    print("📚 Obteniendo cursos...")
    page = 1
    
    while True:
        try:
            # Traemos profundidad 0 para ver si 'imagen' es un ID o un objeto
            resp = requests.get(f"{API_URL}/{COURSE_COLLECTION}", params={"limit": 50, "page": page, "depth": 0})
            data = resp.json()
            courses = data.get("docs", [])
            
            if not courses: break
            
            print(f"--- Procesando página {page} ---")
            
            for course in courses:
                title = course.get('titulo') or "Curso"
                course_id = course.get('id')
                
                # Detectar ID de imagen existente
                existing_media_id = None
                img_field = course.get('imagen')
                
                if img_field:
                    if isinstance(img_field, dict):
                        existing_media_id = img_field.get('id')
                    else:
                        existing_media_id = img_field # Es el ID directo
                
                print(f"\nCurso: {title} (ID: {course_id})")
                
                # 1. Buscar
                img_url = search_image_url(title)
                if not img_url:
                    print("   ⚠️ No encontrada en web. Saltando.")
                    continue
                
                # 2. Descargar
                temp_file, mime = download_image(img_url)
                if not temp_file: continue
                
                # 3. Subir o Actualizar (Aquí ocurre la magia)
                # Usamos el título del curso como texto ALT
                media_id = upload_or_update_media(temp_file, mime, token, title, existing_media_id)
                
                if media_id:
                    # 4. Si era nuevo (no existía ID previo), vinculamos al curso
                    # Si ya existía, al hacer PATCH al media, el curso ya apunta a él automáticamente
                    if not existing_media_id or existing_media_id != media_id:
                         if update_course_relation(course_id, media_id, token):
                             print("   🔗 Curso vinculado.")
                    else:
                        print("   ✅ Imagen actualizada en su lugar (Hot-swap).")

                # Limpieza
                if os.path.exists(temp_file): os.remove(temp_file)
                # time.sleep(0.5)
            
            if not data.get("hasNextPage"): break
            page += 1
            
        except Exception as e:
            print(f"❌ Error crítico: {e}")
            break

if __name__ == "__main__":
    main()
