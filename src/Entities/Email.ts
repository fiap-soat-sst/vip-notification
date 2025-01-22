import { InputEmailDTO, EmailDTO } from "./DTOs/Email.dto";
import { randomUUID } from "node:crypto";

export class Email implements EmailDTO {
  readonly id: EmailDTO["id"];
  readonly sender: EmailDTO["sender"];
  readonly receiver: EmailDTO["receiver"];
  readonly subject: EmailDTO["subject"];
  readonly type: EmailDTO["type"];
  readonly body: EmailDTO["body"];
  readonly data: EmailDTO["data"];

  constructor(input: EmailDTO | InputEmailDTO) {
    this.id = input["id"] || randomUUID();
    this.sender = input.sender;
    this.receiver = input.receiver;
    this.type = input.type;
    this.subject = this.getSubject(input.type);
    this.data = input.data;
    this.body = this.getBody(input.type);
  }

  private getBody(type: typeof this.type): typeof this.body {
    if (type === "ERROR" && this.data.errorMessage) {
      return this.ErrorEmailTemplate({
        errorMessage: this.data.errorMessage,
        videoTitle: this.data.videoTitle,
      });
    } else if (type === "SUCCESS" && this.data.urlVideo) {
      return this.SuccessEmailTemplate({
        urlVideo: this.data.urlVideo,
        videoTitle: this.data.videoTitle,
      });
    } else {
      throw new Error("Invalid email type");
    }
  }

  private getSubject(type: typeof this.type): typeof this.subject {
    switch (type) {
      case "SUCCESS":
        return `Vídeo processado com sucesso`;
      case "ERROR":
        return `Erro no processamento do vídeo`;
    }
  }

  // Todo: Implementar templates de email na camada de infraestrutura
  private ErrorEmailTemplate({
    errorMessage,
    videoTitle,
  }: {
    errorMessage: string;
    videoTitle: string;
  }): string {
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
            <p>Infelizmente ocorreu um erro no processamento do seu vídeo <strong>${videoTitle}</strong>. O erro foi:</p>
            <p>${errorMessage}</p>
            <p>Por favor, tente novamente mais tarde.</p>
        </body>`;
  }

  // Todo: Implementar templates de email na camada de infraestrutura
  private SuccessEmailTemplate({
    urlVideo,
    videoTitle,
  }: {
    urlVideo: string;
    videoTitle: string;
  }): string {
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
            <p><a href="${urlVideo}">${videoTitle}</a>.</p>
        </body>`;
  }
}
