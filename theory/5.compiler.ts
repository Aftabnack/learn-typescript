/**
 * Watch mode
 * - one file: tsc app.ts --watch
 * - Multiple files: tsc *.ts -w
 */
/**
 * Initialize tsc: Creats tsconfig.json for the entire project
 * `tsc --init`
 *
 * After init is done. `tsc` is going to compile entire project
 * `tsc -w` is going to start watch mode on entire project
 */

/**
 * Other compiler options
 * https://www.typescriptlang.org/docs/handbook/compiler-options.html
 */
const Opts = {
  compilerOptions: {
    lib: [], //List of default TS type defs
    declaration: true, //Output .d.ts file, for library,
    sourceMap: true, //Output sourcemaps
    rootDir: "", //Input folder
    outDir: "", //Output folder
    removeComments: true, //Strip out all comments
    noEmitOnError: true, //Don't output any file, if error
  },
  exclude: [], //Array of files to exclude (even globs to exclude)
  include: [], //Array of files to include (even globs to exclude)
};
