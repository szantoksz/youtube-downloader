# Web Client Metadata

#### There will be a ```meta```  folder with the web client, inside the folder will be a ```config.json``` file, the contents are:
```json
{
    "ver": "1.0.0",
    "app": "szantokszYtDownloader",
    "api_url": null
}
```
#### You need to replace ```api_url``` with the actual API's URL, the format is:
#### http(s)://<IP/Domain>(:PORT)/api

- The ```http(s)``` needs to be There
- The ```IP/Domain``` needs to be There
- The ```PORT``` is optional, it will default to 80 or 443 depending if you're using https or not
- The ```/api``` needs to be there