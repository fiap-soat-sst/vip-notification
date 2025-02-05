
export const SuccessEmailTemplate = ({ urlVideo, videoName }: { urlVideo: string, videoName: string }):string => {
return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vídeo processado com sucesso</title>
</head>
<body>
    <h1>Seu vídeo foi processado com sucesso!</h1>
    <p>Olá, tudo bem? Seu vídeo foi processado com sucesso e o link de acesso ao arquivo compactado com as imagens extraídas está disponível abaixo:</p>
    <p><a href="${urlVideo}">${videoName}</a>.</p>
</body>`}