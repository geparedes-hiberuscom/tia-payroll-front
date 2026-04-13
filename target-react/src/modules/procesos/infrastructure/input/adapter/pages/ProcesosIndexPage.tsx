import React from 'react';
import { ROUTES } from '../../../../../../routes';

export const ProcesosIndexPage: React.FC = () => {
  return (
    <main className="container" data-testid="procesos-index-page">
      <h1>Procesos de nomina</h1>
      <p className="text-muted">Accesos directos a funcionalidades del modulo.</p>
      <ul>
        <li><a href={ROUTES.PATHS['ejecucionbot']}>Ejecucionbot</a></li>
        <li><a href={ROUTES.PATHS['ejecucionproccierre']}>Ejecucionproccierre</a></li>
        <li><a href={ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog']}>Instancias de procesos</a></li>
        <li><a href={ROUTES.PATHS['logderegistrosdeprocesosubrecurso']}>Log de registros</a></li>
        <li><a href={ROUTES.PATHS['procesos-procesosdialog']}>Procesos dialog</a></li>
        <li><a href={ROUTES.PATHS['procesosejecabrirlq']}>Procesos ejec abrir LQ</a></li>
        <li><a href={ROUTES.PATHS['procesosejecaprobarlq']}>Procesos ejec aprobar LQ</a></li>
        <li><a href={ROUTES.PATHS['procesosejeccolaboradores']}>Procesos ejec colaboradores</a></li>
        <li><a href={ROUTES.PATHS['procesosejecucion-procesosejecdialog']}>Procesos ejecucion dialog</a></li>
        <li><a href={ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog']}>Procesos reversion dialog</a></li>
        <li><a href={ROUTES.PATHS['rubrospreliquidadossubrecurso']}>Rubros preliquidados</a></li>
        <li><a href={ROUTES.PATHS['sobregiroshistricossubrecurso']}>Sobregiros historicos</a></li>
      </ul>
    </main>
  );
};
