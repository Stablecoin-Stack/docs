git checkout main
rm -rf docs/*
cp -r ../stablecoin-stack-spec/ssf-spec-* docs/
npm run build
cp -r build /tmp/site-build
#
git checkout gh-pages || exit 1
git rm -rf .
cp -r /tmp/site-build/* .
echo "docs.stablecoinstack.org" >> CNAME 
git add build
git commit -m "Update site"
git push
git checkout main