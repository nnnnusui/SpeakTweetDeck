import { Configuration } from 'webpack'
import path from 'path'

const config: Configuration = {
  entry: {
    main: path.join(__dirname, 'src', 'main.ts')
  },
  output: {
    path: path.join(__dirname, 'out'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
}

export default config