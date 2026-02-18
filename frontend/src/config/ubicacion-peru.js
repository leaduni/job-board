// Datos de departamentos y distritos del Perú
// Fuente: https://github.com/josezm/peru-departamentos-ciudades-distritos
import data from './ubicacion-peru.json';

export const DEPARTAMENTOS_DISTRITOS = data;
export const DEPARTAMENTOS = Object.keys(data).sort();
