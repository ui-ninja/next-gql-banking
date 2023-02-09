const TransactionConstants = {
  PAGE_HEADING: 'List of transactions',
  LOADING_RESULTS: 'Loading results...',
  ERROR_WHILE_FETCHING: 'Error while fetching transactions, please try again.',
  DUMMY_DATA_ALERT_TITLE: 'This page uses dummy data!',
  DUMMY_DATA_ALERT_DESCRIPTION:
    'Even though this page accepts accountId, it does not filter based on accountId due to lack of data points. But, this page follow cursor based pagination as per Relay specifications.',
  TRANSACTIONS_TABLE_CAPTION: 'Transaction data (10 per page)',
  TRANSACTIONS_TABLE_COLUMNS: [
    'S.no.',
    'ID',
    'Transaction done on',
    'Type',
    'Amount',
  ],
};

export default TransactionConstants;
