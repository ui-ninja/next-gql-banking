import { ForwardedRef, forwardRef, LegacyRef } from "react";
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";

type SelectProps = {
  ref?: LegacyRef<HTMLSelectElement>;
} & ChakraSelectProps;

const Select = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    return (
      <ChakraSelect
        ref={ref}
        borderColor="brand.900"
        borderRadius="12"
        {...props}
      >
        {props.children}
      </ChakraSelect>
    );
  }
);

Select.displayName = "Select";

export default Select;
