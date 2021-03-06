# curatour-backend

## Content
* [Summary](#Summary)
* [Hosting](#Hosting)
* [Local Installation](#Local-Installation)

### Summary
This project involves the use of NodeJS and MongoDB.
Test data are not yet included, but will be added in `/data` folder at root directory.

### Hosting
There are 2 ways this application can be hosted. The steps to replicate the hosting process are shown below.
1. Deploy NodeJS application through EC2 instance.
- Launch an EC2 instance and SSH into it
- Install Node on EC2 Instance  <br />
`https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html`
- Using Github, BitBucket or Gitlab  <br />
`sudo yum install -y git`
- For bcrypt npm install error
```
sudo apt-get update
sudo apt-get install -y build-essential g++
sudo apt-get install -y build-essential python
```

2. Deploy NodeJS application through Docker and ECR.
- Follow instructions from this [blog](https://medium.com/@terencelimxp/step-by-step-how-to-dockerize-and-deploy-a-node-js-mongo-app-to-amazon-ecs-using-aws-ec2-19489632e2d5)
- Include [Sensitive Secret Data](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html)

### Local Installation
- Clone this repository:
```
git clone https://github.com/bt3101-capstone/curatour-backend.git
```
- Change to curatour-backend directory
```
cd curatour-backend
```
- Run npm install
```
npm install
```
- Start the application
```
ts-node src/server.ts
```
