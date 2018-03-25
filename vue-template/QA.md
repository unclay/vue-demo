## webpack懒加载的import异常

```shell
ERROR in ./src/router/index.js
Module build failed: SyntaxError: Unexpected token (5:23)

> 5 | const error404 = () => import('../page/error/404.vue');
    |                        ^
```

A: 安装babel插件，babel-plugin-syntax-dynamic-import