#!/usr/bin/env bash

node_bin="node_modules/.bin"

for i in {1..30}; do
    printf "Your wallet\n\n" >tmp.txt

    $node_bin/bip39-cli generate >tmp.pass.txt
    $node_bin/bip39-cli accounts -c 1 "$(cat tmp.pass.txt)" | cut -f1 -d ' ' >tmp.account.txt
    $node_bin/qrcode "$(cat tmp.account.txt)" -o tmp.qrcode.png

    echo "Your BIP39 passphase (secret):" >>tmp.txt
    for w in $(cat tmp.pass.txt); do
        echo "  $w" >>tmp.txt
    done

    printf "\n\n\n\n-- FOLD HERE --\n\n\n\n" >>tmp.txt

    echo "Your public address:" >>tmp.txt
    cat tmp.account.txt >>tmp.txt

    cupsfilter tmp.txt >tmp.pdf

    magick montage tmp.pdf tmp.qrcode.png -mode concatenate -tile 1x $i.pdf

    rm -f tmp.pass.txt tmp.account.txt tmp.qrcode.png tmp.txt tmp.pdf
done

echo "DONE"
