# work-in-france-extractor [![deprecated](http://badges.github.io/stability-badges/dist/deprecated.svg)](http://github.com/badges/stability-badges)

Extract public data from [ds-collector](https://github.com/SocialGouv/ds-collector)

## Usage

```sh
# build docker image
docker-build . -t work-in-france-extractor

# extract stats data
docker run -e API_URL=http://ds-collector-url -e TOKEN=xxxxx --entrypoint node work-in-france-extractor extract-stats.js

# extract validity-check data
docker run -e API_URL=http://ds-collector-url -e TOKEN=xxxxx --entrypoint node work-in-france-extractor extract-validity.js
```
