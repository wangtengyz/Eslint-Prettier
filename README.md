# Eslint+Prettier 团队代码规范配置

## Eslint 配置

Eslint 是一个可以检验代码，并给出报告的工具。它的目标是保证代码的一致性，避免错误。本项目采用`eslint-config-airbnb`社区方案来配置。

项目安装插件说明：

-   eslint-plugin-import：此插件主要为了校验 import/export 语法，防止错误拼写文件路径以及导出名称的问题;

-   eslint-plugin-jsx-a11y：提供 jsx 元素可访问性校验;

-   eslint-plugin-react：校验 React;

-   eslint-plugin-react-hooks：根据 Hooks API 校验 Hooks 的使用;

执行如下命令安装依赖：

```
yarn add eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks -D
```

## 生成 Eslint 配置文件

在控制台运行下面命令：

```
./node_modules/.bin/eslint --init
```

```
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser                                                    ✔ What format do you want your
```

基本配置介绍如下：

```
module.exports = {
    // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
    "env": {
        "browser": true,
        "es6": true
    },
    // 一个配置文件可以被基础配置中的已启用的规则继承。
    "extends": [
        "airbnb"
    ],
    // 自定义全局变量
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "_": true,
        "$": true,
    },
    // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
    // "parser": "@typescript-eslint/parser",
    // 配置解析器支持的语法
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
    // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
    "plugins": [
        "react",
        // "@typescript-eslint"
    ],
    // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    "rules": {
        semi: 0,
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
            }
        ],
        'no-useless-escape': 2,
        indent: [2, 4],
        'react/jsx-indent': [2, 4],
    }
};

```

# Prettier

我们可以借助 Eslint 来提高我们编码的质量，但是却无法保证统一代码风格。一个统一的代码风格对于团队来说是很有价值的，所以为了达到目的，我们可以选择使用 Prettier 在保存和提交代码的时候，将代码修改成统一的风格

## 配置应用

1. 安装依赖

```
yarn add  prettier eslint-config-prettier eslint-plugin-prettier -D
```

2. 修改 Exlint 配置，打开 .eslintrc.js 文件，在扩展中增加 "plugin:prettier/recommended" ：

```
 "extends": [
        "airbnb",
        "plugin:prettier/recommended"
    ]
```

3. 增加 prettier 配置文件，在根目录创建 .prettierrc.js ：

```
module.exports = {
  "printWidth": 120, //一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 4, //一个tab代表几个空格数，默认为2
}
```

# 配置 VS Code 编辑器

1. 在 VS Code 商店中寻找并安装插件 ESlint，Prettier

2. 编辑 settings.json,然后增加如下参数：

```
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "eslint.autoFixOnSave": true,
  "eslint.enable": true,

```

这样当我们在保存文件的时候，就会自动优化文件格式了。

3. 项目创建.editorconfig 文件【主要是为了统一 vscode 默认的 tab 为 4，eslint 默认为 2】

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

# 提交校验

如果，我们想要使用 git 提交代码时，通过 prettier 来优化代码，还需要借助一些工具来完成。

-   husky：一个方便用来处理 pre-commit 、 pre-push 等 githooks 的工具
-   lint-staged：对 git 暂存区的代码，运行 linters 的工具

1. 安装依赖

```
yarn add lint-staged husky -D
```

2. 增加配置

```
// package.json
{
  ...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/*.{js,jsx,mjs,ts,tsx}": [
      "node_modules/.bin/prettier --write",
      "node_modules/.bin/eslint --fix",
      "git add"
    ],
    "src/*.{css,scss,less,json,html,md,markdown}": [
      "node_modules/.bin/prettier --write",
      "git add"
    ]
  }
  ...
}
```

# 最终配置

```
module.exports = {
    // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
    env: {
        browser: true,
        es6: true
    },
    // 一个配置文件可以被基础配置中的已启用的规则继承。
    extends: ['airbnb', 'prettier', 'prettier/react'],
    // 自定义全局变量
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        _: true,
        $: true
    },
    // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
    // "parser": "@typescript-eslint/parser",
    // 配置解析器支持的语法
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
    // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
    plugins: ['prettier'],
    // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    rules: {
        'no-debugger': 0,
        'no-unused-vars': [
            1,
            {
                argsIgnorePattern: 'res|next|^err'
            }
        ],
        'arrow-body-style': [2, 'as-needed'],
        'no-param-reassign': [
            2,
            {
                props: false
            }
        ],
        'no-console': 0,
        'import/prefer-default-export': 0,
        import: 0,
        'func-names': 0,
        'space-before-function-paren': 0,
        'comma-dangle': 0,
        'max-len': 0,
        'import/extensions': 0,
        'no-underscore-dangle': 0,
        'consistent-return': 0,
        'react/display-name': 1,
        'react/react-in-jsx-scope': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/no-unescaped-entities': 0,
        'jsx-a11y/accessible-emoji': 0,
        'jsx-a11y/label-has-for': 0,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx']
            }
        ],
        radix: 0,
        semi: [2, 'always'],
        'no-shadow': [
            2,
            {
                hoist: 'all',
                allow: ['resolve', 'reject', 'done', 'next', 'err', 'error']
            }
        ],
        'prettier/prettier': [
            'error',
            {
                printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80
                tabWidth: 2, //一个tab代表几个空格数，默认为2
                semi: true
            }
        ],
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/anchor-is-valid': [
            'warn',
            {
                aspects: ['invalidHref']
            }
        ]
    }
};
```
