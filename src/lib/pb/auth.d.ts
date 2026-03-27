import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace foolsignup. */
export namespace foolsignup {

    /** Namespace auth. */
    namespace auth {

        /** Namespace v1. */
        namespace v1 {

            /** Represents an AuthService */
            class AuthService extends $protobuf.rpc.Service {

                /**
                 * Constructs a new AuthService service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Creates new AuthService service using the specified rpc implementation.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 * @returns RPC service. Useful where requests and/or responses are streamed.
                 */
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): AuthService;

                /**
                 * Calls GetCaptcha.
                 * @param request GetCaptchaRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GetCaptchaResponse
                 */
                public getCaptcha(request: foolsignup.auth.v1.IGetCaptchaRequest, callback: foolsignup.auth.v1.AuthService.GetCaptchaCallback): void;

                /**
                 * Calls GetCaptcha.
                 * @param request GetCaptchaRequest message or plain object
                 * @returns Promise
                 */
                public getCaptcha(request: foolsignup.auth.v1.IGetCaptchaRequest): Promise<foolsignup.auth.v1.GetCaptchaResponse>;

                /**
                 * Calls SendEmailCode.
                 * @param request SendEmailCodeRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and SendEmailCodeResponse
                 */
                public sendEmailCode(request: foolsignup.auth.v1.ISendEmailCodeRequest, callback: foolsignup.auth.v1.AuthService.SendEmailCodeCallback): void;

                /**
                 * Calls SendEmailCode.
                 * @param request SendEmailCodeRequest message or plain object
                 * @returns Promise
                 */
                public sendEmailCode(request: foolsignup.auth.v1.ISendEmailCodeRequest): Promise<foolsignup.auth.v1.SendEmailCodeResponse>;

                /**
                 * Calls Register.
                 * @param request RegisterRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and RegisterResponse
                 */
                public register(request: foolsignup.auth.v1.IRegisterRequest, callback: foolsignup.auth.v1.AuthService.RegisterCallback): void;

                /**
                 * Calls Register.
                 * @param request RegisterRequest message or plain object
                 * @returns Promise
                 */
                public register(request: foolsignup.auth.v1.IRegisterRequest): Promise<foolsignup.auth.v1.RegisterResponse>;

                /**
                 * Calls Login.
                 * @param request LoginRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and LoginResponse
                 */
                public login(request: foolsignup.auth.v1.ILoginRequest, callback: foolsignup.auth.v1.AuthService.LoginCallback): void;

                /**
                 * Calls Login.
                 * @param request LoginRequest message or plain object
                 * @returns Promise
                 */
                public login(request: foolsignup.auth.v1.ILoginRequest): Promise<foolsignup.auth.v1.LoginResponse>;

                /**
                 * Calls GetMe.
                 * @param request GetMeRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GetMeResponse
                 */
                public getMe(request: foolsignup.auth.v1.IGetMeRequest, callback: foolsignup.auth.v1.AuthService.GetMeCallback): void;

                /**
                 * Calls GetMe.
                 * @param request GetMeRequest message or plain object
                 * @returns Promise
                 */
                public getMe(request: foolsignup.auth.v1.IGetMeRequest): Promise<foolsignup.auth.v1.GetMeResponse>;

                /**
                 * Calls GetWebAuthnRegistrationOptions.
                 * @param request GetWebAuthnRegistrationOptionsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GetWebAuthnRegistrationOptionsResponse
                 */
                public getWebAuthnRegistrationOptions(request: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest, callback: foolsignup.auth.v1.AuthService.GetWebAuthnRegistrationOptionsCallback): void;

                /**
                 * Calls GetWebAuthnRegistrationOptions.
                 * @param request GetWebAuthnRegistrationOptionsRequest message or plain object
                 * @returns Promise
                 */
                public getWebAuthnRegistrationOptions(request: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest): Promise<foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse>;

                /**
                 * Calls VerifyWebAuthnRegistration.
                 * @param request VerifyWebAuthnRegistrationRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and VerifyWebAuthnRegistrationResponse
                 */
                public verifyWebAuthnRegistration(request: foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest, callback: foolsignup.auth.v1.AuthService.VerifyWebAuthnRegistrationCallback): void;

                /**
                 * Calls VerifyWebAuthnRegistration.
                 * @param request VerifyWebAuthnRegistrationRequest message or plain object
                 * @returns Promise
                 */
                public verifyWebAuthnRegistration(request: foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest): Promise<foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse>;

                /**
                 * Calls GetWebAuthnLoginOptions.
                 * @param request GetWebAuthnLoginOptionsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GetWebAuthnLoginOptionsResponse
                 */
                public getWebAuthnLoginOptions(request: foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest, callback: foolsignup.auth.v1.AuthService.GetWebAuthnLoginOptionsCallback): void;

                /**
                 * Calls GetWebAuthnLoginOptions.
                 * @param request GetWebAuthnLoginOptionsRequest message or plain object
                 * @returns Promise
                 */
                public getWebAuthnLoginOptions(request: foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest): Promise<foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse>;

