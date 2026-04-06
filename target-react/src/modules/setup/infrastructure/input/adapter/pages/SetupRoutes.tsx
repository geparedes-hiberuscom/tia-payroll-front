import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SetupIndexPage } from './SetupIndexPage';
import { ParametrosParametrosdialogPage } from './ParametrosParametrosdialogPage';
import { GestiontablairGestiontablairdialogPage } from './GestiontablairGestiontablairdialogPage';
import { GastospersonalesdialogPage } from './GastospersonalesdialogPage';
import { GeningproyectadosPage } from './GeningproyectadosPage';
import { ReporteirinecdialogPage } from './ReporteirinecdialogPage';
import { PlantillacontablePlantillacontabledialogPage } from './PlantillacontablePlantillacontabledialogPage';
import { RubroplantillacontabledialogPage } from './RubroplantillacontabledialogPage';
import { ContratoplantillaContratoplantilladialogPage } from './ContratoplantillaContratoplantilladialogPage';

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
