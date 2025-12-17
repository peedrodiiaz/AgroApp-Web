export interface Maquina {
  id: number;
  nombre: string;
  imagen?: string;
  numSerie: string;
  modelo: string;
  tipo: 'Tractor' | 'Cosechadora' | 'Empacadora';
  fechaCompra: string;
  estado: 'activa' | 'inactiva' | 'mantenimiento';
  ubicacion: string;
  descripcion?: string;
  // Campos específicos para Tractor
  potenciaCv?: number;
  tipoCombustible?: string;
  capacidadRemolque?: number;
  // Campos específicos para Cosechadora
  tipoCultivo?: string;
  anchoCorte?: string;
  capacidadTolva?: number;
  // Campos específicos para Empacadora
  tipoBala?: string;
  capacidadEmpaque?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MaquinaCrear {
  nombre: string;
  imagen?: string;
  numSerie: string;
  modelo: string;
  tipo: 'Tractor' | 'Cosechadora' | 'Empacadora';
  fechaCompra: string;
  estado?: 'activa' | 'inactiva' | 'mantenimiento';
  ubicacion: string;
  descripcion?: string;
  // Campos específicos opcionales
  potenciaCv?: number;
  tipoCombustible?: string;
  capacidadRemolque?: number;
  tipoCultivo?: string;
  anchoCorte?: string;
  capacidadTolva?: number;
  tipoBala?: string;
  capacidadEmpaque?: number;
}
