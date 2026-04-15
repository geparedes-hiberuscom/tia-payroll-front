/**
 * Dominio: Dominios estaticos
 * Replica los catalogos de DominiosDAOImpl para uso transversal.
 */

export interface DominioItem {
  id: number;
  domId: string;
  domText: string;
}

export type DominioCatalogKey =
  | 'GENERO'
  | 'TIPOMARCACION'
  | 'TIPODI'
  | 'ESTADOEMP'
  | 'PARENTESCO'
  | 'ESTADOCIVIL'
  | 'FRECEJECUCIONPROCESOS'
  | 'ESTADOS'
  | 'FRECEJECUCIONRUBRO'
  | 'TIPOEJECUCIONRUBRO'
  | 'TIPOAPLICACIONRUBROIDO'
  | 'ACCIONESPERSONALCON'
  | 'ACCIONESPERSONAL'
  | 'FORMASDEPAGO'
  | 'TIPOSDECUENTA'
  | 'TIPOSDEARCHIVOCON'
  | 'DEFINICIONPL'
  | 'DEFINICIONDBHB'
  | 'ZONASEC'
  | 'ENVIRONMENTS'
  | 'TIEMPOSCA'
  | 'ASIGNARSALIDA';

const d = (id: number, domId: string, domText: string): DominioItem => ({ id, domId, domText });

const freezeCatalog = (items: DominioItem[]): ReadonlyArray<DominioItem> =>
  Object.freeze(items.map((item) => Object.freeze(item)));

export const DOMINIOS: Readonly<Record<DominioCatalogKey, ReadonlyArray<DominioItem>>> = Object.freeze({
  GENERO: freezeCatalog([
    d(-1, ' ', ' '),
    d(1, 'M', 'Masculino'),
    d(0, 'F', 'Femenino'),
    d(0, 'O', 'Otros'),
  ]),
  TIPOMARCACION: freezeCatalog([
    d(-1, ' ', ' '),
    d(1, '1', 'Entrada'),
    d(2, '2', 'Salida'),
  ]),
  TIPODI: freezeCatalog([
    d(1, 'C', 'Cedula'),
    d(2, 'R', 'RUC'),
    d(3, 'P', 'Pasaporte'),
    d(0, 'I', 'Identificador'),
  ]),
  ESTADOEMP: freezeCatalog([
    d(-1, '', ''),
    d(1, 'ACT', 'Activo'),
    d(2, 'EEM', 'Ex-Empleado'),
    d(3, 'SUS', 'Suspenso'),
    d(4, 'APL', 'Aplicante'),
  ]),
  PARENTESCO: freezeCatalog([
    d(-1, '', ''),
    d(1, '1', 'Esposa'),
    d(2, '2', 'Esposo'),
    d(3, '3', 'Madre'),
    d(4, '4', 'Padre'),
    d(5, '5', 'Hija'),
    d(6, '6', 'Hijo'),
    d(7, '7', 'Hermano'),
    d(8, '8', 'Hermana'),
  ]),
  ESTADOCIVIL: freezeCatalog([
    d(1, '1', 'Soltero/a'),
    d(2, '2', 'Casado/a'),
    d(3, '3', 'Divorciado/a'),
    d(4, '4', 'Viudo/a'),
    d(5, '5', 'Union Libre'),
    d(6, '6', 'Union de Hecho'),
    d(0, '0', 'No definido'),
  ]),
  FRECEJECUCIONPROCESOS: freezeCatalog([
    d(-1, '', ''),
    d(1, 'SEMAN', 'Semanal'),
    d(2, 'QUINC', 'Quincenal'),
    d(3, 'MES', 'Mensual'),
    d(4, 'ANUAL', 'Anual'),
    d(5, 'ND', 'No determinado'),
  ]),
  ESTADOS: freezeCatalog([
    d(-1, '', ''),
    d(1, 'A', 'Activo'),
    d(0, 'I', 'Inactivo'),
  ]),
  FRECEJECUCIONRUBRO: freezeCatalog([
    d(-1, '', ''),
    d(0, 'TODAS', 'TODAS'),
    d(1, 'SMN1', 'Semana 1'),
    d(2, 'SMN2', 'Semana 2'),
    d(3, 'SMN3', 'Semana 3'),
    d(4, 'SMN4', 'Semana 4'),
    d(5, 'SMNC', 'Semana Cierre'),
    d(6, '1RAQUI', 'Primera Quincena'),
    d(7, '2DAQUI', 'Segunda Quincena'),
  ]),
  TIPOEJECUCIONRUBRO: freezeCatalog([
    d(-1, 'null', 'No Aplica'),
    d(0, 'SCN', 'Solo Colaboradores Con Nomina Cerrada'),
    d(1, 'SLQ', 'Solo Proceso Liquidacion'),
  ]),
  TIPOAPLICACIONRUBROIDO: freezeCatalog([
    d(-1, '', ''),
    d(0, '0', 'Solo Este Proceso'),
    d(1, '1', 'Mantener Hasta'),
    d(2, '2', 'Permanente'),
  ]),
  ACCIONESPERSONALCON: freezeCatalog([
    d(-1, '', ''),
    d(0, 'CON', 'Contratar'),
  ]),
  ACCIONESPERSONAL: freezeCatalog([
    d(-1, '', ''),
    d(1, 'ISL', 'Incremento Salarial'),
    d(2, 'ACD', 'Actualizacion Datos'),
    d(3, 'CCG', 'Cambio de Cargo'),
    d(4, 'FNQ', 'Finiquito'),
  ]),
  FORMASDEPAGO: freezeCatalog([
    d(1, 'A', 'Acreditacion'),
    d(2, 'C', 'Cheque'),
    d(3, 'E', 'Efectivo'),
  ]),
  TIPOSDECUENTA: freezeCatalog([
    d(1, 'A', 'Ahorros'),
    d(2, 'C', 'Corriente'),
    d(3, 'V', 'Virtual'),
    d(4, 'N', 'Ninguna'),
    d(5, 'E', 'Cuenta Efectiva'),
  ]),
  TIPOSDEARCHIVOCON: freezeCatalog([
    d(1, 'P', 'Proceso'),
    d(2, 'R', 'Provisiones'),
    d(2, 'A', 'Ajuste'),
    d(2, 'E', 'Prestamos/Sobregiros'),
  ]),
  DEFINICIONPL: freezeCatalog([
    d(1, 'D', 'Agrupar'),
    d(2, 'C', 'Consolidar a'),
  ]),
  DEFINICIONDBHB: freezeCatalog([
    d(1, 'D', 'Debe'),
    d(2, 'H', 'Haber'),
  ]),
  ZONASEC: freezeCatalog([
    d(1, '1', 'Costa'),
    d(2, '2', 'Sierra'),
    d(3, '3', 'Oriente'),
    d(4, '4', 'Insular'),
  ]),
  ENVIRONMENTS: freezeCatalog([
    d(0, 'NA', 'No Aplica'),
    d(1, 'WGREPORTES', 'Gestor de Repotes'),
    d(2, 'WCOLABORADOR', 'Colaborador'),
    d(3, 'WEJECPROCESOS', 'Ejecucion Procesos'),
    d(4, 'WCARGARUBROSIDO', 'Rubros I.D.O.'),
    d(5, 'WCARGAIESS', 'Rubros IESS'),
  ]),
  TIEMPOSCA: freezeCatalog([
    d(0, '0', 'No Aplica'),
    d(1, '1', '200%'),
    d(2, '2', '150%'),
    d(3, '3', '125%'),
    d(4, '4', '100%'),
    d(5, '5', 'Tiempo Luch'),
  ]),
  ASIGNARSALIDA: freezeCatalog([
    d(0, '0', 'Marcacion Salida'),
    d(1, '1', 'Salida Turno'),
  ]),
});

