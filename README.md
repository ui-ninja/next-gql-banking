# 🏦 NextGen banking - [click to visit](https://next-gql-banking.vercel.app/)

## Salient Technical features for client app

1. Typed using `Typescript`.
2. Saving user enrollments, account's creation and credit cards in `mongoDB` database hosted via mongoDB atlas.
3. Using `@apollo/server` and `type-graphql` to create graphql APIs. `graphql-codegen` to generate SDK functions and typings.
4. `nextAuth` for session management within app.
5. `react-hook-form` for managing forms in application. Custom validations rules applied in login, register and open new account form.
6. `ChakraUI` used as component library. Custom theme created for buttons, links etc. For ex. for button created custom variants `primary` and `secondary`. Used `@chakra-ui/cli` to generate typings for custom theme.
7. `react-query` for server-side state management, fetching, and caching of data, and error handling.
8. Test cases using `React testing library` and `Jest`.
9. Code splitting using `next/dynamic`.
