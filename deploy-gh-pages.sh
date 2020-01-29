#!/bin/bash

if [[ -z "${GA_ID}" ]]; then
    echo "No Google Analytics tag was set - run with environment variable 'GA_ID' if required"
    echo
    echo "Press Y to continue or N to cancel the deployment"
    read ynGA
    echo

    if [ $ynGA != 'Y' ] && [ $ynGA != 'y' ]; then
        echo "Cancelling"
        exit
    else
        echo "Continuing"
        echo
    fi
else
    echo "Using Google Analytics ID ${GA_ID}"
    echo
fi

COMMIT_DETAILS=`git log -n 1 --pretty=oneline`
ORIGIN_URL=`git remote get-url origin`

rm -rf ./gh-pages/
git clone -b gh-pages $ORIGIN_URL ./gh-pages

rm -rf ./public/
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
