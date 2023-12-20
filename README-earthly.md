# Build docker image with earthly

## Requirements

* docker installed
  * 安裝方法參考 confluence 文件 - [Docker](https://brobridge.atlassian.net/wiki/spaces/BroSync/pages/657063961/Brosync+-#%E5%AE%89%E8%A3%9D-docker)
* earthly installed
  * 安裝方法參考 confluence 文件 - [Earthly](https://brobridge.atlassian.net/wiki/spaces/BroSync/pages/657063961/Brosync+-#%E5%AE%89%E8%A3%9D-earthly)
* 可寫入 ghcr.io 的權限
  * 建一個 personal access token token，參見 - [BroSync docker registry 建置](https://brobridge.atlassian.net/wiki/spaces/BroSync/pages/664600584/BroSync+docker+registry#Create-your-token)

## BroSync jobmgr 用的 base docker image

使用 earthly 打包 docker image，並 push 到 ghcr.io。

```bash
export CR_PAT=xxxx
echo $CR_PAT | docker login ghcr.io -u --password-stdin
earthly --push +build-docker-brosync-jobmgr-base --IMAGE_VERSION=v1.0.0
```

* `CR_PAT` 為上述建立的 personal access token。
* push 到 ghcr.io 的 image 名稱為 `ghcr.io/brobridgeorg/atomic/atomic-brosync-jobmgr-base`。
* Github - [atomic repo packages](https://github.com/orgs/BrobridgeOrg/packages?repo_name=atomic)。
* 若想先測試 docker image，可以先把 `--push` 拿掉，這樣只會打包好在本機。
* `--IMAGE_VERSION` 用於指定 image 的版本，若不指定則預設為 `dev`。
