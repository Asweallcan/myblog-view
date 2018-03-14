const bodyParser = require("body-parser");
const session = require("express-session");
module.exports = {
  head: {
    title: 'myblog-view',
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      }, {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/avatar.jpg'
      }
    ]
  },
  loading: {
    color: '#409EFF',
    failedColor: "#f00"
  },
  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: "lvshihao",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 18000000
      }
    }),
    "~/api"
  ],
  build: {
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config
          .module
          .rules
          .push({enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/})
      }
    },
    vendor: [
      "axios",
      "element-ui",
      "crypto",
      "jquery"
    ]
  },
  css: [
    "element-ui/lib/theme-chalk/index.css", "~assets/common.css", "~assets/transition.css"
  ],
  plugins: [
    "~plugins/element-ui.js", "~plugins/parseTime.js","~plugins/md5.js","~plugins/apiRoot.js"
  ],
  router: {
    middleware: "apiRoot"
  }
}
