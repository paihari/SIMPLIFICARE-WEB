Set 


REACT_APP_API_TOKEN=
REACT_APP_BASE_URL=


docker run -p 3000:3000 simplificare-finance:latest



To run as npm start, in the shell

Add the values in .env

REACT_APP_BASE_URL=MENTION THE URL
REACT_APP_API_TOKEN= MENTION THE TOKEN
>npm start

To run as npm ptimized production build...
>REACT_APP_API_TOKEN=TOKEN REACT_APP_BASE_URL=URL npm run build
>serve -s build

To start from docker
>docker build -t simplificare-finance:latest .
>docker run -p 3000:3000 -e REACT_APP_BASE_URL=BASE_URL -e REACT_APP_API_TOKEN=TOKEN simplificare-finance:latest