# Fortune App with ReactJS on Skygear cluster

In this guide, we'll make a fortune app with ReactJS hosted on Skygear cluster.

We'll learn:
- basics of using Skygear for web application development,
- integrating Skygear SDK with React app,
- using Skygear for user authentication, and
- deploying web application on Skygear cluster.

You can find the completed sample source code at [GitHub]().

## Getting Started

First, create an empty directory for our web application.

For the frontend, we'll scaffold our web application using `create-react-app`:
```sh
$ npx create-react-app frontend
```
A ReactJS application should be created at `frontend` directory.


## Creating Skygear App

To interact with Skygear cluster, we'll use `skycli` utility. Install it from
command line:
```sh
$ npm install -g @skygear/skycli
```

We'll create a Skygear app on Skygear cluster for hosting our web app:
```sh
$ skycli app create
```
Note down your app API endpoint and API key.


## Configure Skygear SDK

Skygear provides user authentication functionality out-of-box through Auth Gear.
To interact with Auth Gear, Skygear SDK is used. Install Skygear SDK from
command line:
```sh
$ npm install @skygear/web --save-exact
```

Update `frontend/src/App.js` to configure Skygear SDK at runtime:
```js
import skygear from '@skygear/web';

async function configureSkygear() {
  try {
    await skygear.configure({
      endpoint: process.env.REACT_APP_API_ENDPOINT,
      apiKey: process.env.REACT_APP_API_KEY,
    });
  } catch (err) {
    alert(err);
    return false;
  }
  return true;
}

function App() {
  const [configured, setConfigured] = useState(false);
  useEffect(() => {
    configureSkygear().then(setConfigured);
  }, []);

  // ...
}
```

You should fill in your API endpoint and API key at `.env` file:
```
REACT_APP_API_ENDPOINT=https://example-app.staging.skygearapp.com/
REACT_APP_API_KEY=api-key
```

## User Authentication

In this app, we'd like to show a single authentication form: login if the user
exists, otherwise sign up as new user.

User authentication functions can be accessed through `skygear.auth`:
```js
try {
  await skygear.auth.login(username, password);
} catch (err) {
  // TODO: error handling
}
```

All Skygear API errors would be thrown as an instance of `SkygearError`. We'll
handle user not found error explictly:
```js
try {
  await skygear.auth.login(username, password);
} catch (err) {
  // Display errors other than user not found.
  if (!(err instanceof SkygearError &&
    err.name === SkygearErrorNames.ResourceNotFound)) {
    setError(String(err));
    return;
  }
}
```

If the user is not found, we'll sign up a new user using the provided
information:
```js
try {
  await skygear.auth.login(username, password);
} catch (err) {
  // Display errors other than user not found.
  if (!(err instanceof SkygearError &&
    err.name === SkygearErrorNames.ResourceNotFound)) {
    setError(String(err));
    return;
  }
}

try {
  await skygear.auth.signupWithUsername(username, password);
} catch (err) {
  setError(String(err));
  return;
}
```

## Authentication State Management

At application launch, it is recommend to update the current user state using
`me()` API:
```js
async function configureSkygear() {
  // ...

  // Check the current authentication status.
  try {
    await skygear.auth.me();
  } catch (err) {
    // Ignore not authenticated error.
    if (!(err instanceof SkygearError &&
      err.name === SkygearErrorNames.NotAuthenticated)) {
      alert(err);
      return false;
    }
  }
  return true;
}
```

We'll allow user to logout from current user:
```js
try {
  await skygear.auth.logout();
  onAuthStateChange();
} catch (err) {
  // Ignore logout errors.
  console.log(err);
}
```

To obtain current username, we can inspect `skygear.auth.currentIdentity`:
```js
function App() {
  // ...

  const [username, setUsername] = useState("");
  const onAuthStateChange = useCallback(
    () => setUsername(
      skygear.auth.currentIdentity ?
        skygear.auth.currentIdentity.loginID : ""),
    []);
  useEffect(() => {
    if (configured) {
      onAuthStateChange();
    }
  }, [configured, onAuthStateChange]);

  // ...
}
```

## Developing Backend Service

We'll develop our backend service in ExpressJS. Initialize our backend project:
```sh
$ mkdir backend
$ cd backend
$ npm init
$ npm install express --save-exact
```

For this app, we will create an `/fortune` API for getting fortune for
current user:
```js
app.get('/fortune', (req, resp) => {
    const userID = req.headers['x-skygear-user-id'];
    if (!userID) {
        const color = colors[computeLuckyNumber(new Date().toDateString()) % colors.length];
        resp.json({
            headline: "Today's lucky color is...",
            body: `${color} !`
        });
    } else {
        const num = computeLuckyNumber(String(userID)) % 100;
        resp.json({
            headline: 'Your lucky number is...',
            body: `${num} !`
        });
    }
});
```
HTTP Services can obtain user ID of request using `X-Skygear-User-ID`
header.

> Skygear Gateway would proxy the incoming request to http services and inject
> user information into HTTP headers.

## Calling Backend Service
To call our backend API, `skygear.fetch` can be used:
```js
function Fortune(props) {
    const { username } = props;

    const [fortune, setFortune] = useState({});

    useEffect(() => {
        async function updateFortune() {
            try {
                const resp = await skygear.fetch('/api/fortune');
                const fortune = await resp.json();
                setFortune(fortune);
            } catch (err) {
                alert(err);
            }
        }
        setFortune({});
        updateFortune();
    }, [username]);

    // ...
}
```

> `skygear.fetch` has same functionality as the built-in `fetch` function of
> browser. It would also inject necessary information for calling Skygear APIs,
> such as API key and current user token.

## Deploying Skygear App
Our application should have the following structure now:
```
- frontend            ReactJS frontend
|-- package.json
|-- ...
- backend             Express backend
|-- package.json
|-- ...
```

We'll deploy this two HTTP services to Skygear platform. Create a `skygear.yaml`
file at the root directory:
```yaml
app: <app name>

deployments:
  backend:
    type: http-service
    context: backend
    template: nodejs:12
    path: /api
    port: 8080
  frontend:
    type: http-service
    context: frontend
    path: /
    port: 80
```

`skygear.yaml` contains app deployment configuration. We can deploy our app
using `skycli`:
```sh
$ skycli app deploy
```

## Conclusion
You have just deployed a ReactJS app with Express backend on Skygear cluster.

To learn more about Skygear, please refer to our documentation & guides.
