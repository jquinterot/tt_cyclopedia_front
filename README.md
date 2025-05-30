#Docker commands

#Dev build
docker build -t react:alpine -f Dockerfile.dev .

#Running commands

docker run -d -p 5173:5173 --name cyclopedia_front react:alpine

docker start cyclopedia_front

docker stop cyclopedia_front

docker logs cyclopedia_front

#Remove
docker rm -f cyclopedia_front