import { forwardRef, useState } from 'react';
import {
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from '@chakra-ui/react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type InputProps = {
  variant?: 'primary' | 'rounded';
  ref?: React.LegacyRef<HTMLInputElement>;
} & ChakraInputProps;

const PasswordInput = forwardRef(
  (
    { variant = 'primary', ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <InputGroup size="md">
        <Input
          ref={ref}
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
          {...props}
        />
        <InputRightElement width="4.5rem">
          <Button
            aria-label={`${show ? 'show' : 'hide'} password`}
            variant="outline"
            h="1.75rem"
            size="sm"
            border="0"
            right="-15px"
            onClick={handleClick}
          >
            {show ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
