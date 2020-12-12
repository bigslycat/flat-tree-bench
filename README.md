# flat-tree-bench

Tree procession benchmark

## Usage

You don't need to execute `yarn install` because this repository follows the
[Zero-installs](https://yarnpkg.com/features/zero-installs) paradigm.

### In Node.js environment

```sh
git clone git@github.com:bigslycat/flat-tree-bench.git
cd flat-tree-bench
yarn start
```

### In Docker Compose

```sh
git clone git@github.com:bigslycat/flat-tree-bench.git
cd flat-tree-bench
docker-compose up bench
# or:
docker-compose up pre-build-bench # Pre-builds docker image with *.js artifacts
```

### In Docker

```sh
git clone git@github.com:bigslycat/flat-tree-bench.git
cd flat-tree-bench
docker run --rm -it -w /app \
  -v `pwd`/src:/app/src:ro \
  -v `pwd`/tsconfig.json:/app/tsconfig.json:ro \
  -v `pwd`/package.json:/app/package.json:ro \
  -v `pwd`/yarn.lock:/app/yarn.lock:ro \
  -v `pwd`/.yarnrc.yml:/app/.yarnrc.yml:ro \
  -v `pwd`/.pnp.js:/app/.pnp.js:ro \
  -v `pwd`/.yarn/cache:/app/.yarn/cache:ro \
  -v `pwd`/.yarn/releases:/app/.yarn/releases:ro \
  -v `pwd`/.yarn/plugins:/app/.yarn/plugins:ro \
  node:alpine yarn start
```
