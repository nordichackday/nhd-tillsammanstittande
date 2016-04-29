# Till sammans tittande

cozy campfire smoothness

## Node and NPM

We use Node v5.11.0 to run and build this application please make sure you have it installed eventually use [nvm](https://github.com/creationix/nvm) to install e.g.:

```
> nvm install 5.11.0
> nvm use
```

Install all the modules:

```
> npm install
```

Run the app

```
> npm run start
```

## PM2

We use pm2 to startup our app locally.
A handy alias to use list, restart, stop and/or restart the app is the following:

```
> alias pm2="PM2_HOME=.pm2 ./node_modules/.bin/pm2"
```

Then we can use the pm2 shortcut e.g.:

```
> pm2 list | start | restart | stop | kill | help
```

For more information on pm2 see [here](http://pm2.keymetrics.io/).

## Heroku settings

We have two apps on Heroku one is the *server* and the other is the *socket server*.

### The server

The server serves the client app to the users.
To the deploy the app individually we have an own heroku-server git branch which we deploy to https://git.heroku.com/nhd-tillsammanstittnade.git.

1. Add the endpoint if you have not done it already
2. Login into heroku
3. Checkout the heroku-server branch
4. Merge any changes from the master branch and fix git conflicts
5. Deploy the heroku-server app via git

```
> git remote add heroku-server https://git.heroku.com/nhd-tillsammanstittnade.git
> heroku login
> git checkout heroku-server
> git merge origin master
> git push heroku-server heroku-server:master
```


### The socket server

The socket serves the socket client to use to talk between the different users (aka client).
To the deploy the app individually we have an own heroku-socket git branch which we deploy to https://git.heroku.com/nhd-tillsammanstittnade-socket.git.

1. Add the endpoint if you have not done it already
2. Login into heroku
3. Checkout the heroku-server branch
4. Merge any changes from the master branch and fix git conflicts
5. Deploy the heroku-server app via git

```
> git remote add heroku-socket https://git.heroku.com/nhd-tillsammanstittnade-socket.git
> heroku login
> git checkout heroku-socket
> git merge origin master
> git push heroku-socket heroku-socket:master
```
