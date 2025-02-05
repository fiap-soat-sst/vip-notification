import { describe, expect, it, vi, beforeEach, Mock } from "vitest";
import { EmailAdapter } from "../../src/External/Email/EmailAdapter";
import { EmailDTO } from "../../src/Entities/DTOs/Email.dto";
import nodemailer from "nodemailer";
import { Either, isLeft, isRight, Left, Right } from "../../src/@Shared/Either";

vi.mock("nodemailer");

describe("EmailAdapter", () => {
  let emailAdapter: EmailAdapter;
  let email: EmailDTO;
  let sendMailMock: Mock;

  beforeEach(() => {
    email = {
      id: "email123",
      sender: "sender@example.com",
      receiver: "receiver@example.com",
      subject: "Test Subject",
      body: "<p>Test Body</p>",
      type: "SUCCESS",
      data: {
        urlVideo: "http://example.com/video",
        videoTitle: "Test Video",
      },
    };

    sendMailMock = vi.fn().mockResolvedValue({
      accepted: ["receiver@example.com"],
      rejected: [],
      response: "Email sent successfully",
    });

    (nodemailer.createTransport as Mock).mockReturnValue({
      sendMail: sendMailMock,
    });
    emailAdapter = new EmailAdapter();
  });

  it("should send an email successfully", async () => {
    const result = await emailAdapter.sendEmail(email);

    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      expect(result.value).toBe("Email sent successfully");
    }
  });

  it("should return an error if email sending fails", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("Failed to send email"));

    const result = await emailAdapter.sendEmail(email);

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.value.message).toBe(
        "Error sending email, Failed to send email"
      );
    }
  });

  it("should return an error if email is rejected", async () => {
    sendMailMock.mockResolvedValueOnce({
      accepted: [],
      rejected: ["receiver@example.com"],
      response: "Email rejected",
    });

    const result = await emailAdapter.sendEmail(email);

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.value.message).toBe(
        "Error sending email, receiver@example.com"
      );
    }
  });

  it("should return an error if email is rejected", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("Failed to send email"));

    const result = await emailAdapter.sendEmail(email);

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.value.message).toBe(
        "Error sending email, Failed to send email"
      );
    }
  });
});
