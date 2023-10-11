import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

export const TextInput = <TValues extends FieldValues>(
  props: TextFieldProps & UseControllerProps<TValues>,
) => {
  const { field, fieldState } = useController(props);

  return (
    <TextField
      {...props}
      inputRef={field.ref}
      variant="outlined"
      fullWidth
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      error={!!fieldState.error}
      helperText={fieldState?.error?.message ?? props.helperText}
    />
  );
};
