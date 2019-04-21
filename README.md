# SmartMirror

## Setup

Run `npm install` to install dependencies in the root folder. Repeat in `./angularSrc`.

## Run Production Servers

If you've edited the project, build to production server first.

Start MongoDB locally.

Run `node app.js` from the root folder.

In web browser, navigate to http://localhost:3000/.

### Build to Production Server

Build angular project to `./public/` by running the command `ng build --base-href /` from location `./angularSrc/`. Then run production server.
