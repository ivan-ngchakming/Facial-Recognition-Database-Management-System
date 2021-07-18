# Flask React Example

Using flask backend, react frontend, and packaged into a single deployable *.exe file using pyinstaller.

## Usage

### Development

#### Server
setup python virtual environment using requirements.txt

run flask server using `flask run` or python `python app.py`

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
