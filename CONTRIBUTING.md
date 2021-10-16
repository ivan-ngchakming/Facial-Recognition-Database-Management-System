# How to contribute to Facial Recognition Database Management System

Thank you for considering contributing to Facial Recognition Database Management System!

## Reporting issues

Include the following information in your post:

- Describe what you expected to happen.
- If possible, include a minimal reproducible example to help us identify the issue. This also helps check that the issue is not with your own code.
- Describe what actually happened. Include the full traceback if there was an exception.
- List your FRDMS versions. If possible, check if this issue is already fixed in the latest releases or the latest code in the repository.

## Submitting Pull Request

If there is not an open issue for what you want to submit, prefer opening one for discussion before working on a PR.
You can work on any issue that doesn't have an open PR linked to it or a maintainer assigned to it.
These show up in the sidebar. No need to ask if you can work on an issue that interests you.

Please fork the repo and create a new branch using the changes you would like to make as the branch name

### First time setup

- Create virtualenv and install requirements.txt

```sh
# Windows
python -m venv ./venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv ./venv
. venv/bin/activate
```

- Launch the development server

```sh
python app.py
```

- Install node.js modules and start development React app

```sh
yarn install
yarn start
```

- Build app

```sh
flask build windows -r -c
```

### Style Guide

To ensure consistent coding style, please use pre-commit

```sh
pre-commit install
```

Run pre-commit hooks on modified files after staging

```sh
pre-commit run
```

### Database

If you do not populate the database manually yourself, you may download a sample database [here](https://github.com/ivan0313/Facial-Recognition-Database-Management-System/releases/download/v0.1.1/FRDMS.db)
