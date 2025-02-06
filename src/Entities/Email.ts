import { InputEmailDTO, EmailDTO } from "./DTOs/Email.dto";
import { randomUUID } from "node:crypto";

export class Email implements EmailDTO {
  readonly id: EmailDTO["id"];
  readonly sender: EmailDTO["sender"];
  readonly receiver: EmailDTO["receiver"];
  readonly subject: EmailDTO["subject"];
  readonly type: EmailDTO["type"];
  body: EmailDTO["body"];
  readonly data: EmailDTO["data"];

  constructor(input: EmailDTO | InputEmailDTO) {
    this.id = "id" in input ? input.id : randomUUID();
    this.sender = input.sender;
    this.receiver = input.receiver;
    this.type = input.type;
    this.subject = this.getSubject(input.type);
    this.data = input.data;
    this.body = this.renderBody(input);
  }

  private renderBody(input: EmailDTO | InputEmailDTO): typeof this.body {
    return this.renderTemplate(input.body, this.convertToRecord(input.data));
  }

  private convertToRecord(
    inputData: EmailDTO["data"]
  ): Record<string, string> {
    return Object.keys(inputData).reduce((acc, key) => {
      acc[key] = String(inputData[key as keyof typeof inputData]);
      return acc;
    }, {} as Record<string, string>);
  }

  private renderTemplate(
    template: string,
    values: Record<string, string>
  ): string {
    return template.replace(/\$\{([^}]+)\}/g, (match, p1) => {
      return values[p1] !== undefined ? values[p1] : match;
    });
  }

  private getSubject(type: typeof this.type): typeof this.subject {
    switch (type) {
      case "SUCCESS":
        return `Vídeo processado com sucesso`;
      case "ERROR":
        return `Erro no processamento do vídeo`;
    }
  }
}
