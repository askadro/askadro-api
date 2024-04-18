import { ExecutionContext, Req, createParamDecorator } from "@nestjs/common";
import { I18n, I18nContext, I18nResolver } from "nestjs-i18n";
import { Injectable } from "@nestjs/common";


export const LanguageResolver = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    let userLanguage = request.headers["accept-language"] ?? "tr";
    return "tr";
  }
);