#!/bin/bash

COMMIT_DETAILS=`git log -n 1 --pretty=oneline`
ORIGIN_URL=`git remote get-url origin`

git clone -b gh-pages ./ ./gh-pages

rm -rf ./gh-pages/*

npm run build:app
npm run copy-images

cp -a ./public/. ./gh-pages/

cd ./gh-pages/

git remote set-url origin $ORIGIN_URL
git add -A
git commit -m "Automated GitHub pages build ($COMMITDETAILS)"
git push origin gh-pages

cd ../
rm -rf ./gh-pages/
