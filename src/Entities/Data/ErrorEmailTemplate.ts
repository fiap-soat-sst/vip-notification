
export const ErrorEmailTemplate = ({ errorMessage, videoName }: { errorMessage: string, videoName: string }):string => {
return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ocorreu um erro no processamento do seu vídeo</title>
</head>
<body>
    <h1>Ocorreu um erro no processamento do seu vídeo</h1>
    <p>Infelizmente ocorreu um erro no processamento do seu vídeo <strong>${videoName}</strong>. O erro foi:</p>
    <p>${errorMessage}</p>
    <p>Por favor, tente novamente mais tarde.</p>
</body>`}