// 会与公共部分进行合并
module.exports = {
    configureWebpack: {
      resolve: {
        extensions:[],//用于配置后缀名。如.vue .js等等。但是默认是配置过，所以不用写
        alias: {   //配置别名，@是默认配置别名，为src。cli2是不能够用@
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/components',
          'network': '@/network',
          'views': '@/views',
        }
      }
    }
  }
  
  