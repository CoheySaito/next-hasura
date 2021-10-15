module.exports = {
  schema: [
    {
      'https://next-hasura-now.hasura.app/v1/graphql': {
        headers: { 'x-hasura-admin-secret': '' },
      },
    },
  ],
  documents: ['./src/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        preResolveTypes: false,
        scalars: {
          uuid: 'string',
          timestamptz: 'string',
          bigint: 'number',
          _text: 'string[]',
        },
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          enumValues: 'upper-case#upperCase',
        },
        apolloReactCommonImportFrom: '@apollo/client',
        apolloReactHooksImportFrom: '@apollo/client',
      },
    },
  },
};
