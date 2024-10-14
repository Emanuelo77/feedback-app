provider "aws" {
  region = "eu-central-1"  # oder eine andere Region
}

# Erstellen eines SSM Parameters für den Lambda Environment Variable
resource "aws_ssm_parameter" "my_parameter" {
  name  = "/myapp/parameter"
  type  = "String"
  value = "Hello from Terraform!"
}
