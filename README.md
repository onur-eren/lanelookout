# Lane Lookout

![](https://i.imgur.com/y2yWHPb.png)

Lane Lookout ([https://www.lanelookout.org](https://www.lanelookout.org])) is a web app to help cyclists report lane obstructions and violations. We take this data, aggregrate it, and send it to the relevant parking enforcement authorities so that cyclists can ride safe.

We're part of the [Oakland chapter](www.openoakland.org) of Code For America. We meet every Tuesday in City Hall. Come [say hello](https://www.meetup.com/OpenOakland) or join #oak-dot-bikes in the OpenOakland Slack group.

## How to contribute

If you're a developer, check our issues section and scan for the "good first issue" label.

If you're a marketer, check our issues section and scan for the "marketing" label.

If you're a data scientist, reach out to us.

## Development

### Backend

```
./d build
./d start
```

Peek inside `./d` for more.

### Frontend
```
cd client
yarn
yarn run start
```

## Deployment

Assuming you've created a Heroku app and have your git configuration done.

```
heroku addons:create heroku-postgresql:hobby-dev
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python
heroku config:set SECRET_KEY='123'
git push heroku master
```

## Authors
* Manish Sinha (arithmetic@gmail.com)
* Nikul Shah (nikulshah2@gmail.com)
* Baker Renneckar (bakerrenneckar@gmail.com)

## Alumni
* Travis Eden (i@traviseden.com)
