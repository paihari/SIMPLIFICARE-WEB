Set 


REACT_APP_API_TOKEN=
REACT_APP_BASE_URL=


docker run -p 3000:3000 simplificare-finance:latest



To run as npm start, in the shell

>REACT_APP_BASE_URL=MENTION THE URL
>REACT_APP_API_TOKEN= MENTION THE TOKEN
>npm start

To start from docker
>docker build --build-arg APP_API_TOKEN=TOKEN --build-arg APP_BASE_URL=https://URL -t simplificare-finance:latest .