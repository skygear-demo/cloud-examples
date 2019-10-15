Skygear MongoDB Blog
--------------------

This is a template for a blog website hosted on Skygear, using MongoDB as storage.

Fill in your app's API endpoint and API key in `frontend/static/main.js`.

Setup MongoDB connection information by running:

`skycli secret create MONGO_DB_URL 'mongodb+srv://<USER>:<PASSWORD>@<HOST>/<COL>?retryWrites=true'`

To deploy, run `skycli app deploy`.
