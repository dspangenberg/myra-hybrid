/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP Routes. A single file is enough
| for majority of projects, however you can define Routes in different
| files and just make sure to import them inside this file. For example
|
| Define Routes in following two files
| ├── start/Routes/cart.ts
| ├── start/Routes/customer.ts
|
| and then import them inside `start/Routes.ts` as follows
|
| import './Routes/cart'
| import './Routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.createRedirect')

Route
  .group(() => {
    Route.get('/logout', 'AuthController.logout')
    Route.get('/login', 'AuthController.create').as('login')
    Route.post('/login', 'AuthController.login')
  })
  .prefix('auth')
  .namespace('App/Controllers/Http')

Route
  .group(() => {
    Route.get('/', 'DashboardController.index').as('dashboard')

    Route.get('/contacts', 'ContactsController.index').as('contacts')
    Route.get('/contacts/:id', 'ContactsController.show').as('contacts.show')
    Route.get('/contacts/:id/edit', 'ContactsController.edit').as('contacts.edit')
    Route.post('/contacts/:id', 'ContactsController.save')

    Route.get('/projects', 'ProjectsController.index').as('projects')
    Route.get('/projects/:id', 'ProjectsController.show').as('projects.show')
    Route.get('/projects/:id/edit', 'ProjectsController.edit').as('projects.edit')
    Route.post('/projects', 'ProjectsController.create').as('projects.create')
    Route.post('/projects/:id', 'ProjectsController.save')

    Route.get('/times', 'TimesController.index').as('times')
    Route.post('/times', 'TimesController.index')
    Route.get('/times/print', 'TimesController.printWeek').as('times.print')
    Route.get('/times/add', 'TimesController.edit').as('times.add')
    Route.get('/times/duplicate/:id', 'TimesController.duplicate').as('times.duplicate')
    Route.get('/times/:id', 'TimesController.edit').as('times.edit')

    Route.post('/times/save/:id?', 'TimesController.save').as('times.save')
    Route.delete('/times/:id', 'TimesController.destroy').as('times.delete')
  })
  .namespace('App/Controllers/Http')
  .middleware('auth')
