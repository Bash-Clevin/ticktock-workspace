import type { CodegenConfig } from '@graphql-codegen/cli';

const documentsPattern = '**/*.graphql';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  generates: {
    './src/gql/generated.tsx': {
      documents: `./src/${documentsPattern}`,
      plugins: [
        'typescript',
        'typescript-operations',
        'named-operations-object',
        // 'typescript-react-apollo',
        'typed-document-node',
      ],
    },
  },
};

export default config;
