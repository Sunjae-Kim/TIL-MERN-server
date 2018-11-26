# MERN Stack 구축

[TOC]

## 1. Server

### 1.1 Initiating

- MERN > server 를 만들고 server 안에서 `$ git init ` 을 수행한다.
- `$ touch .gitignore` 하고난 뒤  `node_modules/` 내용을 추가하자

- 배포용 package.json 관리

  - description에 'MERN node-express server' 라고 작성하겠다.

  - scripts > test 삭제하고 script > dev, start 를 만든다.

  - author도 채워주자

    ```json
    {
      "name": "server",
      "version": "1.0.0",
      "description": "MERN node-express server",
      "main": "index.js",
      "scripts": {
        "dev": "nodemon index.js",
        "start" : "node index.js"
      },
      "author": "sunjae-kim",
      "license": "ISC"
    }
    
    ```
