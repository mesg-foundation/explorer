# Webhook

Receive HTTP connections and emit events with data

```bash
mesg-core service deploy https://github.com/mesg-foundation/service-webhook
```


## Events

### request

Event key: **request**

This even is emitted every time the server receive a `POST` request on the URL `/webhook`.

| **key** | **type** | **description** |
| --- | --- | --- |
| **data** | `Object` | All the data contained in the request data |
| **headers** | `Object` | All the headers contained in the request |


## Tasks

### call

Task key: **call**

This task will call a webhook and return the result of the call

#### Inputs

| **key** | **type** | **description** |
| --- | --- | --- |
| **data** | `Object` | Data the you want to send |
| **headers** | `Object` | Additional headers that you want to send |
| **url** | `String` | URL that you want to call |


#### Outputs

##### error

Output key: **error**

Output if an error occurs

| **key** | **type** | **description** |
| --- | --- | --- |
| **message** | `String` | Error message |

##### result

Output key: **result**

Result of the call the returns the list of the data from the API call result

| **key** | **type** | **description** |
| --- | --- | --- |



