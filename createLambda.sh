aws lambda create-function \
--region eu-west-1 \
--function-name mob2-ibl \
--zip-file fileb://./mob2-ibl.zip \
--role <redacted> \
--handler index.fulfillment \
--runtime nodejs8.10 \
--profile default