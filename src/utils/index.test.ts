import { formatCardNumber, isExistingEmailUsed } from '.';

describe('utils test suite', () => {
  it('should format card number', () => {
    const output = formatCardNumber(1234567890001111);
    expect(output).toEqual('1234 5678 9000 1111');
  });

  it('should return true if existing email in graphql error object', () => {
    expect(
      isExistingEmailUsed({
        response: {
          errors: [
            {
              extensions: {
                exception: {
                  code: 11000,
                },
              },
            },
          ],
        },
      })
    ).toEqual(true);
  });
});
