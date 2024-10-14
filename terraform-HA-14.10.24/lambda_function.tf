resource "aws_lambda_function" "hello_world_lambda" {
  function_name = "hello_world_lambda"
  role          = aws_iam_role.lambda_execution_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"  # Ändere die Runtime auf die aktuelle Version

  filename      = "${path.module}/lambda_function_payload.zip"

  source_code_hash = filebase64sha256("${path.module}/lambda_function_payload.zip")

  environment {
    variables = {
      PARAMETER_NAME = aws_ssm_parameter.my_parameter.value  # Zugriff auf den SSM Parameter
    }
  }
}

# Verpacken des Lambda Codes
resource "null_resource" "zip_lambda" {
  provisioner "local-exec" {
    command = "zip -j ${path.module}/lambda_function_payload.zip ./lambda_code/index.js"
  }
}
