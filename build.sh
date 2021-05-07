#!/bin/bash

#echo "打包文件"
#yarn build
echo -e "传输webmall文件 \n"
scp -r ./dist/** /usr/share/nginx/html/webmall/
echo "webmall部署成功 --> http://wmall.cafewallet.cn/ "
