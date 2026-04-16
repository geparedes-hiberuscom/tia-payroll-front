import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SetupIndexPage } from './SetupIndexPage';
import { ParametrosParametrosdialogPage } from './parametros/ParametrosParametrosdialogPage';
import { GestiontablairGestiontablairdialogPage } from './gestion-tabla-ir/GestiontablairGestiontablairdialogPage';
import { GastospersonalesdialogPage } from './gastos-personales/GastospersonalesdialogPage';
import { GeningproyectadosPage } from './gening-proyectados/GeningproyectadosPage';
import { ReporteirinecdialogPage } from './reportes-irinec/ReporteirinecdialogPage';
import { PlantillacontablePlantillacontabledialogPage } from './plantilla-contable/PlantillacontablePlantillacontabledialogPage';
import { RubroplantillacontabledialogPage } from './rubro-plantilla-contable/RubroplantillacontabledialogPage';
import { ContratoplantillaContratoplantilladialogPage } from './contrato-plantilla/ContratoplantillaContratoplantilladialogPage';

export const SetupRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<SetupIndexPage />} />
      <Route path="parametros-parametrosdialog" element={<ParametrosParametrosdialogPage />} />
      <Route path="gestiontablair-gestiontablairdialog" element={<GestiontablairGestiontablairdialogPage />} />
      <Route path="gastospersonalesdialog" element={<GastospersonalesdialogPage />} />
      <Route path="geningproyectados" element={<GeningproyectadosPage />} />
      <Route path="reporteirinecdialog" element={<ReporteirinecdialogPage />} />
      <Route path="plantillacontable-plantillacontabledialog" element={<PlantillacontablePlantillacontabledialogPage />} />
      <Route path="rubroplantillacontabledialog" element={<RubroplantillacontabledialogPage />} />
      <Route path="contratoplantilla-contratoplantilladialog" element={<ContratoplantillaContratoplantilladialogPage />} />
    </Routes>
  );
};
