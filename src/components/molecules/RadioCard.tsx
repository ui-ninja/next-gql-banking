import { forwardRef } from 'react';
import { Box, RadioProps as ChakraRadioProps } from '@chakra-ui/react';
import Radio from '../atoms/Radio';

type RadioProps = {
  ref?: React.LegacyRef<HTMLInputElement>;
  helpText?: string;
} & ChakraRadioProps;

const RadioCard = forwardRef(
  (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <Box
        borderWidth="1px"
        padding={3}
        borderRadius="12px"
        borderColor="brand.900"
      >
        <Radio ref={ref} {...props} />
        {props.helpText && (
          <Box paddingLeft={6} fontSize="sm" color="gray.600">
            {props.helpText}
          </Box>
        )}
      </Box>
    );
  }
);

RadioCard.displayName = 'RadioCard';

export default RadioCard;
