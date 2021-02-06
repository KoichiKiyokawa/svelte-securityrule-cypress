#!/bin/sh

yarn build:app
mv dist/__app.html dist/index.html
rm dist/build/bundle.css.map
sed -i '' -e '/sourceMappingURL/d' dist/build/bundle.css