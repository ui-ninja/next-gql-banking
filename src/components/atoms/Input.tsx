import { forwardRef } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

type InputProps = {
  ref?: React.LegacyRef<HTMLInputElement>;
} & ChakraInputProps;

const Input = forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <ChakraInput
        ref={ref}
        variant="outline"
        borderColor="brand.900"
        borderRadius="12"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
