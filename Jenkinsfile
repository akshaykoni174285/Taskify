pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "akshay1742385/taskify-backend"
        DOCKER_CREDENTIALS_ID = "docker-hub-cred"  // Jenkins Credentials ID
        GIT_REPO = "https://github.com/akshaykoni174285/Taskify"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: GIT_REPO
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE ./backend"
            }
        }

        stage('Login to Docker Hub & Push Image') {
            steps {
                withDockerRegistry([credentialsId: DOCKER_CREDENTIALS_ID, url: '']) {
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }
    }
}
