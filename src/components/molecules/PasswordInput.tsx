import { ForwardedRef, forwardRef, useState } from "react";
import {
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Button from "../atoms/Button";
import Input from "../atoms/Input";

type InputProps = {
  variant?: "primary" | "rounded";
} & ChakraInputProps;

const PasswordInput = forwardRef(
  ({ ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <InputGroup size="md">
        <Input
          ref={ref}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          {...props}
        />
        <InputRightElement width="4.5rem">
          <Button
            aria-label={`${show ? "show" : "hide"} password`}
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
