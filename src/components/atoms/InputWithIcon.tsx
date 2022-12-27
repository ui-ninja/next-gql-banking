/* eslint-disable react/no-children-prop */
import {
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import Input from './Input';

type Props = InputProps & {
  variant?: 'primary' | 'rounded';
  type?: React.HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
};

const InputWithIcon = forwardRef(
  (
    {
      variant,
      type = 'text',
      leftIcon,
      rightIcon,
      placeholder,
      ...rest
    }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <InputGroup>
      {leftIcon && (
        <InputLeftElement pointerEvents="none" children={leftIcon} />
      )}
      <Input
        variant={variant}
        ref={ref}
        type={type}
        placeholder={placeholder}
        pl="10"
        {...rest}
      />
      {rightIcon && (
        <InputRightElement pointerEvents="none" children={rightIcon} />
      )}
    </InputGroup>
  )
);

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;
