Package.describe({
  name: 'didrip:meteor-accounts-react',
  summary: 'Simple and intuative accounts view layer with react',
  version: '1.2.7',
  documentation: 'README.md',
  git: 'https://github.com/didrip/meteor-accounts-react'
})

Package.onUse(api => {
  api.versionsFrom('1.8.2')

  api.use([
    'ecmascript',
    'accounts-base',
    'accounts-password',
    'mdg:validated-method@1.1.0',
    'check'
  ], ['client', 'server'])

  api.use('react-meteor-data@0.2.16', 'client')

  api.use('service-configuration', { weak: true })
  api.use('http', 'server')

  api.mainModule('index.js', ['client', 'server'])
})

Package.onTest(api => {
  api.use([
    'ecmascript',
    'accounts-base',
    'accounts-password',
    'didrip:meteor-accounts-react',
    'meteoreact:accounts-unstyled',
    'mdg:validated-method@1.1.0',
    'react-meteor-data@0.2.16',
    'cultofcoders:mocha'
  ])

  api.use('http', 'server')

  api.mainModule('__tests__/client.test.js', 'client')
  api.mainModule('__tests__/server.test.js', 'server')
})

Npm.depends({
  'meteor-accounts-t9n': '2.3.1'
});