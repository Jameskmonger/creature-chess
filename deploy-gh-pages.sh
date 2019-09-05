#!/bin/bash

echo
echo "Have you copied the Google Analytics code into src/app/index.html, if required? [Y/N]"
read ynGA
echo

if [ $ynGA != 'Y' ] && [ $ynGA != 'y' ]; then
    echo "Copy the code!"
    exit
fi

COMMIT_DETAILS=`git log -n 1 --pretty=oneline`
ORIGIN_URL=`git remote get-url origin`

rm -rf ./gh-pages/
git clone -b gh-pages $ORIGIN_URL ./gh-pages

rm -rf ./gh-pages/*.js

npm run build:client

cp -a ./public/. ./gh-pages/

cd ./gh-pages/

git remote set-url origin $ORIGIN_URL
git add -A
git commit -m "Automated GitHub pages build (${COMMIT_DETAILS})"

echo
echo "Do you want to push the gh-pages branch now? [Y/N]"
read ynPush
echo

if [ $ynPush != 'Y' ] && [ $ynPush != 'y' ]; then
    echo "Finishing"
    exit
fi

git push origin gh-pages

cd ../
rm -rf ./gh-pages/
