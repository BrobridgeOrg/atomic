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

### admin auth
##### generate key
```
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" aaabbbccc
```

##### setting adminAuth

setting.js 加入adminAuth 並設定key亦可由環境變數帶入
settings.js template ./packages/node_modules/node-red/settings.js

```
130     adminAuth: {
131         type: "credentials",
132         users: [{
133             username: "admin",
134             password: process.env.PASSWORD || "$2a$08$PhF1VELkk4ih3k8fImx7sOS.tkwlqmRDzH1etHtZnGjPS/DzthksW",
135             permissions: "*"
136         }]
137     },
```

##### run
```
docker run -it -p 1880:1880 -v /tmp/data:/data -e PASSWORD='$2a$08$IILqmq42CakwogshuQ7Fuu3S6oker0u.hXQe0g/1Ir9lkcZU1yGji' --entrypoint npm brobridgehub/atomic:v0.0.5 start --cache /data/.npm -- --userDir /data /data/flows.json
```

### Note

