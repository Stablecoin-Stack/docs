# inside website repo
rm -rf docs
git clone ../stablecoin-stack-spec docs

npm run build   # or docusaurus build
echo "docs.stablecoinstack.org" >> build/CNAME 

rm -rf docs     # remove sources again
git add .
git commit -m "Update site from specs"
git push
