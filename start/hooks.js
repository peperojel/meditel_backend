'use strict'
const { hooks } = use('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
    const View = use('Adonis/Src/View');
    const Env = use('Env');
    
    View.global('host', function () {
      const address = Env.get('APP_URL', '127.0.0.1:3333')
      return this.safe( address )
    });
    
    View.global('appName', function () {
      const address = Env.get('APP_NAME', 'Adonis API Starter')
      return this.safe( address );
    })
    
  })