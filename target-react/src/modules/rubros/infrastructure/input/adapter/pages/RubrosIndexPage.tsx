import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Página índice del módulo: 📋 Gestión de Rubros
 * Agrupa las funcionalidades del vertical slice.
 *
 * Pantallas ZUL originales: rubros.zul - Listado principal de rubros, rubrosDialog.zul - Formulario de rubro, rubrosxprocesoDialog.zul - Asignación de rubros por proceso, rubrosIDOMain.zul - Pantalla principal, rubrosIDOList.zul - Listado, rubrosIDODetail.zul - Detalle, rubrosIDOcargaxProceso.zul - Carga por proceso, cargaRubrosIDO.zul - Carga masiva, consultaRubrosIdoList.zul - Consulta
 * Funcionalidades: 1_rubros_nomina, 8_rubros_ido
 */
export const RubrosIndexPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>📋 Gestión de Rubros</h1>
      <p>Rubros, conceptos e IDO</p>

      <nav>
        <h2>Funcionalidades</h2>
        <ul style={{ display: 'grid', gap: '0.5rem' }}>
          <li><Link to="/rubros-rubrosdialog">rubros.zul / rubrosDialog.zul</Link></li>
          <li><Link to="/rubrosxprocesodialog">rubrosxprocesoDialog.zul</Link></li>
          <li><Link to="/rubrosidomain-rubrosidolist-rubrosidodetail">rubrosIDOMain.zul / rubrosIDOList.zul / rubrosIDODetail.zul</Link></li>
          <li><Link to="/rubrosidocargaxproceso">rubrosIDOcargaxProceso.zul</Link></li>
          <li><Link to="/cargarubrosido">cargaRubrosIDO.zul</Link></li>
          <li><Link to="/consultarubrosidolist">consultaRubrosIdoList.zul</Link></li>
        </ul>
      </nav>
    </div>
  );
};
