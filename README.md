# Next Level Week \#2 - V.1.9
---

# :pushpin: Table of Contents

* [Screens](#point_right-screens)
* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :point_right: Screens

<div>
  <p style="display: flex; justify-content: space-between;">
    <img src="./docs/images/mobile/first-steps.gif" width="30%" style="object-fit: cover" />
    <img src="./docs/images/mobile/login.gif" width="30%" style="object-fit: cover" />
    <img src="./docs/images/mobile/profile.gif" width="30%" style="object-fit: cover" />
  </p>


  <p style="display: flex; justify-content: space-between;">
    <img src="./docs/images/mobile/create-account.gif" width="30%" style="object-fit: cover" />
    <img src="./docs/images/mobile/forgot-password.gif" width="30%" style="object-fit: cover" />
    <img src="./docs/images/mobile/forgot-password-ok.gif" width="30%" style="object-fit: cover" />
  </p>


  <p style="display: flex; justify-content: space-between;">
    <img src="./docs/images/mobile/take-photo.gif" width="25%" style="object-fit: cover" />
    <img src="./docs/images/mobile/proffys-list.gif" width="25%" style="object-fit: cover" />
    <img src="./docs/images/mobile/filters.gif" width="25%" style="object-fit: cover" />
    <img src="./docs/images/mobile/favorites.gif" width="25%" style="object-fit: contain" />
  </p>


</div>

# :rocket: Features

## Backend Features

#### :electric_plug: Connections

- Route to list total of connections;
  - **GET**: `{{ baseURL }}/connections`
- Route to create new Connection;
  - **POST**: `{{ baseURL }}/connections`
    - Body request needs an object:

    ```json
    {
      "user_id": number,
    }
    ```

#### :video_camera: Classes

- Route to create subject lesson;
  - **POST**: `{{ baseURL }}/classes` _(Must be auth)_
    - Body request needs an object:

    ```json
    {
      "whatsapp": string, // WITHOUT ANY OTHER DIGITS - JUST NUMBERS LIKE 99999999999
      "bio": string, // MAX LENGHT IS 300 CHARACTERS
      "subject": string, // AN STRING WITH THE SUBJECT OF THE CLASS - LIKE English - [a-zA-Z] without SPECIAL CHARACTERS
      "cost": number, // CAN BE A DECIMAL NUMBER PRECISION 2
      "schedule": [ // MUST BE AN ARRAY OF ABOVE TYPE
        {
          "week_day": number, // MUST BE A NUMBER RANGE 1-5
          "from": "08:03", // MUST BE A STRING LIKE THE EXAMPLE "00:00"
          "to": "12:00" // MUST BE A STRING  LIKE THE EXAMPLE "00:00"
        }
      ]
    }
    ```
- Route to list lessons and proffys;
  - List all _(Must be auth)_;
    - **GET**: `{{ baseURL }}/classes/all`
      - Query params:
        - week_day: number; - Mandatory.
        - subject: string; - Mandatory.
        - time: string; - Mandatory. _LIKE FROM/TO OF PREVIOUS EXAMPLE (00:00)_
  - Filter by subject, week day and time _(Must be auth)_;
    - **GET**: `{{ baseURL }}/classes`
      - Query params:
        - page: number; - Optional

#### Proffy

- Route to create proffy profile;
  - **POST**: `{{ baseURL }}/users`
    - Body request needs an object:

    ```json
    {
      "name": string,
      "lastname": string,
      "email": string,
      "password": string
    }
    ```
- Route to index the profile of logged user _(Must be auth)_
  - **GET**: `{{ baseURL }}/profile`
- Route to update profile _(Must be auth)_
  - **PUT**: `{{ baseURL }}/profile/update`
    - Body request needs an object:

      ```json
      // SAME FORMAT LIKE CLASSES POST OBJECT
      {
        "name": string,
        "lastname": string,
        "email": string,
        "whatsapp": string,
        "bio": string,
        "subject": string,
        "cost": number,
        "schedules": [
          {
            "week_day": number,
            "from": string,
            "to": string
          }
        ]
      }
      ```
  - Route to Update the avatar of user _(Must be auth)_
    - **PATCH**: `{{ baseURL }}/avatar/update`;
      - Request format: `Multipart form` sending a fieldname: avatar

#### Favorites

All routes must be authenticated

- Route to show a favorite list of authenticated user;
  - **GET**: `{{ baseURL }}/favorites`
    - optional query param - `page: number`
- Route to remove a favorite from authenticated user list;
  - **DELETE**: `{{ baseURL }}/favorites`
- Route to add a favorite to authenticated user list;
  - **POST**: `{{ baseURL }}/favorites`
    - Body request needs an object:

    ```json
    {
      "favorite_user_id": number;
    }
    ```

#### Password

- Route to request a recover link
  - **POST**: `{{ baseURL }}/password/forgot`
    - Body request needs an object:

    ```json
    {
      "email": string
    }
    ```
    - It sends an email with the token in link to reset page
- Route to reset a password
  - **PUT**: `{{ baseURL }}/password/recover`
    - Body request needs an object:

    ```json
    {
      "password": string, // IT WILL BE A NEW PASSWORD
      "token" string
    }
    ```

## Frontend

### Pages

#### Landing Page

- Buttons
  - Study;
  - Give-Classes;

#### Study

- Filter by Subject, week day and time;
- Proffys list;
  - Button In touch (by Whatsapp);

#### Dar Aulas

- Sign up areas;
  - Sign up personal data;
  - Sign up lesson/classes;
  - Sign up work times to lesson;

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/), [Android SDK](https://medium.com/surabayadev/setting-up-react-native-android-without-android-studio-35a496e1dfa3), [Expo](https://docs.expo.io/get-started/installation/) first and then, in order to clone the project via HTTPS, run this command:**

```git clone https://github.com/jeanmolossi/next-level-week-2.git```

**Install dependencies**

```expo install```

**Setup the API**

In **root** of project, run:

```cd server && yarn typeorm migration:run```

# :runner: Getting Started

Run the following command **on project root folder** in order to start the application in a development environment:

```
  // Run server API
  yarn start:server
```
In another terminal tab/window

```
  // Run web application
  yarn start:web
```
In another terminal tab/window

```
  // Run mobile application
  yarn start:mobile
```

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [Gympoint Mobile](https://github.com/jeanmolossi/next-level-week-2/issues) repository. If you already found a solution to your problem, **i would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/jeanmolossi/next-level-week-2/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :closed_book: License

Released in 2020.
This project is under the [MIT license](https://github.com/jeanmolossi/next-level-week-2/master/LICENSE).

Made by [Jean Molossi](https://github.com/jeanmolossi) 🚀
