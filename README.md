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
docker run --rm -it -w /app -v `pwd`:/app:ro node:alpine yarn start
```
