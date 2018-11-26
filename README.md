# MERN Stack 구축

[TOC]

## 1. Server

### 1.1 Initiating

- **Git repository** 생성

  - MERN > server 를 만들고 server 안에서 `$ git init ` 을 수행한다.
  - `$ touch .gitignore` 하고난 뒤  `node_modules/` 내용을 추가하자

- **NPM - package.json** 수정

  - server directory 내부에서 `$ npm init` 을 수행한다.

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

- **Modules**

  ```bash
  $ npm install express
  $ npm install -g heroku
  $ npm install passport passport-google-oauth20
  $ npm install config
  ```

---

### 1.2 Express App

- **index.js**

  ```js
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.send('hi')
  })
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
  })
  ```

  > 5000번 포트를 이용하자

- **heroku 배포**

  ```bash
  $ heroku login 
  $ heroku create
  ```

  Login을 먼저 진행하고 Create를 하게 되면 

  Git remote에 heroku로 생긴다.

  ```bash
  $ git add .
  $ git commit -m <message>
  $ git push heroku master
  ```

  heroku 서버에 올린뒤 **Open App** 을 통해 위에서 작성한 express 서버가 작동하는 것을 확인해보자.

---

### 1.3 Google Oauth

- <https://console.developers.google.com> 으로 접속하여 새로운 프로젝트를 만들자.

- 해당 프로젝트를 선택한 뒤 왼쪽의 라이브러리 탭에서 "**google+**"를 검색 및 선택하고 api 사용자 인증 정보를 추가 버튼을 누르자.

  1. Google+ API,  웹서버, 어플리케이션 데이터
  2. mern-dev, https://localhost:5000
  3. 내 이메일, MERN-dev
  4. 다운로드를 진행한다.  해당 JSON 파일을 server directory에 넣고 완료한다.

---

### 1.4 Config Module

- server/config 디렉토리를 생성하고 json 파일들을 만든다.

  - default.json

  - development.json

    ```json
    {
      "name":"MERN-DEV",
      "DB": {
        "mongoURI":""
      },
      "auth": {
        "google": {
          "clientID": "",
          "clientSecret": ""
        }
      },
      "cookie-key": ""
    }
    ```

    > clientID 와 clientSecret을 google+ API에서 다운로드 받았던 json 파일에서 가져와서 채워주자.
    >
    > clientScret은 공개가 되면 안되기 때문에 **반드시 .gitignore 에서 `config/development.json` 를 추가해주자.**

  - production.json

  - custom-environment-variables.json

---

### 1.5 Passport

- Passport 를 **index.js** 에서 setting을 해보자

  ```js
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  
  passport.use(new GoogleStrategy(
    {
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    accessToken => {
      console.log(accessToken);
    }
  ));
  
  app.get(
    "/auth/google",
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )
  ```

---




























