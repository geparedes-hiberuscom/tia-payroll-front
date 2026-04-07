import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormValidation } from '@shared/infrastructure/input/adapter/hooks/useFormValidation';
import { maxLength, minLength, pattern, required } from '@shared/infrastructure/input/adapter/validation/formValidation';
import { Logderegistrosdeprocesosubrecurso, CreateLogderegistrosdeprocesosubrecurso, UpdateLogderegistrosdeprocesosubrecurso } from '../../../../domain/model/Logderegistrosdeprocesosubrecurso';

import { Form } from '../../../../../../shared';

interface LogderegistrosdeprocesosubrecursoFormProps {
  initialData?: Logderegistrosdeprocesosubrecurso;
  onSubmit: (data: CreateLogderegistrosdeprocesosubrecurso | UpdateLogderegistrosdeprocesosubrecurso) => Promise<void> | void;
  onCancel?: () => void;
  loading?: boolean;
}

function toFormState(model?: Logderegistrosdeprocesosubrecurso): Record<string, string> {
  if (!model) {
    return {};
  }

  return Object.entries(model)
    .filter(([key]) => key !== 'id')
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value == null ? '' : String(value);
      return acc;
    }, {});
}

export const LogderegistrosdeprocesosubrecursoForm: React.FC<LogderegistrosdeprocesosubrecursoFormProps> = ({ initialData, onSubmit, onCancel, loading = false }) => {
  const methods = useForm<Record<string, string>>({
    defaultValues: toFormState(initialData),
  });
  const [jsonPayload, setJsonPayload] = useState<string>('{}');
  const [error, setError] = useState<string>('');
  const isEditMode = Boolean(initialData);
  const fields = methods.watch();

  const keys = useMemo(() => Object.keys(fields), [fields]);
  const { validate, clearErrors } = useFormValidation();
  const validationRules = useMemo(() => Object.fromEntries(
    keys.map((key) => [key, [required(), minLength(1), maxLength(255), pattern(/.*\S.*/)]])
  ), [keys]);

  useEffect(() => {
    methods.reset(toFormState(initialData));
    clearErrors();
  }, [initialData, clearErrors]);

  const handleSubmit = async (formValues: Record<string, string>) => {
    setError('');

    if (keys.length === 0) {
      try {
        const parsed: unknown = JSON.parse(jsonPayload);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          setError('El JSON debe ser un objeto valido.');
          return;
        }
        await onSubmit(parsed as CreateLogderegistrosdeprocesosubrecurso | UpdateLogderegistrosdeprocesosubrecurso);
      } catch (_error) {
        setError('El JSON no tiene formato valido.');
      }
      return;
    }

    const validationResult = validate(formValues, validationRules);
    if (!validationResult.isValid) {
      setError('Revisa los campos obligatorios y su formato.');
      return;
    }

    await onSubmit(formValues as unknown as CreateLogderegistrosdeprocesosubrecurso | UpdateLogderegistrosdeprocesosubrecurso);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="card" data-testid="logderegistrosdeprocesosubrecurso-form">
      <h3 style={{ marginTop: 0 }}>{isEditMode ? 'Editar' : 'Crear'} Logderegistrosdeprocesosubrecurso</h3>
      {keys.length > 0 ? (
        keys.map((key) => (
          <label key={key} className="form-field">
            <span>{key}</span>
            <input
              value={fields[key]}
              onChange={(e) => methods.setValue(key, e.target.value)}
              minLength={1}
              maxLength={255}
              pattern=".*\S.*"
              required
              disabled={loading}
              data-testid={key + '-input'}
            />
          </label>
        ))
      ) : (
        <label className="form-field">
          <span>Payload JSON</span>
          <textarea
            rows={8}
            value={jsonPayload}
            onChange={(e) => setJsonPayload(e.target.value)}
            required
            disabled={loading}
            data-testid="logderegistrosdeprocesosubrecurso-json"
          />
        </label>
      )}
      {error && <p className="field-error">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading} data-testid="logderegistrosdeprocesosubrecurso-submit">{loading ? 'Guardando...' : 'Guardar'}</button>
        {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading} data-testid="logderegistrosdeprocesosubrecurso-cancel">Cancelar</button>}
      </div>
    </Form>
  );
};
