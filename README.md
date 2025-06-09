# goit-node-rest-api

##  API  Description

### Get all contacts:

```http
GET /api/contacts
```

### Get one contact:

```http
GET /api/contacts/{id}
```

### Delete contact:

```http
DELETE /api/contacts/{id}
```

### Create contact:

```http
POST /api/contacts
```

### Update contact:

```http
PUT /api/contacts/{id}
```


## Body schemas

### Create contact:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```
All fields are required.

### Update contact:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```
All fields are optional, but at least one field must be specified.
