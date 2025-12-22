<script setup>
import { ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close', 'success'])

const { loginSimulado } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

// limpiar estado cuando se abre
watch(
  () => props.open,
  (value) => {
    if (value) {
      email.value = ''
      password.value = ''
      error.value = null
    }
  }
)

async function handleLogin() {
  error.value = null
  loading.value = true

  try {
    await loginSimulado(email.value)
    emit('success')
    emit('close')
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="modal-overlay">
      <div class="modal-container">
        <h2 class="modal-title">Iniciar sesión</h2>
        <p class="modal-subtitle">
            Accede para postular y formar parte de la bolsa laboral
        </p>

        <div v-if="error" class="modal-error">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="text-muted">Correo institucional</label>
            <input
              v-model="email"
              type="email"
              required
              class="search-input"
              placeholder="juan.perez@uni.edu.pe"
            />
          </div>

          <div class="form-group">
            <label class="text-muted">Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="search-input"
              placeholder="********"
            />
            <small class="text-muted">(Simulada, no se valida)</small>
          </div>

          <div class="modal-actions">
            <button
              type="button"
              class="btn-secondary"
              @click="$emit('close')"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="btn-primary"
              :disabled="loading"
            >
              {{ loading ? 'Ingresando…' : 'Ingresar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

