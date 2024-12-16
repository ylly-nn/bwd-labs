const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Плагин для копирования статичных файлов

module.exports = {
  entry: './src/index.js', // Точка входа для сборки проекта
  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Для обработки изображений
        use: ['file-loader'], // Используем file-loader для обработки изображений
      },
      {
        test: /\.ico$/, // Для обработки иконок
        use: ['file-loader'], // Используем file-loader для обработки иконок
      },
      {
        test: /\.js$/, // Для обработки скриптов
        exclude: /node_modules/, // Исключаем node_modules
        use: {
          loader: 'babel-loader', // Используем babel-loader для транспиляции JavaScript
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html', // Генерируем index.html
    }),
    new HtmlWebpackPlugin({
      template: './src/tasks.html',
      inject: true,
      chunks: ['index'],
      filename: 'tasks.html', // Генерируем tasks.html
    }),
    new HtmlWebpackPlugin({
      template: './src/projects.html',
      inject: true,
      chunks: ['index'],
      filename: 'projects.html', // Генерируем projects.html
    }),
    new HtmlWebpackPlugin({
      template: './src/about_app.html',
      inject: true,
      chunks: ['index'],
      filename: 'about_app.html', // Генерируем about_app.html
    }),
    // Копируем все ресурсы из папки ico в папку dist/ico
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/ico', to: 'ico' }, // Копируем ico из src/ico в dist/ico
        { from: 'src/images', to: 'images' }, // Копируем images из src/images в dist/images
        { from: 'src/scripts', to: 'scripts' }, // Копируем scripts из src/scripts в dist/scripts
        { from: 'src/styles.css', to: 'styles.css' }, // Копируем styles.css из src в dist
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },
  mode: 'development', // Режим сборки
};

