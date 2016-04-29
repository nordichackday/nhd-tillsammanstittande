# Till sammans tittande

cozy campfire smoothness

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
