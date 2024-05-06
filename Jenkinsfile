pipeline {
    agent any
    environment {
        branch = 'main'
        scmUrl = 'ssh://git@myScmServer.com/repos/myRepo.git'
        serverPort = '8080'
        developmentServer = 'dev-myproject.mycompany.com'
        stagingServer = 'staging-myproject.mycompany.com'
        productionServer = 'production-myproject.mycompany.com'
    }
    stages {    
        stage('hello') {
            steps {
                echo "Prueba Jenkins"
            }
        }     
    }
    post {
        always{
          echo "Finalizo la Tarea"
        }
        failure {
            mail to: 'team@example.com', subject: 'Pipeline failed', body: "${env.BUILD_URL}"
        }
    }
}
