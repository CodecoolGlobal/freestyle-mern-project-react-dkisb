# 21-hungarian-card-game

<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a full-stack web application written in React.js,Express.js,MongoDB and plain CSS.
It delivers a digital version of the traditional Hungarian card game "Huszonegy." Designed on an interactive platform enabling users to compete against an AI-powered dealer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React.js][React.js]][React-url]
- [![Express.js][Express.js]][Express-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![CSS][CSS]][CSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Configure the proxy for your backend in vite.config.js

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: true,
    },
  },
},
```

3. Configure the system environmental variables in a .env file in your server folder

```env
MONGO_URL:put your mongoDB url here, in which you wish to create your cards Database.
```

4. Run the **cardcreator.js** file in the server folder inorder to populate your database

5. As both the frontend and the backend are in the same repository, open two terminals for each part of the application

- cd client -> npm run dev
- cd server -> npm run dev

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/bencsicszoli">
  <p>Zoltán Bencsics</p>
</a>

## Contact

Döme Marcell Kisbalázs - domekisb@gmail.com

Project Link: [https://github.com/CodecoolGlobal/freestyle-mern-project-react-dkisb](https://github.com/CodecoolGlobal/freestyle-mern-project-react-dkisb)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
