import {
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
} from '@chakra-ui/react';

const Radio = (props: ChakraRadioProps) => {
  return <ChakraRadio borderColor="brand.900" colorScheme="brand" {...props} />;
};

Radio.displayName = 'Radio';

export default Radio;