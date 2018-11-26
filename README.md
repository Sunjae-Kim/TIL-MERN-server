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
  $ npm install mongoose
  $ npm install cookie-session
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

- `callbackURL` 파트에 추가해준 url주소로 google에서 만든 웹어플리케이션의 승인된 리디렉션 주소를 설정해준다. `http://localhost:5000/auth/google/callback`

- Passport로 google 로그인 process

  아래 **Code를 확인하고 사용자 정보를 Express로 넘기는 단계**까지 **Passport**에서 지원해준다.

  |    Browser     |      |               Express                |      |           Google            |
  | :------------: | :--: | :----------------------------------: | :--: | :-------------------------: |
  | `/auth/google` |  ▶   |          req => google 토스          |  ▶   |    사용자 허락 창을 띄움    |
  |                |      |             code를 받음              |  ◀   | 사용자 허가 함, code를 넘김 |
  |                |      | code를 포함한 요청을 Google에게 보냄 |  ▶   |         Code를 확인         |
  |                |      |           DB에 레코드 저장           |  ◀   |     사용자 정보를 넘김      |
  | Logged IN !!!  |  ◀   |   사용자 ID를 브라우저 쿠키에 저장   |      |                             |
  |  API req 보냄  |  ▶   | 쿠키를 확인해서 로그인한 사용자 확인 |      |                             |

---

### 1.6 Refactoring

- **services/passport.js**

  ```bash
  $ mkdir services
  $ touch services/passport.js
  ```

  index.js 내부에 있던 Passport 관련 내용들을 전부 옮기도록 하자. 

  ```js
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const config = require('config');
  
  passport.use(new GoogleStrategy(
    {
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    /*
      refreshToken: 언제 expire 시킬지  
    */
    (accessToken, refreshToken, profile, done) => {
      console.log(`accessToken => ${accessToken}`);
      console.log(`refreshToken => ${refreshToken}`);
      console.log(profile);
      console.log(`done => ${done}`);
    }
  ));
  ```

  - index.js

    ```js
    /* services */
    require('./services/passport'); // 매번 수행됨
    ```

    **passport.js** 내부의 `passport.user()` 함수는 middleware와 같은 형식으로 호출하기 때문에 위 코드처럼 `require()` 를 통해서 일반 함수 호출 방식으로 바로 실행이 되도록 하자.

- **routes**

  ```bash
  $ mkdir routes
  $ touch auth.js
  $ touch home.js
  ```

  index.js 내부에 HTTP method 들을 따로 routes  폴더에서 관리하자. [자세히 보기]()

---

## 2. MongoDB

- config에 mongodb url setting

- index.js에서 mongodb connect

- user model을 만든다.

  ```bash
  $ mkdir models
  $ touch User.js
  ```

  ```js
  const mongoose = require('mongoose');
  const { Schema } = mongoose;
  
  const userSchema = new Schema({
    googleID: String,
    required: true
  })
  
  const User = mongoose.Model('user', userSchema);
  
  exports.User = User;
  ```

- passport에서 user 저장

  **passport.js**

  ```js
    (accessToken, refreshToken, profile, done) => {
      const user = new User({ googleID: profile.id});
      user.save()
        .then(newUser => done(null, newUser))
        .catch(error => done(error, null));
    }
  ```


---

## 3. Session

- Express sessions 라는 collection이 생기고 그 안에 document로 관리가 가능






















