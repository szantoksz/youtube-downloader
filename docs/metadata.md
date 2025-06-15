# Metadata

## Server
#### The server uses environemnt variables for the metadata, if these variables are not set, the server won't start, the variables are:
- ```APP``` Default data: ```szantokszYtDownloader```
- ```VER``` Default data: ```1.0.1```

---

## Web Client
#### The client uses environemnt variables for the metadtata, if these variables are not set the client won't be able to communicate with the API server, the variables are:
- ```APP``` Default data: ```szantokszYtDownloader```
- ```VER``` Default data: ```1.0.1```
- ```API_URL``` Default data: N/A
#### You have to define the ```API_URL``` yourself, the structure is:
```http(s)://<domain/ip>(:port)/api```
- ```http(s)``` has to be there
- ```domain/ip``` has to be there
- ```port``` is optional
- ```/api``` is option but preferred 
