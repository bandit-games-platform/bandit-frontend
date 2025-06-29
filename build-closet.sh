#!/bin/bash

KC_URL=https://kc.bdev-closet.duckdns.org
KC_REALM=bandit-realm
KC_CLIENT_ID=bandit-frontend
BACKEND_URL=https://be.bg.bdev-closet.duckdns.org/api
STRIPE_PUBLIC_KEY=pk_test_51QQaFiD146XV2ozOYjBAlBlaT94QRcKjAeTGvqH89WJWA8S43UYDDH09x4Zs4MvmgJ94UVfCRdb9ihaBuWoomuuY003kFO3G1q


docker build \
--build-arg VITE_KC_URL=$KC_URL \
--build-arg VITE_KC_REALM=$KC_REALM \
--build-arg VITE_KC_CLIENT_ID=$KC_CLIENT_ID \
--build-arg VITE_STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY \
--build-arg VITE_CHATBOT_URL=$BACKEND_URL \
--build-arg VITE_GAME_REGISTRY_URL=$BACKEND_URL \
--build-arg VITE_GAMEPLAY_URL=$BACKEND_URL \
--build-arg VITE_PLAYER_URL=$BACKEND_URL \
--build-arg VITE_STATISTICS_URL=$BACKEND_URL \
--build-arg VITE_STOREFRONT_URL=$BACKEND_URL \
--platform=linux/arm64 \
-t bdev42/bandit-games:fe-closet \
. \
&& docker image save bdev42/bandit-games:fe-closet -o build-fe-closet.tar \
&& scp build-fe-closet.tar pi:~/bandit
