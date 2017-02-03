# Manage feed application
Authored by Sergey Ksenofontov (ksenofontovsa@ya.ru)

## Available API methods:

### GET:
  - http://localhost:3000/ - get all saved shop names
  ```
    [
      {
        "_id": "58937bce70d40987c4aaa4da",
        "name": "mail"
      },
      {
        "_id": "58937bd367f90987cafb3c1c",
        "name": "mail"
      }
    ]
  ```
  - http://localhost:3000/?shop={shopname} - get all products for the shop
  ```
    {
      "_id": "58943c267020aa97d89fbf0b",
      "products": [
        {
          "product_id": "00000106",
          "price": "7,99",
          "_id": "58943c277020aa97d8a0cc5a"
        }
      ]
    }
  ```
  - http://localhost:3000/?shop={shopname}&product_id={product_id} - get price for the particular product in the shop
  ```
    "18,29"
  ```

### POST:
  http://localhost:3000/ - add feed to parse

  Available options:
    url - url to parse
    name - name of the feed
    delimiter - csv delimiter (default: \t)
    idFieldIndex - index of the id field (default: 0)
    priceFieldIndex - index of the price field (default: 3)
    fromLine - from which line we should parse csv file (default: 1)

  ```
    [
      {
        "product_id": "00000106",
        "price": "7,99"
      },
      {
        "product_id": "00000112",
        "price": "7,99"
      },
      {
        "product_id": "00000129",
        "price": "7,99"
      }
    ]
  ```

## Howto:
`All process of the installation tested only for OS X operation system.`
Please, adapt this instractions for your preferable OS.

### Install and launch MongoDB:
```
  brew install mongodb
  mkdir -p /data/db
  mongod
```

### Install NodeJS
```
  brew install node
```

### Install npm package and launch our application:
```
  npm install
  node index.js
```

## Requirements
  - NodeJS >= v6.5
  - MongoDB >= v3.4.1





