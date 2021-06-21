# rsync ./package.json ubuntu@archiva.mi.com.co:~/apps/frontpanelinterno
#rsync -rave "ssh -i ${CAJERO_KEYS}/panelinterno/panelinterno.txt" ./build/* ubuntu@34.224.162.30:/home/ubuntu/apps/frontpanelinterno/build
rsync -rave "ssh -i /home/alejo/accesos/panelinterno.txt" ./build/* ubuntu@34.224.162.30:/home/ubuntu/apps/frontpanelinterno/build