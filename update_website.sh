git checkout main
rm -rf docs/*
rm -rf build
cp -r ../stablecoin-stack-spec/ssf-spec-* docs/
#cp -r ../stablecoin-stack-spec/impl docs/
npm run build
echo "specifications.stablecoinstack.org" >> build/CNAME 
cp -r build /tmp/ssf-specs-site-build
git add .
git commit -m "--"
#
git checkout gh-pages || exit 1
git rm -rf .
cp -r /tmp/ssf-specs-site-build/* .
git add .
git commit -m "Site update"
git push
git checkout main