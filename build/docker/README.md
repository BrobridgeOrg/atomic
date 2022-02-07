## atomic docker
---

### run
```
docker run -it -p 1880:1880 -v /tmp/data:/data hb.k8sbridge.com/atomic/atomic:v0.0.1
```

### help info
``` 
docker run -it -p 1880:1880 -v /tmp/data:/data hb.k8sbridge.com/atomic/atomic:v0.0.1 --help
```

### mount volume
```
mkdir /tmp/data
sudo chown 1001 /tmp/data
docker run -it -p 1880:1880 -v /tmp/data:/data --entrypoint npm hb.k8sbridge.com/atomic/atomic:v0.0.2 start --cache /data/.npm -- -D disableEditor=true --userDir /data /data/flows.json
```

