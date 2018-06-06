# TodoApp
跟着慕课网 jokcy 老师课程《Vue+Webpack打造todo应用》写的小项目——TodoApp

### 依赖版本问题

&emsp;&emsp;因为webpack和某些包的版本的问题，所以和老师的有点出入。

#### 1. vue-loader/lib/plugin

&emsp;&emsp;在 jokcy 老师的视频中是不需要在 webpack.config.js 文件中添加 `const VueLoaderPlugin = require('vue-loader/lib/plugin');` 这一句的，但在我的版本（webpack 4.10.2，vue 2.5.16，vue-loader 15.2.4）中是需要的。

#### 2. webpack.optimize.CommonChunkPlugin

&emsp;&emsp;webpack4 已经弃用 webpack.optimize.CommonChunkPlugin API，需要改为 webpack.optimize.SplitChunksPlugin 。

#### 3. contentHash

&emsp;&emsp;因为 contentHash 和 webpack4 有冲突，所以需要将 `new ExtractPlugin('styles.[contentHash:8].css'),` 改为 `new ExtractPlugin('styles.[hash:8].css'),` 。当然，这不是最好的方法，最好的解决方案是使用 mini-css-extract-plugin 插件，而不是 extract-text-webpack-plugin 插件。

### Vue 无法解析 stylus

&emsp;&emsp;在单文件组件中使用 stylus 无法解析。尚未知道如何解决，所以 TodoApp 中的单文件组件里的样式都是用原生 CSS 写的。

### 按照指定目录打包

&emsp;&emsp;教程中打包后的文件都集中在 dist 目录下，看起来很凌乱。可以在输出文件名中加入路径，让各种资源打包到指定的目录下面。比如，下面的代码将图片资源打包到 images 目录下：

```
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'images/[name]-aaa.[ext]'
          }
        }
      }
```

&emsp;&emsp;链接：[http://www.xn--jfs.top/apps/TodoApp/](http://www.xn--jfs.top/apps/TodoApp/ "TodoApp")

