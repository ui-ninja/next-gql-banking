import {
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
} from "@chakra-ui/react";

function Radio(props: ChakraRadioProps) {
  return <ChakraRadio borderColor="brand.900" colorScheme="brand" {...props} />;
}

export default Radio;
