# UNSMART_JSON

An attempt at creating a superset of json.

> Inspired by [superjson](https://github.com/blitz-js/superjson)

```js
import UNSMART_JSON from "..."

let data = {
    likes: [
        {id: "98890", createdAt: new Date("2023-06-01")},
        {id: "98890", createdAt: new Date("2023-06-02")},
        {id: "98890", createdAt: new Date("2023-06-13")}
    ]
}

let stringified = UNSMART_JSON.stringify(data);
/*
stringified = `{
    json":{
        "likes":[
            {"id":"1","createdAt":"date|2"},
            {"id":"3","createdAt":"date|4"},
            {"id":"5","createdAt":"date|6"}
        ]
    },
    "data":{
        "1":"98890",
        "3":"98890",
        "5":"98890",
        "date|2":1685577600000,
        "date|4":1685664000000,
        "date|6":1686614400000
    }
}`
*/

let parsed = UNSMART_JSON.parse(stringified);
// parsed = data 

let aliased = UNSMART_JSON.alias(data);
/* 
aliased = [{
    likes: [
        {"-": "98890", ".": new Date("2023-06-01")},
        {"-": "98890", ".": new Date("2023-06-02")},
        {"-": "98890", ".": new Date("2023-06-13")},
    ]
},45, "id", "createdAt"]
*/

let dealiased = UNSMART_JSON.dealiase(aliased);
// dealiased = data
```
