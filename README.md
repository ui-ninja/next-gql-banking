# 🏦 NextGen banking - [click to visit](https://next-gql-banking.vercel.app/)

A simple banking application for users. User can signup/register with few details like email, password, income etc. Upon successful registration, they may open a "Savings" or "Credit card" account with bank. All accounts are listed on dashboard page and upon clicking of each account, user may view all transaction done.

Deployed using vercel - [app link](https://next-gql-banking.vercel.app/)

---

## Salient Technical features for app

1. Static code check via `Eslint` and code formatting using `prettier`. `pre-commit` and `pre-push` git hooks using `husky`.
2. Typed using `Typescript`.
3. Saving user enrollments, account's creation and credit cards in `mongoDB` database hosted via mongoDB atlas. Sensitive info encrypted using `bcrypt`.
4. Using `@apollo/server` and `type-graphql` to create graphql APIs. `graphql-codegen` to generate SDK functions and typings.
5. `nextAuth` for session management within app.
6. `react-hook-form` for managing forms in application. Custom validations rules applied in login, register and open new account form.
7. `ChakraUI` used as component library. Custom theme created for buttons, links etc. Used `@chakra-ui/cli` to generate typings for custom theme.
8. `react-query` for server-side state management, fetching, and caching of data, and error handling.
9. Test cases using `React testing library` and `Jest`.
10. Code splitting using `next/dynamic`.
11. `Transactions` page follow cursor based pagination as per `Relay` specifications.

---
