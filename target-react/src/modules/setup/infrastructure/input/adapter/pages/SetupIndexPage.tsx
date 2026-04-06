import React from 'react';
import { ParametrosParametrosdialogPage } from './ParametrosParametrosdialogPage';
import { GestiontablairGestiontablairdialogPage } from './GestiontablairGestiontablairdialogPage';
import { GastospersonalesdialogPage } from './GastospersonalesdialogPage';
import { GeningproyectadosPage } from './GeningproyectadosPage';
import { ReporteirinecdialogPage } from './ReporteirinecdialogPage';
import { PlantillacontablePlantillacontabledialogPage } from './PlantillacontablePlantillacontabledialogPage';
import { RubroplantillacontabledialogPage } from './RubroplantillacontabledialogPage';
import { ContratoplantillaContratoplantilladialogPage } from './ContratoplantillaContratoplantilladialogPage';

/**
 * Página índice del módulo: 🔧 Setup y Configuración
 * Agrupa las funcionalidades del vertical slice.
 *
 * Pantallas ZUL originales: parametros.zul - Listado de parámetros, parametrosDialog.zul - Formulario de parámetros, gestionTablaIR.zul - Listado de tablas IR, gestionTablaIRDialog.zul - Formulario tabla IR, GastosPersonalesDialog.zul - Gastos personales, genIngProyectados.zul - Ingresos proyectados, ReporteIRINECDialog.zul - Reporte INEC, plantillaContable.zul - Listado de plantillas, plantillaContableDialog.zul - Diálogo de plantilla, rubroplantillaContableDialog.zul - Rubro a plantilla, contratoPlantilla.zul - Plantillas por contrato, contratoPlantillaDialog.zul - Diálogo contrato-plantilla
 * Funcionalidades: 12_parametros_nomina, 13_tabla_impuesto_renta, 11_plantilla_contable
 */
export const SetupIndexPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>🔧 Setup y Configuración</h1>
      <p>Parámetros, tabla IR, plantillas contables</p>

      <nav>
        <h2>Funcionalidades</h2>
        <ul>
        <li><a href="/setup/parametros-parametrosdialog">parametros.zul / parametrosDialog.zul</a></li>
        <li><a href="/setup/gestiontablair-gestiontablairdialog">gestionTablaIR.zul / gestionTablaIRDialog.zul</a></li>
        <li><a href="/setup/gastospersonalesdialog">GastosPersonalesDialog.zul</a></li>
        <li><a href="/setup/geningproyectados">genIngProyectados.zul</a></li>
        <li><a href="/setup/reporteirinecdialog">ReporteIRINECDialog.zul</a></li>
        <li><a href="/setup/plantillacontable-plantillacontabledialog">plantillaContable.zul / plantillaContableDialog.zul</a></li>
        <li><a href="/setup/rubroplantillacontabledialog">rubroplantillaContableDialog.zul</a></li>
        <li><a href="/setup/contratoplantilla-contratoplantilladialog">contratoPlantilla.zul / contratoPlantillaDialog.zul</a></li>
        </ul>
      </nav>
    </div>
  );
};
