# MAPEO EXACTO DE FILTROS PARA CONSULTAS

## 🔴 PROBLEMA IDENTIFICADO
La entidad `AvColaboradoresEntity` (tabla: `av_colaboradores`) **NO está creada** en el target. Solo existe `AvColaboradoreseEntity` que referencia a ella.

**Campos faltantes en AvColaboradoresEntity:**
- `cedula` → necesario para buscar por documento
- `aperl` o similar → apellido(s) del colaborador  
- `anomb` o similar → nombre(s) del colaborador
- `iidcolaborador` → ID del colaborador (PK)

---

## MAPEO ACTUAL (basado en entidades existentes)

### ✅ FILTRO "cedula"
```
TABLA: av_colaboradores (NO EXISTE - CREAR)
CAMPO: [cedula] (nombre exacto TBD)
TIPO: VARCHAR
BUSCAR EN: AvColaboradoresEntity.cedula (por crear)

QUERY JPA RECOMENDADA:
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "JOIN c.avColaboradores co WHERE co.cedula = :cedula")
List<AvColaboradoreseEntity> findByCedula(@Param("cedula") String cedula);
```

### ✅ FILTRO "apellidos"
```
TABLA: av_colaboradores (NO EXISTE - CREAR)
CAMPO: [aperl] o [apellidos] (nombre exacto TBD)
TIPO: VARCHAR
BUSCAR EN: AvColaboradoresEntity.apellidos (por crear)

QUERY JPA RECOMENDADA:
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "JOIN c.avColaboradores co WHERE LOWER(co.apellidos) LIKE LOWER(CONCAT('%', :apellidos, '%'))")
List<AvColaboradoreseEntity> findByApellidos(@Param("apellidos") String apellidos);
```

### ✅ FILTRO "rol"
```
TABLA: av_dimensionesl (EXISTE)
RELACIÓN: AvColaboradoreseEntity.iiddmrol → AvDimensioneslEntity.iiddimensionesl
DESCRIPCIÓN ESTANDARIZADA: iiddmrol identifica el rol del colaborador

QUERY JPA RECOMENDADA:
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "WHERE c.avDimensioneslro.iiddimensionesl = :rolId")
List<AvColaboradoreseEntity> findByRol(@Param("rolId") Integer rolId);

FILTRO AVANZADO (por nombre de rol - requiere más campos):
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "WHERE c.avDimensioneslro.iiddimensionesl = :rolId AND c.id.iidempresa = :empresa")
List<AvColaboradoreseEntity> findByRolAndEmpresa(
    @Param("rolId") Integer rolId, 
    @Param("empresa") Integer empresa);
```

### ✅ FILTRO "localidad"
```
TABLA: av_dimensionesl (EXISTE)
RELACIÓN: AvColaboradoreseEntity.iiddmlocalidad → AvDimensioneslEntity.iiddimensionesl
DESCRIPCIÓN ESTANDARIZADA: iiddmlocalidad identifica la localidad del colaborador

QUERY JPA RECOMENDADA:
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "WHERE c.avDimensionesllo.iiddimensionesl = :localidadId")
List<AvColaboradoreseEntity> findByLocalidad(@Param("localidadId") Integer localidadId);

FILTRO AVANZADO (por localidad + empresa):
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "WHERE c.avDimensionesllo.iiddimensionesl = :localidadId AND c.id.iidempresa = :empresa")
List<AvColaboradoreseEntity> findByLocalidadAndEmpresa(
    @Param("localidadId") Integer localidadId, 
    @Param("empresa") Integer empresa);
```

### ✅ FILTRO "empresa"
```
TABLA: av_empresa (EXISTE)
RELACIÓN: AvColaboradoreseEntity.id.iidempresa → AvEmpresaEntity.iidempresa
DESCRICIÓN ESTÁNDA: iidempresa identifica la empresa asignada al colaborador

QUERY JPA RECOMENDADA:
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "WHERE c.id.iidempresa = :empresa")
List<AvColaboradoreseEntity> findByEmpresa(@Param("empresa") Integer empresa);

BÚSQUEDA POR NOMBRE DE EMPRESA:
@Query("SELECT c FROM AvColaboradoreseEntity c " +
       "JOIN c.avColaboradoreseempresa e " +
       "WHERE LOWER(e.vempresanl) LIKE LOWER(CONCAT('%', :nombreEmpresa, '%'))")
List<AvColaboradoreseEntity> findByNombreEmpresa(@Param("nombreEmpresa") String nombreEmpresa);
```

---

## RESUMEN RÁPIDO (COPIA/PEGA)

```
FILTRO "cedula" → buscar en av_colaboradores.cedula
                   (requiere crear AvColaboradoresEntity)

FILTRO "apellidos" → buscar en av_colaboradores.aperl|apellidos  
                      (requiere crear AvColaboradoresEntity)

FILTRO "rol" → join AvDimensioneslEntity 
               where iiddmrol = ? 
               (a través de AvColaboradoreseEntity.iiddmrol)

FILTRO "localidad" → join AvDimensioneslEntity 
                     where iiddmlocalidad = ? 
                     (a través de AvColaboradoreseEntity.iiddmlocalidad)

FILTRO "empresa" → filtrar por AvColaboradoreseEntity.iidempresa = ?
                   o join AvEmpresaEntity para búsqueda por nombre
```

---

## 📋 PRÓXIMAS ACCIONES RECOMENDADAS

1. **CREAR AvColaboradoresEntity** (tabla: `av_colaboradores`)
   - Analizar tabla original en BD para obtener campos exactos
   - Campos mínimos: `iidcolaborador` (PK), `cedula`, `aperl`, `anomb`
   - Crear repositorio: `AvColaboradoresRepository`

2. **COMPLETAR AvDimensioneslEntity**
   - Añadir campos descriptivos (nombre, descripción)
   - Permitir identificar qué tipo de dimensión es (rol/localidad/cargo/costo)
   - Sugerir agregar: `vdescripcion`, `vtipo` o `idtipo`

3. **CREAR MÉTODOS EN AvColaboradoreseRepository**
   - Agregar queries complejas con múltiples filtros
   - Ejemplo: `findByRolAndLocalidadAndEmpresa(...)`
   - Ejemplo: `findByApellidosAndCedulaAndEmpresa(...)`

4. **CREAR MÉTODOS EN AvPyRubroslhisRepository**
   - Filtrar rubros por colaborador + empresa + rol
   - `findByColaboradorAndEmpresaAndRol(...)`

---

## 📚 REFERENCIAS DE ENTIDADES ACTUALES

### AvColaboradoreseEntity (EXISTE)
- Tabla: `av_colaboradorese`
- PK: `(iidempresa, iidcolaborador)`
- Relación a: `AvColaboradoresEntity` (NO existe)
- Relación a: `AvEmpresaEntity` ✓
- Dimensiones: rol, localidad, cargo, costo, eo, etc.

### AvDimensioneslEntity (EXISTE pero incompleta)
- Tabla: `av_dimensionesl`
- PK: `iiddimensionesl`
- Campos actuales: básicos (sin descriptivos)
- **Necesita:** campos para identificar tipo y descripción

### AvEmpresaEntity (EXISTE) ✓
- Tabla: `av_empresa`
- PK: `iidempresa`
- Campos: `vempresanc`, `vempresanl` (nombres), `vruc`

### AvPyRubroslhisEntity (EXISTE)
- Tabla: `av_py_rubroslhis`
- PK: `(iidejecproceso, iidcolaborador, vidrubro)`
- Relaciones existentes para filtrado cruzado

---

**Generado: 2026-03-25**
**Análisis basado en:** target-springboot/consultas/entities
