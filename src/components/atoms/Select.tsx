import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type SelectProps = {
  ref?: React.LegacyRef<HTMLSelectElement>;
} & ChakraSelectProps;

const Select = forwardRef(
  (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    return (
      <ChakraSelect
        ref={ref}
        borderColor="gray.400"
        borderRadius="12"
        {...props}
      >
        {props.children}
      </ChakraSelect>
    );
  }
);

Select.displayName = 'Select';

export default Select;