const DOMINIO_BY_ID_NUMBER: Readonly<Record<number, DominioCatalogKey>> = Object.freeze({
  1: 'FRECEJECUCIONPROCESOS',
  2: 'FRECEJECUCIONPROCESOS',
  3: 'TIPOAPLICACIONRUBROIDO',
  4: 'ESTADOS',
  5: 'GENERO',
  7: 'PARENTESCO',
  10: 'PARENTESCO',
  13: 'ZONASEC',
  14: 'TIEMPOSCA',
  15: 'ASIGNARSALIDA',
  16: 'TIPOMARCACION',
});

const DOMINIO_BY_ID_STRING: Readonly<Record<number, DominioCatalogKey>> = Object.freeze({
  1: 'FRECEJECUCIONPROCESOS',
  2: 'FRECEJECUCIONRUBRO',
  3: 'TIPOAPLICACIONRUBROIDO',
  4: 'ESTADOS',
  5: 'GENERO',
  6: 'TIPODI',
  8: 'FORMASDEPAGO',
  9: 'TIPOSDECUENTA',
  11: 'DEFINICIONPL',
  12: 'DEFINICIONDBHB',
  14: 'TIPOSDEARCHIVOCON',
  15: 'ENVIRONMENTS',
  16: 'TIPOMARCACION',
  17: 'TIPOEJECUCIONRUBRO',
});

export function getDominioList(key: DominioCatalogKey): ReadonlyArray<DominioItem> {
  return DOMINIOS[key];
}

export function getDominioListByIdForNumber(dominio: number): ReadonlyArray<DominioItem> {
  const key = DOMINIO_BY_ID_NUMBER[dominio];
  return key ? DOMINIOS[key] : [];
}

export function getDominioListByIdForString(dominio: number): ReadonlyArray<DominioItem> {
  const key = DOMINIO_BY_ID_STRING[dominio];
  return key ? DOMINIOS[key] : [];
}

export function getDominioItemById(dominio: number, id: number): DominioItem | undefined {
  return getDominioListByIdForNumber(dominio).find((item) => item.id === id);
}

export function getDominioItemByDomId(dominio: number, domId: string): DominioItem | undefined {
  return getDominioListByIdForString(dominio).find((item) => item.domId === domId);
}
