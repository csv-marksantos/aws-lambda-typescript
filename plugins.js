// eslint-disable-next-line strict, @typescript-eslint/no-var-requires
const { readFileSync } = require('fs');

const envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /@app\/env$/ }, (args) => {
      return {
        path: args.path,
        namespace: 'env-ns',
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => {
      const envFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV}`.trim() : '';
      const content = readFileSync(`./src/environments/environment${envFile}.ts`, 'utf8');

      return {
        contents: content,
        resolveDir: './src/environments',
        loader: 'ts',
      };
    });
  },
};

module.exports = [envPlugin];
