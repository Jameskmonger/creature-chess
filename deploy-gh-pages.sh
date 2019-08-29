#!/bin/bash

echo
echo "Have you copied the Google Analytics code into src/app/index.html, if required? [Y/N]"
read yn
echo

if [ $yn != 'Y' ] && [ $yn != 'y' ]; then
    echo "Copy the code!"
    exit
fi

COMMIT_DETAILS=`git log -n 1 --pretty=oneline`
ORIGIN_URL=`git remote get-url origin`

git clone -b gh-pages $ORIGIN_URL ./gh-pages

npm run build:app

cp -a ./public/. ./gh-pages/

cd ./gh-pages/

git remote set-url origin $ORIGIN_URL
git add -A
git commit -m "Automated GitHub pages build (${COMMIT_DETAILS})"
git push origin gh-pages

cd ../
rm -rf ./gh-pages/