                /**
                 * Calls VerifyWebAuthnLogin.
                 * @param request VerifyWebAuthnLoginRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and VerifyWebAuthnLoginResponse
                 */
                public verifyWebAuthnLogin(request: foolsignup.auth.v1.IVerifyWebAuthnLoginRequest, callback: foolsignup.auth.v1.AuthService.VerifyWebAuthnLoginCallback): void;

                /**
                 * Calls VerifyWebAuthnLogin.
                 * @param request VerifyWebAuthnLoginRequest message or plain object
                 * @returns Promise
                 */
                public verifyWebAuthnLogin(request: foolsignup.auth.v1.IVerifyWebAuthnLoginRequest): Promise<foolsignup.auth.v1.VerifyWebAuthnLoginResponse>;
            }

            namespace AuthService {

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getCaptcha}.
                 * @param error Error, if any
                 * @param [response] GetCaptchaResponse
                 */
                type GetCaptchaCallback = (error: (Error|null), response?: foolsignup.auth.v1.GetCaptchaResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#sendEmailCode}.
                 * @param error Error, if any
                 * @param [response] SendEmailCodeResponse
                 */
                type SendEmailCodeCallback = (error: (Error|null), response?: foolsignup.auth.v1.SendEmailCodeResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#register}.
                 * @param error Error, if any
                 * @param [response] RegisterResponse
                 */
                type RegisterCallback = (error: (Error|null), response?: foolsignup.auth.v1.RegisterResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#login}.
                 * @param error Error, if any
                 * @param [response] LoginResponse
                 */
                type LoginCallback = (error: (Error|null), response?: foolsignup.auth.v1.LoginResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getMe}.
                 * @param error Error, if any
                 * @param [response] GetMeResponse
                 */
                type GetMeCallback = (error: (Error|null), response?: foolsignup.auth.v1.GetMeResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getWebAuthnRegistrationOptions}.
                 * @param error Error, if any
                 * @param [response] GetWebAuthnRegistrationOptionsResponse
                 */
                type GetWebAuthnRegistrationOptionsCallback = (error: (Error|null), response?: foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#verifyWebAuthnRegistration}.
                 * @param error Error, if any
                 * @param [response] VerifyWebAuthnRegistrationResponse
                 */
                type VerifyWebAuthnRegistrationCallback = (error: (Error|null), response?: foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getWebAuthnLoginOptions}.
                 * @param error Error, if any
                 * @param [response] GetWebAuthnLoginOptionsResponse
                 */
                type GetWebAuthnLoginOptionsCallback = (error: (Error|null), response?: foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse) => void;

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#verifyWebAuthnLogin}.
                 * @param error Error, if any
                 * @param [response] VerifyWebAuthnLoginResponse
                 */
                type VerifyWebAuthnLoginCallback = (error: (Error|null), response?: foolsignup.auth.v1.VerifyWebAuthnLoginResponse) => void;
            }

            /** Properties of a GetCaptchaRequest. */
            interface IGetCaptchaRequest {
            }

            /** Represents a GetCaptchaRequest. */
            class GetCaptchaRequest implements IGetCaptchaRequest {

                /**
                 * Constructs a new GetCaptchaRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetCaptchaRequest);

                /**
                 * Creates a new GetCaptchaRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetCaptchaRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetCaptchaRequest): foolsignup.auth.v1.GetCaptchaRequest;

                /**
                 * Encodes the specified GetCaptchaRequest message. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaRequest.verify|verify} messages.
                 * @param message GetCaptchaRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetCaptchaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetCaptchaRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaRequest.verify|verify} messages.
                 * @param message GetCaptchaRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetCaptchaRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetCaptchaRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetCaptchaRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetCaptchaRequest;

                /**
                 * Decodes a GetCaptchaRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetCaptchaRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetCaptchaRequest;

                /**
                 * Verifies a GetCaptchaRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetCaptchaRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetCaptchaRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetCaptchaRequest;

                /**
                 * Creates a plain object from a GetCaptchaRequest message. Also converts values to other types if specified.
                 * @param message GetCaptchaRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetCaptchaRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetCaptchaRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetCaptchaRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetCaptchaResponse. */
            interface IGetCaptchaResponse {

                /** GetCaptchaResponse code */
                code?: (number|null);

                /** GetCaptchaResponse msg */
                msg?: (string|null);

                /** GetCaptchaResponse traceId */
                traceId?: (string|null);

                /** GetCaptchaResponse data */
                data?: (foolsignup.auth.v1.GetCaptchaResponse.IData|null);
            }

            /** Represents a GetCaptchaResponse. */
            class GetCaptchaResponse implements IGetCaptchaResponse {

                /**
                 * Constructs a new GetCaptchaResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetCaptchaResponse);

                /** GetCaptchaResponse code. */
                public code: number;

                /** GetCaptchaResponse msg. */
                public msg: string;

                /** GetCaptchaResponse traceId. */
                public traceId: string;

                /** GetCaptchaResponse data. */
                public data?: (foolsignup.auth.v1.GetCaptchaResponse.IData|null);

                /**
                 * Creates a new GetCaptchaResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetCaptchaResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetCaptchaResponse): foolsignup.auth.v1.GetCaptchaResponse;

                /**
                 * Encodes the specified GetCaptchaResponse message. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.verify|verify} messages.
                 * @param message GetCaptchaResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetCaptchaResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetCaptchaResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.verify|verify} messages.
                 * @param message GetCaptchaResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetCaptchaResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetCaptchaResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetCaptchaResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetCaptchaResponse;

                /**
                 * Decodes a GetCaptchaResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetCaptchaResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetCaptchaResponse;

                /**
                 * Verifies a GetCaptchaResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetCaptchaResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetCaptchaResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetCaptchaResponse;

                /**
                 * Creates a plain object from a GetCaptchaResponse message. Also converts values to other types if specified.
                 * @param message GetCaptchaResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetCaptchaResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetCaptchaResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetCaptchaResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace GetCaptchaResponse {

                /** Properties of a Data. */
                interface IData {

                    /** Data captchaKey */
                    captchaKey?: (string|null);

                    /** Data image */
                    image?: (string|null);
                }

                /** Represents a Data. */
                class Data implements IData {

                    /**
                     * Constructs a new Data.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: foolsignup.auth.v1.GetCaptchaResponse.IData);

                    /** Data captchaKey. */
                    public captchaKey: string;

                    /** Data image. */
                    public image: string;

                    /**
                     * Creates a new Data instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Data instance
                     */
                    public static create(properties?: foolsignup.auth.v1.GetCaptchaResponse.IData): foolsignup.auth.v1.GetCaptchaResponse.Data;

                    /**
                     * Encodes the specified Data message. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.Data.verify|verify} messages.
                     * @param message Data message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: foolsignup.auth.v1.GetCaptchaResponse.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Data message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.Data.verify|verify} messages.
                     * @param message Data message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: foolsignup.auth.v1.GetCaptchaResponse.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Data message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetCaptchaResponse.Data;

                    /**
                     * Decodes a Data message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetCaptchaResponse.Data;

                    /**
                     * Verifies a Data message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Data message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Data
                     */
                    public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetCaptchaResponse.Data;

                    /**
                     * Creates a plain object from a Data message. Also converts values to other types if specified.
                     * @param message Data
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: foolsignup.auth.v1.GetCaptchaResponse.Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Data to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Data
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a SendEmailCodeRequest. */
            interface ISendEmailCodeRequest {

                /** SendEmailCodeRequest email */
                email?: (string|null);

                /** SendEmailCodeRequest captchaKey */
                captchaKey?: (string|null);

                /** SendEmailCodeRequest captchaValue */
                captchaValue?: (string|null);
            }

            /** Represents a SendEmailCodeRequest. */
            class SendEmailCodeRequest implements ISendEmailCodeRequest {

                /**
                 * Constructs a new SendEmailCodeRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.ISendEmailCodeRequest);

                /** SendEmailCodeRequest email. */
                public email: string;

                /** SendEmailCodeRequest captchaKey. */
                public captchaKey: string;

                /** SendEmailCodeRequest captchaValue. */
                public captchaValue: string;

                /**
                 * Creates a new SendEmailCodeRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SendEmailCodeRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.ISendEmailCodeRequest): foolsignup.auth.v1.SendEmailCodeRequest;

                /**
                 * Encodes the specified SendEmailCodeRequest message. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeRequest.verify|verify} messages.
                 * @param message SendEmailCodeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.ISendEmailCodeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SendEmailCodeRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeRequest.verify|verify} messages.
                 * @param message SendEmailCodeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.ISendEmailCodeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SendEmailCodeRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SendEmailCodeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.SendEmailCodeRequest;

                /**
                 * Decodes a SendEmailCodeRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SendEmailCodeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.SendEmailCodeRequest;

                /**
                 * Verifies a SendEmailCodeRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SendEmailCodeRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SendEmailCodeRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.SendEmailCodeRequest;

                /**
                 * Creates a plain object from a SendEmailCodeRequest message. Also converts values to other types if specified.
                 * @param message SendEmailCodeRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.SendEmailCodeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SendEmailCodeRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SendEmailCodeRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SendEmailCodeResponse. */
            interface ISendEmailCodeResponse {

                /** SendEmailCodeResponse code */
                code?: (number|null);

                /** SendEmailCodeResponse msg */
                msg?: (string|null);

                /** SendEmailCodeResponse traceId */
                traceId?: (string|null);
            }

            /** Represents a SendEmailCodeResponse. */
            class SendEmailCodeResponse implements ISendEmailCodeResponse {

                /**
                 * Constructs a new SendEmailCodeResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.ISendEmailCodeResponse);

                /** SendEmailCodeResponse code. */
                public code: number;

                /** SendEmailCodeResponse msg. */
                public msg: string;

                /** SendEmailCodeResponse traceId. */
                public traceId: string;

                /**
                 * Creates a new SendEmailCodeResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SendEmailCodeResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.ISendEmailCodeResponse): foolsignup.auth.v1.SendEmailCodeResponse;

                /**
                 * Encodes the specified SendEmailCodeResponse message. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeResponse.verify|verify} messages.
                 * @param message SendEmailCodeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.ISendEmailCodeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SendEmailCodeResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeResponse.verify|verify} messages.
                 * @param message SendEmailCodeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.ISendEmailCodeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SendEmailCodeResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SendEmailCodeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.SendEmailCodeResponse;

                /**
                 * Decodes a SendEmailCodeResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SendEmailCodeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.SendEmailCodeResponse;

                /**
                 * Verifies a SendEmailCodeResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SendEmailCodeResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SendEmailCodeResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.SendEmailCodeResponse;

                /**
                 * Creates a plain object from a SendEmailCodeResponse message. Also converts values to other types if specified.
                 * @param message SendEmailCodeResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.SendEmailCodeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SendEmailCodeResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SendEmailCodeResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RegisterRequest. */
            interface IRegisterRequest {

                /** RegisterRequest username */
                username?: (string|null);

                /** RegisterRequest email */
                email?: (string|null);

                /** RegisterRequest age */
                age?: (number|null);

                /** RegisterRequest password */
                password?: (string|null);

                /** RegisterRequest code */
                code?: (string|null);

                /** RegisterRequest turnstileToken */
                turnstileToken?: (string|null);
            }

            /** Represents a RegisterRequest. */
            class RegisterRequest implements IRegisterRequest {

                /**
                 * Constructs a new RegisterRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IRegisterRequest);

                /** RegisterRequest username. */
                public username: string;

                /** RegisterRequest email. */
                public email: string;

                /** RegisterRequest age. */
                public age: number;

                /** RegisterRequest password. */
                public password: string;

                /** RegisterRequest code. */
                public code: string;

                /** RegisterRequest turnstileToken. */
                public turnstileToken: string;

                /**
                 * Creates a new RegisterRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IRegisterRequest): foolsignup.auth.v1.RegisterRequest;

                /**
                 * Encodes the specified RegisterRequest message. Does not implicitly {@link foolsignup.auth.v1.RegisterRequest.verify|verify} messages.
                 * @param message RegisterRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.RegisterRequest.verify|verify} messages.
                 * @param message RegisterRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RegisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.RegisterRequest;

                /**
                 * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RegisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.RegisterRequest;

                /**
                 * Verifies a RegisterRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.RegisterRequest;

                /**
                 * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
                 * @param message RegisterRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.RegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RegisterRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RegisterResponse. */
            interface IRegisterResponse {

                /** RegisterResponse code */
                code?: (number|null);

                /** RegisterResponse msg */
                msg?: (string|null);

                /** RegisterResponse traceId */
                traceId?: (string|null);
            }

            /** Represents a RegisterResponse. */
            class RegisterResponse implements IRegisterResponse {

                /**
                 * Constructs a new RegisterResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IRegisterResponse);

                /** RegisterResponse code. */
                public code: number;

                /** RegisterResponse msg. */
                public msg: string;

                /** RegisterResponse traceId. */
                public traceId: string;

                /**
                 * Creates a new RegisterResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IRegisterResponse): foolsignup.auth.v1.RegisterResponse;

                /**
                 * Encodes the specified RegisterResponse message. Does not implicitly {@link foolsignup.auth.v1.RegisterResponse.verify|verify} messages.
                 * @param message RegisterResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.RegisterResponse.verify|verify} messages.
                 * @param message RegisterResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RegisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.RegisterResponse;

                /**
                 * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RegisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.RegisterResponse;

                /**
                 * Verifies a RegisterResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.RegisterResponse;

                /**
                 * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
                 * @param message RegisterResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.RegisterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RegisterResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a LoginRequest. */
            interface ILoginRequest {

                /** LoginRequest username */
                username?: (string|null);

                /** LoginRequest password */
                password?: (string|null);
            }

            /** Represents a LoginRequest. */
            class LoginRequest implements ILoginRequest {

                /**
                 * Constructs a new LoginRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.ILoginRequest);

                /** LoginRequest username. */
                public username: string;

                /** LoginRequest password. */
                public password: string;

                /**
                 * Creates a new LoginRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LoginRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.ILoginRequest): foolsignup.auth.v1.LoginRequest;

                /**
                 * Encodes the specified LoginRequest message. Does not implicitly {@link foolsignup.auth.v1.LoginRequest.verify|verify} messages.
                 * @param message LoginRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.LoginRequest.verify|verify} messages.
                 * @param message LoginRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LoginRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.LoginRequest;

                /**
                 * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.LoginRequest;

                /**
                 * Verifies a LoginRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LoginRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.LoginRequest;

                /**
                 * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
                 * @param message LoginRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LoginRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for LoginRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a LoginResponse. */
            interface ILoginResponse {

                /** LoginResponse code */
                code?: (number|null);

                /** LoginResponse msg */
                msg?: (string|null);

                /** LoginResponse traceId */
                traceId?: (string|null);

                /** LoginResponse data */
                data?: (foolsignup.auth.v1.LoginResponse.IData|null);
            }

            /** Represents a LoginResponse. */
            class LoginResponse implements ILoginResponse {

                /**
                 * Constructs a new LoginResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.ILoginResponse);

                /** LoginResponse code. */
                public code: number;

                /** LoginResponse msg. */
                public msg: string;

                /** LoginResponse traceId. */
                public traceId: string;

                /** LoginResponse data. */
                public data?: (foolsignup.auth.v1.LoginResponse.IData|null);

                /**
                 * Creates a new LoginResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LoginResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.ILoginResponse): foolsignup.auth.v1.LoginResponse;

                /**
                 * Encodes the specified LoginResponse message. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.verify|verify} messages.
                 * @param message LoginResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.verify|verify} messages.
                 * @param message LoginResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LoginResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.LoginResponse;

                /**
                 * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.LoginResponse;

                /**
                 * Verifies a LoginResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LoginResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.LoginResponse;

                /**
                 * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
                 * @param message LoginResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LoginResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for LoginResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace LoginResponse {

                /** Properties of a Data. */
                interface IData {

                    /** Data require_2fa */
                    require_2fa?: (boolean|null);

                    /** Data setup_2fa */
                    setup_2fa?: (boolean|null);

                    /** Data tempToken */
                    tempToken?: (string|null);
                }

                /** Represents a Data. */
                class Data implements IData {

                    /**
                     * Constructs a new Data.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: foolsignup.auth.v1.LoginResponse.IData);

                    /** Data require_2fa. */
                    public require_2fa: boolean;

                    /** Data setup_2fa. */
                    public setup_2fa: boolean;

                    /** Data tempToken. */
                    public tempToken: string;

                    /**
                     * Creates a new Data instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Data instance
                     */
                    public static create(properties?: foolsignup.auth.v1.LoginResponse.IData): foolsignup.auth.v1.LoginResponse.Data;

                    /**
                     * Encodes the specified Data message. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.Data.verify|verify} messages.
                     * @param message Data message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: foolsignup.auth.v1.LoginResponse.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Data message, length delimited. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.Data.verify|verify} messages.
                     * @param message Data message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: foolsignup.auth.v1.LoginResponse.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Data message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.LoginResponse.Data;

                    /**
                     * Decodes a Data message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.LoginResponse.Data;

                    /**
                     * Verifies a Data message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Data message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Data
                     */
                    public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.LoginResponse.Data;

                    /**
                     * Creates a plain object from a Data message. Also converts values to other types if specified.
                     * @param message Data
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: foolsignup.auth.v1.LoginResponse.Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Data to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Data
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a GetWebAuthnRegistrationOptionsRequest. */
            interface IGetWebAuthnRegistrationOptionsRequest {
            }

            /** Represents a GetWebAuthnRegistrationOptionsRequest. */
            class GetWebAuthnRegistrationOptionsRequest implements IGetWebAuthnRegistrationOptionsRequest {

                /**
                 * Constructs a new GetWebAuthnRegistrationOptionsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest);

                /**
                 * Creates a new GetWebAuthnRegistrationOptionsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetWebAuthnRegistrationOptionsRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest;

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsRequest message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest.verify|verify} messages.
                 * @param message GetWebAuthnRegistrationOptionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest.verify|verify} messages.
                 * @param message GetWebAuthnRegistrationOptionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetWebAuthnRegistrationOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest;

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetWebAuthnRegistrationOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest;

                /**
                 * Verifies a GetWebAuthnRegistrationOptionsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetWebAuthnRegistrationOptionsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetWebAuthnRegistrationOptionsRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest;

                /**
                 * Creates a plain object from a GetWebAuthnRegistrationOptionsRequest message. Also converts values to other types if specified.
                 * @param message GetWebAuthnRegistrationOptionsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetWebAuthnRegistrationOptionsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetWebAuthnRegistrationOptionsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetWebAuthnRegistrationOptionsResponse. */
            interface IGetWebAuthnRegistrationOptionsResponse {

                /** GetWebAuthnRegistrationOptionsResponse code */
                code?: (number|null);

                /** GetWebAuthnRegistrationOptionsResponse msg */
                msg?: (string|null);

                /** GetWebAuthnRegistrationOptionsResponse optionsJson */
                optionsJson?: (string|null);

                /** GetWebAuthnRegistrationOptionsResponse traceId */
                traceId?: (string|null);
            }

            /** Represents a GetWebAuthnRegistrationOptionsResponse. */
            class GetWebAuthnRegistrationOptionsResponse implements IGetWebAuthnRegistrationOptionsResponse {

                /**
                 * Constructs a new GetWebAuthnRegistrationOptionsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse);

                /** GetWebAuthnRegistrationOptionsResponse code. */
                public code: number;

                /** GetWebAuthnRegistrationOptionsResponse msg. */
                public msg: string;

                /** GetWebAuthnRegistrationOptionsResponse optionsJson. */
                public optionsJson: string;

                /** GetWebAuthnRegistrationOptionsResponse traceId. */
                public traceId: string;

                /**
                 * Creates a new GetWebAuthnRegistrationOptionsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetWebAuthnRegistrationOptionsResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse;

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsResponse message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse.verify|verify} messages.
                 * @param message GetWebAuthnRegistrationOptionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse.verify|verify} messages.
                 * @param message GetWebAuthnRegistrationOptionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetWebAuthnRegistrationOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse;

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetWebAuthnRegistrationOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse;

                /**
                 * Verifies a GetWebAuthnRegistrationOptionsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetWebAuthnRegistrationOptionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetWebAuthnRegistrationOptionsResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse;

                /**
                 * Creates a plain object from a GetWebAuthnRegistrationOptionsResponse message. Also converts values to other types if specified.
                 * @param message GetWebAuthnRegistrationOptionsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetWebAuthnRegistrationOptionsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetWebAuthnRegistrationOptionsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a VerifyWebAuthnRegistrationRequest. */
            interface IVerifyWebAuthnRegistrationRequest {

                /** VerifyWebAuthnRegistrationRequest credentialJson */
                credentialJson?: (string|null);
            }

            /** Represents a VerifyWebAuthnRegistrationRequest. */
            class VerifyWebAuthnRegistrationRequest implements IVerifyWebAuthnRegistrationRequest {

                /**
                 * Constructs a new VerifyWebAuthnRegistrationRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest);

                /** VerifyWebAuthnRegistrationRequest credentialJson. */
                public credentialJson: string;

                /**
                 * Creates a new VerifyWebAuthnRegistrationRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns VerifyWebAuthnRegistrationRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest): foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest;

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationRequest message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest.verify|verify} messages.
                 * @param message VerifyWebAuthnRegistrationRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest.verify|verify} messages.
                 * @param message VerifyWebAuthnRegistrationRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a VerifyWebAuthnRegistrationRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns VerifyWebAuthnRegistrationRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest;

                /**
                 * Decodes a VerifyWebAuthnRegistrationRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns VerifyWebAuthnRegistrationRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest;

                /**
                 * Verifies a VerifyWebAuthnRegistrationRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a VerifyWebAuthnRegistrationRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns VerifyWebAuthnRegistrationRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest;

                /**
                 * Creates a plain object from a VerifyWebAuthnRegistrationRequest message. Also converts values to other types if specified.
                 * @param message VerifyWebAuthnRegistrationRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this VerifyWebAuthnRegistrationRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for VerifyWebAuthnRegistrationRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a VerifyWebAuthnRegistrationResponse. */
            interface IVerifyWebAuthnRegistrationResponse {

                /** VerifyWebAuthnRegistrationResponse code */
                code?: (number|null);

                /** VerifyWebAuthnRegistrationResponse msg */
                msg?: (string|null);

                /** VerifyWebAuthnRegistrationResponse traceId */
                traceId?: (string|null);
            }

            /** Represents a VerifyWebAuthnRegistrationResponse. */
            class VerifyWebAuthnRegistrationResponse implements IVerifyWebAuthnRegistrationResponse {

                /**
                 * Constructs a new VerifyWebAuthnRegistrationResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse);

                /** VerifyWebAuthnRegistrationResponse code. */
                public code: number;

                /** VerifyWebAuthnRegistrationResponse msg. */
                public msg: string;

                /** VerifyWebAuthnRegistrationResponse traceId. */
                public traceId: string;

                /**
                 * Creates a new VerifyWebAuthnRegistrationResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns VerifyWebAuthnRegistrationResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse): foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse;

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationResponse message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse.verify|verify} messages.
                 * @param message VerifyWebAuthnRegistrationResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse.verify|verify} messages.
                 * @param message VerifyWebAuthnRegistrationResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a VerifyWebAuthnRegistrationResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns VerifyWebAuthnRegistrationResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse;

                /**
                 * Decodes a VerifyWebAuthnRegistrationResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns VerifyWebAuthnRegistrationResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse;

                /**
                 * Verifies a VerifyWebAuthnRegistrationResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a VerifyWebAuthnRegistrationResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns VerifyWebAuthnRegistrationResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse;

                /**
                 * Creates a plain object from a VerifyWebAuthnRegistrationResponse message. Also converts values to other types if specified.
                 * @param message VerifyWebAuthnRegistrationResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this VerifyWebAuthnRegistrationResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for VerifyWebAuthnRegistrationResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetWebAuthnLoginOptionsRequest. */
            interface IGetWebAuthnLoginOptionsRequest {

                /** GetWebAuthnLoginOptionsRequest tempToken */
                tempToken?: (string|null);
            }

            /** Represents a GetWebAuthnLoginOptionsRequest. */
            class GetWebAuthnLoginOptionsRequest implements IGetWebAuthnLoginOptionsRequest {

                /**
                 * Constructs a new GetWebAuthnLoginOptionsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest);

                /** GetWebAuthnLoginOptionsRequest tempToken. */
                public tempToken: string;

                /**
                 * Creates a new GetWebAuthnLoginOptionsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetWebAuthnLoginOptionsRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest): foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest;

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsRequest message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest.verify|verify} messages.
                 * @param message GetWebAuthnLoginOptionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest.verify|verify} messages.
                 * @param message GetWebAuthnLoginOptionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetWebAuthnLoginOptionsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetWebAuthnLoginOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest;

                /**
                 * Decodes a GetWebAuthnLoginOptionsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetWebAuthnLoginOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest;

                /**
                 * Verifies a GetWebAuthnLoginOptionsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetWebAuthnLoginOptionsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetWebAuthnLoginOptionsRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest;

                /**
                 * Creates a plain object from a GetWebAuthnLoginOptionsRequest message. Also converts values to other types if specified.
                 * @param message GetWebAuthnLoginOptionsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetWebAuthnLoginOptionsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetWebAuthnLoginOptionsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetWebAuthnLoginOptionsResponse. */
            interface IGetWebAuthnLoginOptionsResponse {

                /** GetWebAuthnLoginOptionsResponse code */
                code?: (number|null);

                /** GetWebAuthnLoginOptionsResponse msg */
                msg?: (string|null);

                /** GetWebAuthnLoginOptionsResponse optionsJson */
                optionsJson?: (string|null);

                /** GetWebAuthnLoginOptionsResponse traceId */
                traceId?: (string|null);
            }

            /** Represents a GetWebAuthnLoginOptionsResponse. */
            class GetWebAuthnLoginOptionsResponse implements IGetWebAuthnLoginOptionsResponse {

                /**
                 * Constructs a new GetWebAuthnLoginOptionsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse);

                /** GetWebAuthnLoginOptionsResponse code. */
                public code: number;

                /** GetWebAuthnLoginOptionsResponse msg. */
                public msg: string;

                /** GetWebAuthnLoginOptionsResponse optionsJson. */
                public optionsJson: string;

                /** GetWebAuthnLoginOptionsResponse traceId. */
                public traceId: string;

                /**
                 * Creates a new GetWebAuthnLoginOptionsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetWebAuthnLoginOptionsResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse): foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse;

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsResponse message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse.verify|verify} messages.
                 * @param message GetWebAuthnLoginOptionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse.verify|verify} messages.
                 * @param message GetWebAuthnLoginOptionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetWebAuthnLoginOptionsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetWebAuthnLoginOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse;

                /**
                 * Decodes a GetWebAuthnLoginOptionsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetWebAuthnLoginOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse;

                /**
                 * Verifies a GetWebAuthnLoginOptionsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetWebAuthnLoginOptionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetWebAuthnLoginOptionsResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse;

                /**
                 * Creates a plain object from a GetWebAuthnLoginOptionsResponse message. Also converts values to other types if specified.
                 * @param message GetWebAuthnLoginOptionsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetWebAuthnLoginOptionsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetWebAuthnLoginOptionsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a VerifyWebAuthnLoginRequest. */
            interface IVerifyWebAuthnLoginRequest {

                /** VerifyWebAuthnLoginRequest tempToken */
                tempToken?: (string|null);

                /** VerifyWebAuthnLoginRequest credentialJson */
                credentialJson?: (string|null);
            }

            /** Represents a VerifyWebAuthnLoginRequest. */
            class VerifyWebAuthnLoginRequest implements IVerifyWebAuthnLoginRequest {

                /**
                 * Constructs a new VerifyWebAuthnLoginRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IVerifyWebAuthnLoginRequest);

                /** VerifyWebAuthnLoginRequest tempToken. */
                public tempToken: string;

                /** VerifyWebAuthnLoginRequest credentialJson. */
                public credentialJson: string;

                /**
                 * Creates a new VerifyWebAuthnLoginRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns VerifyWebAuthnLoginRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IVerifyWebAuthnLoginRequest): foolsignup.auth.v1.VerifyWebAuthnLoginRequest;

                /**
                 * Encodes the specified VerifyWebAuthnLoginRequest message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginRequest.verify|verify} messages.
                 * @param message VerifyWebAuthnLoginRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IVerifyWebAuthnLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified VerifyWebAuthnLoginRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginRequest.verify|verify} messages.
                 * @param message VerifyWebAuthnLoginRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IVerifyWebAuthnLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a VerifyWebAuthnLoginRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns VerifyWebAuthnLoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.VerifyWebAuthnLoginRequest;

                /**
                 * Decodes a VerifyWebAuthnLoginRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns VerifyWebAuthnLoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.VerifyWebAuthnLoginRequest;

                /**
                 * Verifies a VerifyWebAuthnLoginRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a VerifyWebAuthnLoginRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns VerifyWebAuthnLoginRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.VerifyWebAuthnLoginRequest;

                /**
                 * Creates a plain object from a VerifyWebAuthnLoginRequest message. Also converts values to other types if specified.
                 * @param message VerifyWebAuthnLoginRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.VerifyWebAuthnLoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this VerifyWebAuthnLoginRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for VerifyWebAuthnLoginRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a VerifyWebAuthnLoginResponse. */
            interface IVerifyWebAuthnLoginResponse {

                /** VerifyWebAuthnLoginResponse code */
                code?: (number|null);

                /** VerifyWebAuthnLoginResponse msg */
                msg?: (string|null);

                /** VerifyWebAuthnLoginResponse traceId */
                traceId?: (string|null);
            }

            /** Represents a VerifyWebAuthnLoginResponse. */
            class VerifyWebAuthnLoginResponse implements IVerifyWebAuthnLoginResponse {

                /**
                 * Constructs a new VerifyWebAuthnLoginResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IVerifyWebAuthnLoginResponse);

                /** VerifyWebAuthnLoginResponse code. */
                public code: number;

                /** VerifyWebAuthnLoginResponse msg. */
                public msg: string;

                /** VerifyWebAuthnLoginResponse traceId. */
                public traceId: string;

                /**
                 * Creates a new VerifyWebAuthnLoginResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns VerifyWebAuthnLoginResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IVerifyWebAuthnLoginResponse): foolsignup.auth.v1.VerifyWebAuthnLoginResponse;

                /**
                 * Encodes the specified VerifyWebAuthnLoginResponse message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginResponse.verify|verify} messages.
                 * @param message VerifyWebAuthnLoginResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IVerifyWebAuthnLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified VerifyWebAuthnLoginResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginResponse.verify|verify} messages.
                 * @param message VerifyWebAuthnLoginResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IVerifyWebAuthnLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a VerifyWebAuthnLoginResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns VerifyWebAuthnLoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.VerifyWebAuthnLoginResponse;

                /**
                 * Decodes a VerifyWebAuthnLoginResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns VerifyWebAuthnLoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.VerifyWebAuthnLoginResponse;

                /**
                 * Verifies a VerifyWebAuthnLoginResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a VerifyWebAuthnLoginResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns VerifyWebAuthnLoginResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.VerifyWebAuthnLoginResponse;

                /**
                 * Creates a plain object from a VerifyWebAuthnLoginResponse message. Also converts values to other types if specified.
                 * @param message VerifyWebAuthnLoginResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.VerifyWebAuthnLoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this VerifyWebAuthnLoginResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for VerifyWebAuthnLoginResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetMeRequest. */
            interface IGetMeRequest {
            }

            /** Represents a GetMeRequest. */
            class GetMeRequest implements IGetMeRequest {

                /**
                 * Constructs a new GetMeRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetMeRequest);

                /**
                 * Creates a new GetMeRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetMeRequest instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetMeRequest): foolsignup.auth.v1.GetMeRequest;

                /**
                 * Encodes the specified GetMeRequest message. Does not implicitly {@link foolsignup.auth.v1.GetMeRequest.verify|verify} messages.
                 * @param message GetMeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetMeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetMeRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetMeRequest.verify|verify} messages.
                 * @param message GetMeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetMeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetMeRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetMeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetMeRequest;

                /**
                 * Decodes a GetMeRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetMeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetMeRequest;

                /**
                 * Verifies a GetMeRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetMeRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetMeRequest
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetMeRequest;

                /**
                 * Creates a plain object from a GetMeRequest message. Also converts values to other types if specified.
                 * @param message GetMeRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetMeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetMeRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetMeRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetMeResponse. */
            interface IGetMeResponse {

                /** GetMeResponse code */
                code?: (number|null);

                /** GetMeResponse msg */
                msg?: (string|null);

                /** GetMeResponse traceId */
                traceId?: (string|null);

                /** GetMeResponse data */
                data?: (foolsignup.auth.v1.GetMeResponse.IData|null);
            }

            /** Represents a GetMeResponse. */
            class GetMeResponse implements IGetMeResponse {

                /**
                 * Constructs a new GetMeResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: foolsignup.auth.v1.IGetMeResponse);

                /** GetMeResponse code. */
                public code: number;

                /** GetMeResponse msg. */
                public msg: string;

                /** GetMeResponse traceId. */
                public traceId: string;

                /** GetMeResponse data. */
                public data?: (foolsignup.auth.v1.GetMeResponse.IData|null);

                /**
                 * Creates a new GetMeResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetMeResponse instance
                 */
                public static create(properties?: foolsignup.auth.v1.IGetMeResponse): foolsignup.auth.v1.GetMeResponse;

                /**
                 * Encodes the specified GetMeResponse message. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.verify|verify} messages.
                 * @param message GetMeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: foolsignup.auth.v1.IGetMeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetMeResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.verify|verify} messages.
                 * @param message GetMeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: foolsignup.auth.v1.IGetMeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetMeResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetMeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetMeResponse;

                /**
                 * Decodes a GetMeResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetMeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetMeResponse;

                /**
                 * Verifies a GetMeResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetMeResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetMeResponse
                 */
                public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetMeResponse;

                /**
                 * Creates a plain object from a GetMeResponse message. Also converts values to other types if specified.
                 * @param message GetMeResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: foolsignup.auth.v1.GetMeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetMeResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetMeResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace GetMeResponse {

                /** Properties of a Data. */
                interface IData {

                    /** Data username */
                    username?: (string|null);

                    /** Data email */
                    email?: (string|null);
                }

                /** Represents a Data. */
                class Data implements IData {

                    /**
                     * Constructs a new Data.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: foolsignup.auth.v1.GetMeResponse.IData);

                    /** Data username. */
                    public username: string;

                    /** Data email. */
                    public email: string;

                    /**
                     * Creates a new Data instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Data instance
                     */
                    public static create(properties?: foolsignup.auth.v1.GetMeResponse.IData): foolsignup.auth.v1.GetMeResponse.Data;

                    /**
                     * Encodes the specified Data message. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.Data.verify|verify} messages.
                     * @param message Data message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: foolsignup.auth.v1.GetMeResponse.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Data message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.Data.verify|verify} messages.
                     * @param message Data message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: foolsignup.auth.v1.GetMeResponse.IData, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Data message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): foolsignup.auth.v1.GetMeResponse.Data;

                    /**
                     * Decodes a Data message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): foolsignup.auth.v1.GetMeResponse.Data;

                    /**
                     * Verifies a Data message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Data message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Data
                     */
                    public static fromObject(object: { [k: string]: any }): foolsignup.auth.v1.GetMeResponse.Data;

                    /**
                     * Creates a plain object from a Data message. Also converts values to other types if specified.
                     * @param message Data
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: foolsignup.auth.v1.GetMeResponse.Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Data to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Data
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }
        }
    }
}
