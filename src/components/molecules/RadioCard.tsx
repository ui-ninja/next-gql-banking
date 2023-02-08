import { forwardRef } from 'react';
import { Box, RadioProps as ChakraRadioProps } from '@chakra-ui/react';
import Radio from '../atoms/Radio';

type RadioProps = {
  ref?: React.LegacyRef<HTMLInputElement>;
  description?: string;
} & ChakraRadioProps;

const RadioCard = forwardRef((props: RadioProps, ref) => {
  return (
    <Box
      borderWidth="1px"
      padding={3}
      borderRadius="12px"
      borderColor="brand.900"
    >
      <Radio ref={ref} {...props} />
      {props.description && (
        <Box paddingLeft={6} fontSize="sm" color="gray.600">
          {props.description}
        </Box>
      )}
    </Box>
  );
});

RadioCard.displayName = 'RadioCard';

export default RadioCard;
