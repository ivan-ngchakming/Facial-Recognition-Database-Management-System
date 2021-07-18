# Facial Recognition Database Management System

Using flask backend, react frontend, and packaged into a single deployable *.exe file using pyinstaller.

## Usage

### Development

#### Server
setup conda python environment using `environment.yml`

run flask server using `flask run` or python `python app.py`

update `environment.yml` by running 
```
conda env export > environment.yml --no-builds
```

#### Client
browse to client directory `cd client` and install nodejs packages with `npm install` or `yarn install`

Start development frontend client using `npm run start` or `yarn start`


### Production
Build react app using `npm run build` or `yarn build`

Start application using `python wsgi.py`

#### Freeze Application
To run application in environments without python installed

Build frozen executable using `flask build`

Frozen wsgi.exe will be created in the `/dist` directory
