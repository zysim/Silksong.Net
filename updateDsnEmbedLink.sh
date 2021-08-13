#!/usr/bin/env zsh
# Just in case
cp index.html index.html.old

id=`API_KEY=$1 node getVidLink.js`

if [[ -n $id ]]; then
    echo -e "${LY}Updating index.html...${NC}"
    sed -E "s/(https:\/\/www\.youtube\.com\/embed\/).+?$/\1$id\"/" index.html > tmp
    mv tmp index.html
fi
