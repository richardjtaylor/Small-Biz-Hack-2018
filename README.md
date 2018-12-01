 ## Getting Started

Ensure pipenv is installed
```
brew install pipenv
```

Install requirements
```
pipenv install
```

Add Slack Token to Env Vars
```
export SLACK_API_TOKEN=[TOKEN]
```

Init Database
> If you want a postgres other than your default user's e.g. `postgresql://username@localhost`, run `export DATABASE_URL=<URL>` and the app will use that url instead.
```
pipenv run python ./manage.py db init
```

Make the migrations
```
pipenv run python ./manage.py db migrate
```

Run the migrations
```
pipenv run python ./manage.py db upgrade
```

Run the server
```
pipenv run python ./manage.py runserver
```

## Deployment

Ensure Heroku cli
```
brew install heroku/brew/heroku
```

Create Heroku app
```
heroku create
```

Push to deploy
```
git push heroku master
```