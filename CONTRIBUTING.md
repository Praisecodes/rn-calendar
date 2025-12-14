# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

This project is a monorepo managed using NPM. It contains the following packages:

- RNCalendar.
- An example app in the `example/` directory.

To get started with the project, make sure you have the correct version of [Node.js](https://nodejs.org/) installed.

Run `npm install` in the root directory to install the required dependencies for each package:

```sh
npm install
```

> Since the project relies on NPM, you cannot use `yarn` for development without manually migrating.

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
cd example
npm install
npx expo start -c
```

To run the example app on Android:

```sh
npx expo start android -c
```

To run the example app on iOS:

```sh
npx expo start ios -c
```

Make sure your code passes TypeScript:

```sh
npm typecheck
```

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
