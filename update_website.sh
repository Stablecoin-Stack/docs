cd /home/blackshark/data/development/stablecoin-stack/foundation/stablecoin-stack-spec-website || exit 1
git checkout main
rm -rf docs/*
rm -rf build
cp -r ../stablecoin-stack-spec/ssf-spec-* docs/
#cp -r ../stablecoin-stack-spec/impl docs/
npm run build
echo "specifications.stablecoinstack.org" >> build/CNAME 
rm -rf /tmp/ssf-specs-site-build/*
cp -r build/* /tmp/ssf-specs-site-build/
git add .
git commit -m "--"
#
git checkout gh-pages || exit 1
git rm -rf .
cp -r /tmp/ssf-specs-site-build/* .
git add .
git commit -m "Update site"
git push
git checkout main