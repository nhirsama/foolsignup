/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const foolsignup = $root.foolsignup = (() => {

    /**
     * Namespace foolsignup.
     * @exports foolsignup
     * @namespace
     */
    const foolsignup = {};

    foolsignup.auth = (function() {

        /**
         * Namespace auth.
         * @memberof foolsignup
         * @namespace
         */
        const auth = {};

        auth.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof foolsignup.auth
             * @namespace
             */
            const v1 = {};

            v1.AuthService = (function() {

                /**
                 * Constructs a new AuthService service.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents an AuthService
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function AuthService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (AuthService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AuthService;

                /**
                 * Creates new AuthService service using the specified rpc implementation.
                 * @function create
                 * @memberof foolsignup.auth.v1.AuthService
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {AuthService} RPC service. Useful where requests and/or responses are streamed.
                 */
                AuthService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getCaptcha}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef GetCaptchaCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.GetCaptchaResponse} [response] GetCaptchaResponse
                 */

                /**
                 * Calls GetCaptcha.
                 * @function getCaptcha
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetCaptchaRequest} request GetCaptchaRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.GetCaptchaCallback} callback Node-style callback called with the error, if any, and GetCaptchaResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.getCaptcha = function getCaptcha(request, callback) {
                    return this.rpcCall(getCaptcha, $root.foolsignup.auth.v1.GetCaptchaRequest, $root.foolsignup.auth.v1.GetCaptchaResponse, request, callback);
                }, "name", { value: "GetCaptcha" });

                /**
                 * Calls GetCaptcha.
                 * @function getCaptcha
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetCaptchaRequest} request GetCaptchaRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.GetCaptchaResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#sendEmailCode}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef SendEmailCodeCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.SendEmailCodeResponse} [response] SendEmailCodeResponse
                 */

                /**
                 * Calls SendEmailCode.
                 * @function sendEmailCode
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.ISendEmailCodeRequest} request SendEmailCodeRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.SendEmailCodeCallback} callback Node-style callback called with the error, if any, and SendEmailCodeResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.sendEmailCode = function sendEmailCode(request, callback) {
                    return this.rpcCall(sendEmailCode, $root.foolsignup.auth.v1.SendEmailCodeRequest, $root.foolsignup.auth.v1.SendEmailCodeResponse, request, callback);
                }, "name", { value: "SendEmailCode" });

                /**
                 * Calls SendEmailCode.
                 * @function sendEmailCode
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.ISendEmailCodeRequest} request SendEmailCodeRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.SendEmailCodeResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#register}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef RegisterCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.RegisterResponse} [response] RegisterResponse
                 */

                /**
                 * Calls Register.
                 * @function register
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IRegisterRequest} request RegisterRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.RegisterCallback} callback Node-style callback called with the error, if any, and RegisterResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.register = function register(request, callback) {
                    return this.rpcCall(register, $root.foolsignup.auth.v1.RegisterRequest, $root.foolsignup.auth.v1.RegisterResponse, request, callback);
                }, "name", { value: "Register" });

                /**
                 * Calls Register.
                 * @function register
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IRegisterRequest} request RegisterRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.RegisterResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#login}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef LoginCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.LoginResponse} [response] LoginResponse
                 */

                /**
                 * Calls Login.
                 * @function login
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.ILoginRequest} request LoginRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.LoginCallback} callback Node-style callback called with the error, if any, and LoginResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.login = function login(request, callback) {
                    return this.rpcCall(login, $root.foolsignup.auth.v1.LoginRequest, $root.foolsignup.auth.v1.LoginResponse, request, callback);
                }, "name", { value: "Login" });

                /**
                 * Calls Login.
                 * @function login
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.ILoginRequest} request LoginRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.LoginResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getMe}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef GetMeCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.GetMeResponse} [response] GetMeResponse
                 */

                /**
                 * Calls GetMe.
                 * @function getMe
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetMeRequest} request GetMeRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.GetMeCallback} callback Node-style callback called with the error, if any, and GetMeResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.getMe = function getMe(request, callback) {
                    return this.rpcCall(getMe, $root.foolsignup.auth.v1.GetMeRequest, $root.foolsignup.auth.v1.GetMeResponse, request, callback);
                }, "name", { value: "GetMe" });

                /**
                 * Calls GetMe.
                 * @function getMe
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetMeRequest} request GetMeRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.GetMeResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getWebAuthnRegistrationOptions}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef GetWebAuthnRegistrationOptionsCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse} [response] GetWebAuthnRegistrationOptionsResponse
                 */

                /**
                 * Calls GetWebAuthnRegistrationOptions.
                 * @function getWebAuthnRegistrationOptions
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest} request GetWebAuthnRegistrationOptionsRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.GetWebAuthnRegistrationOptionsCallback} callback Node-style callback called with the error, if any, and GetWebAuthnRegistrationOptionsResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.getWebAuthnRegistrationOptions = function getWebAuthnRegistrationOptions(request, callback) {
                    return this.rpcCall(getWebAuthnRegistrationOptions, $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest, $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse, request, callback);
                }, "name", { value: "GetWebAuthnRegistrationOptions" });

                /**
                 * Calls GetWebAuthnRegistrationOptions.
                 * @function getWebAuthnRegistrationOptions
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest} request GetWebAuthnRegistrationOptionsRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#verifyWebAuthnRegistration}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef VerifyWebAuthnRegistrationCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse} [response] VerifyWebAuthnRegistrationResponse
                 */

                /**
                 * Calls VerifyWebAuthnRegistration.
                 * @function verifyWebAuthnRegistration
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest} request VerifyWebAuthnRegistrationRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.VerifyWebAuthnRegistrationCallback} callback Node-style callback called with the error, if any, and VerifyWebAuthnRegistrationResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.verifyWebAuthnRegistration = function verifyWebAuthnRegistration(request, callback) {
                    return this.rpcCall(verifyWebAuthnRegistration, $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest, $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse, request, callback);
                }, "name", { value: "VerifyWebAuthnRegistration" });

                /**
                 * Calls VerifyWebAuthnRegistration.
                 * @function verifyWebAuthnRegistration
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest} request VerifyWebAuthnRegistrationRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#getWebAuthnLoginOptions}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef GetWebAuthnLoginOptionsCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse} [response] GetWebAuthnLoginOptionsResponse
                 */

                /**
                 * Calls GetWebAuthnLoginOptions.
                 * @function getWebAuthnLoginOptions
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest} request GetWebAuthnLoginOptionsRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.GetWebAuthnLoginOptionsCallback} callback Node-style callback called with the error, if any, and GetWebAuthnLoginOptionsResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.getWebAuthnLoginOptions = function getWebAuthnLoginOptions(request, callback) {
                    return this.rpcCall(getWebAuthnLoginOptions, $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest, $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse, request, callback);
                }, "name", { value: "GetWebAuthnLoginOptions" });

                /**
                 * Calls GetWebAuthnLoginOptions.
                 * @function getWebAuthnLoginOptions
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest} request GetWebAuthnLoginOptionsRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link foolsignup.auth.v1.AuthService#verifyWebAuthnLogin}.
                 * @memberof foolsignup.auth.v1.AuthService
                 * @typedef VerifyWebAuthnLoginCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {foolsignup.auth.v1.VerifyWebAuthnLoginResponse} [response] VerifyWebAuthnLoginResponse
                 */

                /**
                 * Calls VerifyWebAuthnLogin.
                 * @function verifyWebAuthnLogin
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginRequest} request VerifyWebAuthnLoginRequest message or plain object
                 * @param {foolsignup.auth.v1.AuthService.VerifyWebAuthnLoginCallback} callback Node-style callback called with the error, if any, and VerifyWebAuthnLoginResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(AuthService.prototype.verifyWebAuthnLogin = function verifyWebAuthnLogin(request, callback) {
                    return this.rpcCall(verifyWebAuthnLogin, $root.foolsignup.auth.v1.VerifyWebAuthnLoginRequest, $root.foolsignup.auth.v1.VerifyWebAuthnLoginResponse, request, callback);
                }, "name", { value: "VerifyWebAuthnLogin" });

                /**
                 * Calls VerifyWebAuthnLogin.
                 * @function verifyWebAuthnLogin
                 * @memberof foolsignup.auth.v1.AuthService
                 * @instance
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginRequest} request VerifyWebAuthnLoginRequest message or plain object
                 * @returns {Promise<foolsignup.auth.v1.VerifyWebAuthnLoginResponse>} Promise
                 * @variation 2
                 */

                return AuthService;
            })();

            v1.GetCaptchaRequest = (function() {

                /**
                 * Properties of a GetCaptchaRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetCaptchaRequest
                 */

                /**
                 * Constructs a new GetCaptchaRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetCaptchaRequest.
                 * @implements IGetCaptchaRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetCaptchaRequest=} [properties] Properties to set
                 */
                function GetCaptchaRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GetCaptchaRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetCaptchaRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetCaptchaRequest} GetCaptchaRequest instance
                 */
                GetCaptchaRequest.create = function create(properties) {
                    return new GetCaptchaRequest(properties);
                };

                /**
                 * Encodes the specified GetCaptchaRequest message. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetCaptchaRequest} message GetCaptchaRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCaptchaRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GetCaptchaRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetCaptchaRequest} message GetCaptchaRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCaptchaRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetCaptchaRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetCaptchaRequest} GetCaptchaRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCaptchaRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetCaptchaRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetCaptchaRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetCaptchaRequest} GetCaptchaRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCaptchaRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetCaptchaRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetCaptchaRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GetCaptchaRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetCaptchaRequest} GetCaptchaRequest
                 */
                GetCaptchaRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetCaptchaRequest)
                        return object;
                    return new $root.foolsignup.auth.v1.GetCaptchaRequest();
                };

                /**
                 * Creates a plain object from a GetCaptchaRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {foolsignup.auth.v1.GetCaptchaRequest} message GetCaptchaRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetCaptchaRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GetCaptchaRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetCaptchaRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetCaptchaRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetCaptchaRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetCaptchaRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetCaptchaRequest";
                };

                return GetCaptchaRequest;
            })();

            v1.GetCaptchaResponse = (function() {

                /**
                 * Properties of a GetCaptchaResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetCaptchaResponse
                 * @property {number|null} [code] GetCaptchaResponse code
                 * @property {string|null} [msg] GetCaptchaResponse msg
                 * @property {string|null} [traceId] GetCaptchaResponse traceId
                 * @property {foolsignup.auth.v1.GetCaptchaResponse.IData|null} [data] GetCaptchaResponse data
                 */

                /**
                 * Constructs a new GetCaptchaResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetCaptchaResponse.
                 * @implements IGetCaptchaResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetCaptchaResponse=} [properties] Properties to set
                 */
                function GetCaptchaResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetCaptchaResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @instance
                 */
                GetCaptchaResponse.prototype.code = 0;

                /**
                 * GetCaptchaResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @instance
                 */
                GetCaptchaResponse.prototype.msg = "";

                /**
                 * GetCaptchaResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @instance
                 */
                GetCaptchaResponse.prototype.traceId = "";

                /**
                 * GetCaptchaResponse data.
                 * @member {foolsignup.auth.v1.GetCaptchaResponse.IData|null|undefined} data
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @instance
                 */
                GetCaptchaResponse.prototype.data = null;

                /**
                 * Creates a new GetCaptchaResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetCaptchaResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetCaptchaResponse} GetCaptchaResponse instance
                 */
                GetCaptchaResponse.create = function create(properties) {
                    return new GetCaptchaResponse(properties);
                };

                /**
                 * Encodes the specified GetCaptchaResponse message. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetCaptchaResponse} message GetCaptchaResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCaptchaResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                        $root.foolsignup.auth.v1.GetCaptchaResponse.Data.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetCaptchaResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetCaptchaResponse} message GetCaptchaResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetCaptchaResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetCaptchaResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetCaptchaResponse} GetCaptchaResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCaptchaResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetCaptchaResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        case 4: {
                                message.data = $root.foolsignup.auth.v1.GetCaptchaResponse.Data.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetCaptchaResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetCaptchaResponse} GetCaptchaResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetCaptchaResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetCaptchaResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetCaptchaResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    if (message.data != null && message.hasOwnProperty("data")) {
                        let error = $root.foolsignup.auth.v1.GetCaptchaResponse.Data.verify(message.data);
                        if (error)
                            return "data." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetCaptchaResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetCaptchaResponse} GetCaptchaResponse
                 */
                GetCaptchaResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetCaptchaResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.GetCaptchaResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    if (object.data != null) {
                        if (typeof object.data !== "object")
                            throw TypeError(".foolsignup.auth.v1.GetCaptchaResponse.data: object expected");
                        message.data = $root.foolsignup.auth.v1.GetCaptchaResponse.Data.fromObject(object.data);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetCaptchaResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {foolsignup.auth.v1.GetCaptchaResponse} message GetCaptchaResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetCaptchaResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                        object.data = null;
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = $root.foolsignup.auth.v1.GetCaptchaResponse.Data.toObject(message.data, options);
                    return object;
                };

                /**
                 * Converts this GetCaptchaResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetCaptchaResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetCaptchaResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetCaptchaResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetCaptchaResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetCaptchaResponse";
                };

                GetCaptchaResponse.Data = (function() {

                    /**
                     * Properties of a Data.
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse
                     * @interface IData
                     * @property {string|null} [captchaKey] Data captchaKey
                     * @property {string|null} [image] Data image
                     */

                    /**
                     * Constructs a new Data.
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse
                     * @classdesc Represents a Data.
                     * @implements IData
                     * @constructor
                     * @param {foolsignup.auth.v1.GetCaptchaResponse.IData=} [properties] Properties to set
                     */
                    function Data(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Data captchaKey.
                     * @member {string} captchaKey
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @instance
                     */
                    Data.prototype.captchaKey = "";

                    /**
                     * Data image.
                     * @member {string} image
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @instance
                     */
                    Data.prototype.image = "";

                    /**
                     * Creates a new Data instance using the specified properties.
                     * @function create
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetCaptchaResponse.IData=} [properties] Properties to set
                     * @returns {foolsignup.auth.v1.GetCaptchaResponse.Data} Data instance
                     */
                    Data.create = function create(properties) {
                        return new Data(properties);
                    };

                    /**
                     * Encodes the specified Data message. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.Data.verify|verify} messages.
                     * @function encode
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetCaptchaResponse.IData} message Data message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Data.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.captchaKey != null && Object.hasOwnProperty.call(message, "captchaKey"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.captchaKey);
                        if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.image);
                        return writer;
                    };

                    /**
                     * Encodes the specified Data message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetCaptchaResponse.Data.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetCaptchaResponse.IData} message Data message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Data.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Data message from the specified reader or buffer.
                     * @function decode
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {foolsignup.auth.v1.GetCaptchaResponse.Data} Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Data.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetCaptchaResponse.Data();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.captchaKey = reader.string();
                                    break;
                                }
                            case 2: {
                                    message.image = reader.string();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Data message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {foolsignup.auth.v1.GetCaptchaResponse.Data} Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Data.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Data message.
                     * @function verify
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Data.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.captchaKey != null && message.hasOwnProperty("captchaKey"))
                            if (!$util.isString(message.captchaKey))
                                return "captchaKey: string expected";
                        if (message.image != null && message.hasOwnProperty("image"))
                            if (!$util.isString(message.image))
                                return "image: string expected";
                        return null;
                    };

                    /**
                     * Creates a Data message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {foolsignup.auth.v1.GetCaptchaResponse.Data} Data
                     */
                    Data.fromObject = function fromObject(object) {
                        if (object instanceof $root.foolsignup.auth.v1.GetCaptchaResponse.Data)
                            return object;
                        let message = new $root.foolsignup.auth.v1.GetCaptchaResponse.Data();
                        if (object.captchaKey != null)
                            message.captchaKey = String(object.captchaKey);
                        if (object.image != null)
                            message.image = String(object.image);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Data message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetCaptchaResponse.Data} message Data
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Data.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.captchaKey = "";
                            object.image = "";
                        }
                        if (message.captchaKey != null && message.hasOwnProperty("captchaKey"))
                            object.captchaKey = message.captchaKey;
                        if (message.image != null && message.hasOwnProperty("image"))
                            object.image = message.image;
                        return object;
                    };

                    /**
                     * Converts this Data to JSON.
                     * @function toJSON
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Data.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for Data
                     * @function getTypeUrl
                     * @memberof foolsignup.auth.v1.GetCaptchaResponse.Data
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Data.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/foolsignup.auth.v1.GetCaptchaResponse.Data";
                    };

                    return Data;
                })();

                return GetCaptchaResponse;
            })();

            v1.SendEmailCodeRequest = (function() {

                /**
                 * Properties of a SendEmailCodeRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface ISendEmailCodeRequest
                 * @property {string|null} [email] SendEmailCodeRequest email
                 * @property {string|null} [captchaKey] SendEmailCodeRequest captchaKey
                 * @property {string|null} [captchaValue] SendEmailCodeRequest captchaValue
                 */

                /**
                 * Constructs a new SendEmailCodeRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a SendEmailCodeRequest.
                 * @implements ISendEmailCodeRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.ISendEmailCodeRequest=} [properties] Properties to set
                 */
                function SendEmailCodeRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SendEmailCodeRequest email.
                 * @member {string} email
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @instance
                 */
                SendEmailCodeRequest.prototype.email = "";

                /**
                 * SendEmailCodeRequest captchaKey.
                 * @member {string} captchaKey
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @instance
                 */
                SendEmailCodeRequest.prototype.captchaKey = "";

                /**
                 * SendEmailCodeRequest captchaValue.
                 * @member {string} captchaValue
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @instance
                 */
                SendEmailCodeRequest.prototype.captchaValue = "";

                /**
                 * Creates a new SendEmailCodeRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {foolsignup.auth.v1.ISendEmailCodeRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.SendEmailCodeRequest} SendEmailCodeRequest instance
                 */
                SendEmailCodeRequest.create = function create(properties) {
                    return new SendEmailCodeRequest(properties);
                };

                /**
                 * Encodes the specified SendEmailCodeRequest message. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {foolsignup.auth.v1.ISendEmailCodeRequest} message SendEmailCodeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SendEmailCodeRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
                    if (message.captchaKey != null && Object.hasOwnProperty.call(message, "captchaKey"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.captchaKey);
                    if (message.captchaValue != null && Object.hasOwnProperty.call(message, "captchaValue"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.captchaValue);
                    return writer;
                };

                /**
                 * Encodes the specified SendEmailCodeRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {foolsignup.auth.v1.ISendEmailCodeRequest} message SendEmailCodeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SendEmailCodeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SendEmailCodeRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.SendEmailCodeRequest} SendEmailCodeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SendEmailCodeRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.SendEmailCodeRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.email = reader.string();
                                break;
                            }
                        case 2: {
                                message.captchaKey = reader.string();
                                break;
                            }
                        case 3: {
                                message.captchaValue = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SendEmailCodeRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.SendEmailCodeRequest} SendEmailCodeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SendEmailCodeRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SendEmailCodeRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SendEmailCodeRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.email != null && message.hasOwnProperty("email"))
                        if (!$util.isString(message.email))
                            return "email: string expected";
                    if (message.captchaKey != null && message.hasOwnProperty("captchaKey"))
                        if (!$util.isString(message.captchaKey))
                            return "captchaKey: string expected";
                    if (message.captchaValue != null && message.hasOwnProperty("captchaValue"))
                        if (!$util.isString(message.captchaValue))
                            return "captchaValue: string expected";
                    return null;
                };

                /**
                 * Creates a SendEmailCodeRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.SendEmailCodeRequest} SendEmailCodeRequest
                 */
                SendEmailCodeRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.SendEmailCodeRequest)
                        return object;
                    let message = new $root.foolsignup.auth.v1.SendEmailCodeRequest();
                    if (object.email != null)
                        message.email = String(object.email);
                    if (object.captchaKey != null)
                        message.captchaKey = String(object.captchaKey);
                    if (object.captchaValue != null)
                        message.captchaValue = String(object.captchaValue);
                    return message;
                };

                /**
                 * Creates a plain object from a SendEmailCodeRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {foolsignup.auth.v1.SendEmailCodeRequest} message SendEmailCodeRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SendEmailCodeRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.email = "";
                        object.captchaKey = "";
                        object.captchaValue = "";
                    }
                    if (message.email != null && message.hasOwnProperty("email"))
                        object.email = message.email;
                    if (message.captchaKey != null && message.hasOwnProperty("captchaKey"))
                        object.captchaKey = message.captchaKey;
                    if (message.captchaValue != null && message.hasOwnProperty("captchaValue"))
                        object.captchaValue = message.captchaValue;
                    return object;
                };

                /**
                 * Converts this SendEmailCodeRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SendEmailCodeRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SendEmailCodeRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.SendEmailCodeRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SendEmailCodeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.SendEmailCodeRequest";
                };

                return SendEmailCodeRequest;
            })();

            v1.SendEmailCodeResponse = (function() {

                /**
                 * Properties of a SendEmailCodeResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface ISendEmailCodeResponse
                 * @property {number|null} [code] SendEmailCodeResponse code
                 * @property {string|null} [msg] SendEmailCodeResponse msg
                 * @property {string|null} [traceId] SendEmailCodeResponse traceId
                 */

                /**
                 * Constructs a new SendEmailCodeResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a SendEmailCodeResponse.
                 * @implements ISendEmailCodeResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.ISendEmailCodeResponse=} [properties] Properties to set
                 */
                function SendEmailCodeResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SendEmailCodeResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @instance
                 */
                SendEmailCodeResponse.prototype.code = 0;

                /**
                 * SendEmailCodeResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @instance
                 */
                SendEmailCodeResponse.prototype.msg = "";

                /**
                 * SendEmailCodeResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @instance
                 */
                SendEmailCodeResponse.prototype.traceId = "";

                /**
                 * Creates a new SendEmailCodeResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {foolsignup.auth.v1.ISendEmailCodeResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.SendEmailCodeResponse} SendEmailCodeResponse instance
                 */
                SendEmailCodeResponse.create = function create(properties) {
                    return new SendEmailCodeResponse(properties);
                };

                /**
                 * Encodes the specified SendEmailCodeResponse message. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {foolsignup.auth.v1.ISendEmailCodeResponse} message SendEmailCodeResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SendEmailCodeResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    return writer;
                };

                /**
                 * Encodes the specified SendEmailCodeResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.SendEmailCodeResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {foolsignup.auth.v1.ISendEmailCodeResponse} message SendEmailCodeResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SendEmailCodeResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SendEmailCodeResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.SendEmailCodeResponse} SendEmailCodeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SendEmailCodeResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.SendEmailCodeResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SendEmailCodeResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.SendEmailCodeResponse} SendEmailCodeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SendEmailCodeResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SendEmailCodeResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SendEmailCodeResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    return null;
                };

                /**
                 * Creates a SendEmailCodeResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.SendEmailCodeResponse} SendEmailCodeResponse
                 */
                SendEmailCodeResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.SendEmailCodeResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.SendEmailCodeResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    return message;
                };

                /**
                 * Creates a plain object from a SendEmailCodeResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {foolsignup.auth.v1.SendEmailCodeResponse} message SendEmailCodeResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SendEmailCodeResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    return object;
                };

                /**
                 * Converts this SendEmailCodeResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SendEmailCodeResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SendEmailCodeResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.SendEmailCodeResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SendEmailCodeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.SendEmailCodeResponse";
                };

                return SendEmailCodeResponse;
            })();

            v1.RegisterRequest = (function() {

                /**
                 * Properties of a RegisterRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IRegisterRequest
                 * @property {string|null} [username] RegisterRequest username
                 * @property {string|null} [email] RegisterRequest email
                 * @property {number|null} [age] RegisterRequest age
                 * @property {string|null} [password] RegisterRequest password
                 * @property {string|null} [code] RegisterRequest code
                 */

                /**
                 * Constructs a new RegisterRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a RegisterRequest.
                 * @implements IRegisterRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IRegisterRequest=} [properties] Properties to set
                 */
                function RegisterRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RegisterRequest username.
                 * @member {string} username
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @instance
                 */
                RegisterRequest.prototype.username = "";

                /**
                 * RegisterRequest email.
                 * @member {string} email
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @instance
                 */
                RegisterRequest.prototype.email = "";

                /**
                 * RegisterRequest age.
                 * @member {number} age
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @instance
                 */
                RegisterRequest.prototype.age = 0;

                /**
                 * RegisterRequest password.
                 * @member {string} password
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @instance
                 */
                RegisterRequest.prototype.password = "";

                /**
                 * RegisterRequest code.
                 * @member {string} code
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @instance
                 */
                RegisterRequest.prototype.code = "";

                /**
                 * Creates a new RegisterRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {foolsignup.auth.v1.IRegisterRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.RegisterRequest} RegisterRequest instance
                 */
                RegisterRequest.create = function create(properties) {
                    return new RegisterRequest(properties);
                };

                /**
                 * Encodes the specified RegisterRequest message. Does not implicitly {@link foolsignup.auth.v1.RegisterRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {foolsignup.auth.v1.IRegisterRequest} message RegisterRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                    if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.email);
                    if (message.age != null && Object.hasOwnProperty.call(message, "age"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.age);
                    if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.password);
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.code);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.RegisterRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {foolsignup.auth.v1.IRegisterRequest} message RegisterRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RegisterRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.RegisterRequest} RegisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.RegisterRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.username = reader.string();
                                break;
                            }
                        case 2: {
                                message.email = reader.string();
                                break;
                            }
                        case 3: {
                                message.age = reader.int32();
                                break;
                            }
                        case 4: {
                                message.password = reader.string();
                                break;
                            }
                        case 5: {
                                message.code = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.RegisterRequest} RegisterRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.username != null && message.hasOwnProperty("username"))
                        if (!$util.isString(message.username))
                            return "username: string expected";
                    if (message.email != null && message.hasOwnProperty("email"))
                        if (!$util.isString(message.email))
                            return "email: string expected";
                    if (message.age != null && message.hasOwnProperty("age"))
                        if (!$util.isInteger(message.age))
                            return "age: integer expected";
                    if (message.password != null && message.hasOwnProperty("password"))
                        if (!$util.isString(message.password))
                            return "password: string expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isString(message.code))
                            return "code: string expected";
                    return null;
                };

                /**
                 * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.RegisterRequest} RegisterRequest
                 */
                RegisterRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.RegisterRequest)
                        return object;
                    let message = new $root.foolsignup.auth.v1.RegisterRequest();
                    if (object.username != null)
                        message.username = String(object.username);
                    if (object.email != null)
                        message.email = String(object.email);
                    if (object.age != null)
                        message.age = object.age | 0;
                    if (object.password != null)
                        message.password = String(object.password);
                    if (object.code != null)
                        message.code = String(object.code);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {foolsignup.auth.v1.RegisterRequest} message RegisterRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.username = "";
                        object.email = "";
                        object.age = 0;
                        object.password = "";
                        object.code = "";
                    }
                    if (message.username != null && message.hasOwnProperty("username"))
                        object.username = message.username;
                    if (message.email != null && message.hasOwnProperty("email"))
                        object.email = message.email;
                    if (message.age != null && message.hasOwnProperty("age"))
                        object.age = message.age;
                    if (message.password != null && message.hasOwnProperty("password"))
                        object.password = message.password;
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    return object;
                };

                /**
                 * Converts this RegisterRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RegisterRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.RegisterRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RegisterRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.RegisterRequest";
                };

                return RegisterRequest;
            })();

            v1.RegisterResponse = (function() {

                /**
                 * Properties of a RegisterResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IRegisterResponse
                 * @property {number|null} [code] RegisterResponse code
                 * @property {string|null} [msg] RegisterResponse msg
                 * @property {string|null} [traceId] RegisterResponse traceId
                 */

                /**
                 * Constructs a new RegisterResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a RegisterResponse.
                 * @implements IRegisterResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IRegisterResponse=} [properties] Properties to set
                 */
                function RegisterResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RegisterResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @instance
                 */
                RegisterResponse.prototype.code = 0;

                /**
                 * RegisterResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @instance
                 */
                RegisterResponse.prototype.msg = "";

                /**
                 * RegisterResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @instance
                 */
                RegisterResponse.prototype.traceId = "";

                /**
                 * Creates a new RegisterResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {foolsignup.auth.v1.IRegisterResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.RegisterResponse} RegisterResponse instance
                 */
                RegisterResponse.create = function create(properties) {
                    return new RegisterResponse(properties);
                };

                /**
                 * Encodes the specified RegisterResponse message. Does not implicitly {@link foolsignup.auth.v1.RegisterResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {foolsignup.auth.v1.IRegisterResponse} message RegisterResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.RegisterResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {foolsignup.auth.v1.IRegisterResponse} message RegisterResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RegisterResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.RegisterResponse} RegisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.RegisterResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.RegisterResponse} RegisterResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    return null;
                };

                /**
                 * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.RegisterResponse} RegisterResponse
                 */
                RegisterResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.RegisterResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.RegisterResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {foolsignup.auth.v1.RegisterResponse} message RegisterResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    return object;
                };

                /**
                 * Converts this RegisterResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RegisterResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.RegisterResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RegisterResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.RegisterResponse";
                };

                return RegisterResponse;
            })();

            v1.LoginRequest = (function() {

                /**
                 * Properties of a LoginRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface ILoginRequest
                 * @property {string|null} [username] LoginRequest username
                 * @property {string|null} [password] LoginRequest password
                 */

                /**
                 * Constructs a new LoginRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a LoginRequest.
                 * @implements ILoginRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.ILoginRequest=} [properties] Properties to set
                 */
                function LoginRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * LoginRequest username.
                 * @member {string} username
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @instance
                 */
                LoginRequest.prototype.username = "";

                /**
                 * LoginRequest password.
                 * @member {string} password
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @instance
                 */
                LoginRequest.prototype.password = "";

                /**
                 * Creates a new LoginRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.ILoginRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.LoginRequest} LoginRequest instance
                 */
                LoginRequest.create = function create(properties) {
                    return new LoginRequest(properties);
                };

                /**
                 * Encodes the specified LoginRequest message. Does not implicitly {@link foolsignup.auth.v1.LoginRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.ILoginRequest} message LoginRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LoginRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                    if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                    return writer;
                };

                /**
                 * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.LoginRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.ILoginRequest} message LoginRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a LoginRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.LoginRequest} LoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LoginRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.LoginRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.username = reader.string();
                                break;
                            }
                        case 2: {
                                message.password = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.LoginRequest} LoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LoginRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a LoginRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                LoginRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.username != null && message.hasOwnProperty("username"))
                        if (!$util.isString(message.username))
                            return "username: string expected";
                    if (message.password != null && message.hasOwnProperty("password"))
                        if (!$util.isString(message.password))
                            return "password: string expected";
                    return null;
                };

                /**
                 * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.LoginRequest} LoginRequest
                 */
                LoginRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.LoginRequest)
                        return object;
                    let message = new $root.foolsignup.auth.v1.LoginRequest();
                    if (object.username != null)
                        message.username = String(object.username);
                    if (object.password != null)
                        message.password = String(object.password);
                    return message;
                };

                /**
                 * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.LoginRequest} message LoginRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                LoginRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.username = "";
                        object.password = "";
                    }
                    if (message.username != null && message.hasOwnProperty("username"))
                        object.username = message.username;
                    if (message.password != null && message.hasOwnProperty("password"))
                        object.password = message.password;
                    return object;
                };

                /**
                 * Converts this LoginRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                LoginRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for LoginRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.LoginRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                LoginRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.LoginRequest";
                };

                return LoginRequest;
            })();

            v1.LoginResponse = (function() {

                /**
                 * Properties of a LoginResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface ILoginResponse
                 * @property {number|null} [code] LoginResponse code
                 * @property {string|null} [msg] LoginResponse msg
                 * @property {string|null} [traceId] LoginResponse traceId
                 * @property {foolsignup.auth.v1.LoginResponse.IData|null} [data] LoginResponse data
                 */

                /**
                 * Constructs a new LoginResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a LoginResponse.
                 * @implements ILoginResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.ILoginResponse=} [properties] Properties to set
                 */
                function LoginResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * LoginResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @instance
                 */
                LoginResponse.prototype.code = 0;

                /**
                 * LoginResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @instance
                 */
                LoginResponse.prototype.msg = "";

                /**
                 * LoginResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @instance
                 */
                LoginResponse.prototype.traceId = "";

                /**
                 * LoginResponse data.
                 * @member {foolsignup.auth.v1.LoginResponse.IData|null|undefined} data
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @instance
                 */
                LoginResponse.prototype.data = null;

                /**
                 * Creates a new LoginResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.ILoginResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.LoginResponse} LoginResponse instance
                 */
                LoginResponse.create = function create(properties) {
                    return new LoginResponse(properties);
                };

                /**
                 * Encodes the specified LoginResponse message. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.ILoginResponse} message LoginResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LoginResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                        $root.foolsignup.auth.v1.LoginResponse.Data.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.ILoginResponse} message LoginResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a LoginResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.LoginResponse} LoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LoginResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.LoginResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        case 4: {
                                message.data = $root.foolsignup.auth.v1.LoginResponse.Data.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.LoginResponse} LoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LoginResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a LoginResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                LoginResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    if (message.data != null && message.hasOwnProperty("data")) {
                        let error = $root.foolsignup.auth.v1.LoginResponse.Data.verify(message.data);
                        if (error)
                            return "data." + error;
                    }
                    return null;
                };

                /**
                 * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.LoginResponse} LoginResponse
                 */
                LoginResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.LoginResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.LoginResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    if (object.data != null) {
                        if (typeof object.data !== "object")
                            throw TypeError(".foolsignup.auth.v1.LoginResponse.data: object expected");
                        message.data = $root.foolsignup.auth.v1.LoginResponse.Data.fromObject(object.data);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.LoginResponse} message LoginResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                LoginResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                        object.data = null;
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = $root.foolsignup.auth.v1.LoginResponse.Data.toObject(message.data, options);
                    return object;
                };

                /**
                 * Converts this LoginResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                LoginResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for LoginResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.LoginResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                LoginResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.LoginResponse";
                };

                LoginResponse.Data = (function() {

                    /**
                     * Properties of a Data.
                     * @memberof foolsignup.auth.v1.LoginResponse
                     * @interface IData
                     * @property {boolean|null} [require_2fa] Data require_2fa
                     * @property {boolean|null} [setup_2fa] Data setup_2fa
                     * @property {string|null} [tempToken] Data tempToken
                     */

                    /**
                     * Constructs a new Data.
                     * @memberof foolsignup.auth.v1.LoginResponse
                     * @classdesc Represents a Data.
                     * @implements IData
                     * @constructor
                     * @param {foolsignup.auth.v1.LoginResponse.IData=} [properties] Properties to set
                     */
                    function Data(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Data require_2fa.
                     * @member {boolean} require_2fa
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @instance
                     */
                    Data.prototype.require_2fa = false;

                    /**
                     * Data setup_2fa.
                     * @member {boolean} setup_2fa
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @instance
                     */
                    Data.prototype.setup_2fa = false;

                    /**
                     * Data tempToken.
                     * @member {string} tempToken
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @instance
                     */
                    Data.prototype.tempToken = "";

                    /**
                     * Creates a new Data instance using the specified properties.
                     * @function create
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.LoginResponse.IData=} [properties] Properties to set
                     * @returns {foolsignup.auth.v1.LoginResponse.Data} Data instance
                     */
                    Data.create = function create(properties) {
                        return new Data(properties);
                    };

                    /**
                     * Encodes the specified Data message. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.Data.verify|verify} messages.
                     * @function encode
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.LoginResponse.IData} message Data message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Data.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.require_2fa != null && Object.hasOwnProperty.call(message, "require_2fa"))
                            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.require_2fa);
                        if (message.setup_2fa != null && Object.hasOwnProperty.call(message, "setup_2fa"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.setup_2fa);
                        if (message.tempToken != null && Object.hasOwnProperty.call(message, "tempToken"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.tempToken);
                        return writer;
                    };

                    /**
                     * Encodes the specified Data message, length delimited. Does not implicitly {@link foolsignup.auth.v1.LoginResponse.Data.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.LoginResponse.IData} message Data message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Data.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Data message from the specified reader or buffer.
                     * @function decode
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {foolsignup.auth.v1.LoginResponse.Data} Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Data.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.LoginResponse.Data();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.require_2fa = reader.bool();
                                    break;
                                }
                            case 2: {
                                    message.setup_2fa = reader.bool();
                                    break;
                                }
                            case 3: {
                                    message.tempToken = reader.string();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Data message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {foolsignup.auth.v1.LoginResponse.Data} Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Data.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Data message.
                     * @function verify
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Data.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.require_2fa != null && message.hasOwnProperty("require_2fa"))
                            if (typeof message.require_2fa !== "boolean")
                                return "require_2fa: boolean expected";
                        if (message.setup_2fa != null && message.hasOwnProperty("setup_2fa"))
                            if (typeof message.setup_2fa !== "boolean")
                                return "setup_2fa: boolean expected";
                        if (message.tempToken != null && message.hasOwnProperty("tempToken"))
                            if (!$util.isString(message.tempToken))
                                return "tempToken: string expected";
                        return null;
                    };

                    /**
                     * Creates a Data message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {foolsignup.auth.v1.LoginResponse.Data} Data
                     */
                    Data.fromObject = function fromObject(object) {
                        if (object instanceof $root.foolsignup.auth.v1.LoginResponse.Data)
                            return object;
                        let message = new $root.foolsignup.auth.v1.LoginResponse.Data();
                        if (object.require_2fa != null)
                            message.require_2fa = Boolean(object.require_2fa);
                        if (object.setup_2fa != null)
                            message.setup_2fa = Boolean(object.setup_2fa);
                        if (object.tempToken != null)
                            message.tempToken = String(object.tempToken);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Data message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.LoginResponse.Data} message Data
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Data.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.require_2fa = false;
                            object.setup_2fa = false;
                            object.tempToken = "";
                        }
                        if (message.require_2fa != null && message.hasOwnProperty("require_2fa"))
                            object.require_2fa = message.require_2fa;
                        if (message.setup_2fa != null && message.hasOwnProperty("setup_2fa"))
                            object.setup_2fa = message.setup_2fa;
                        if (message.tempToken != null && message.hasOwnProperty("tempToken"))
                            object.tempToken = message.tempToken;
                        return object;
                    };

                    /**
                     * Converts this Data to JSON.
                     * @function toJSON
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Data.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for Data
                     * @function getTypeUrl
                     * @memberof foolsignup.auth.v1.LoginResponse.Data
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Data.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/foolsignup.auth.v1.LoginResponse.Data";
                    };

                    return Data;
                })();

                return LoginResponse;
            })();

            v1.GetWebAuthnRegistrationOptionsRequest = (function() {

                /**
                 * Properties of a GetWebAuthnRegistrationOptionsRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetWebAuthnRegistrationOptionsRequest
                 */

                /**
                 * Constructs a new GetWebAuthnRegistrationOptionsRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetWebAuthnRegistrationOptionsRequest.
                 * @implements IGetWebAuthnRegistrationOptionsRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest=} [properties] Properties to set
                 */
                function GetWebAuthnRegistrationOptionsRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GetWebAuthnRegistrationOptionsRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest} GetWebAuthnRegistrationOptionsRequest instance
                 */
                GetWebAuthnRegistrationOptionsRequest.create = function create(properties) {
                    return new GetWebAuthnRegistrationOptionsRequest(properties);
                };

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsRequest message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest} message GetWebAuthnRegistrationOptionsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnRegistrationOptionsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsRequest} message GetWebAuthnRegistrationOptionsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnRegistrationOptionsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest} GetWebAuthnRegistrationOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnRegistrationOptionsRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest} GetWebAuthnRegistrationOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnRegistrationOptionsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetWebAuthnRegistrationOptionsRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetWebAuthnRegistrationOptionsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GetWebAuthnRegistrationOptionsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest} GetWebAuthnRegistrationOptionsRequest
                 */
                GetWebAuthnRegistrationOptionsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest)
                        return object;
                    return new $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest();
                };

                /**
                 * Creates a plain object from a GetWebAuthnRegistrationOptionsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest} message GetWebAuthnRegistrationOptionsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetWebAuthnRegistrationOptionsRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GetWebAuthnRegistrationOptionsRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetWebAuthnRegistrationOptionsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetWebAuthnRegistrationOptionsRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetWebAuthnRegistrationOptionsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetWebAuthnRegistrationOptionsRequest";
                };

                return GetWebAuthnRegistrationOptionsRequest;
            })();

            v1.GetWebAuthnRegistrationOptionsResponse = (function() {

                /**
                 * Properties of a GetWebAuthnRegistrationOptionsResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetWebAuthnRegistrationOptionsResponse
                 * @property {number|null} [code] GetWebAuthnRegistrationOptionsResponse code
                 * @property {string|null} [msg] GetWebAuthnRegistrationOptionsResponse msg
                 * @property {string|null} [optionsJson] GetWebAuthnRegistrationOptionsResponse optionsJson
                 * @property {string|null} [traceId] GetWebAuthnRegistrationOptionsResponse traceId
                 */

                /**
                 * Constructs a new GetWebAuthnRegistrationOptionsResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetWebAuthnRegistrationOptionsResponse.
                 * @implements IGetWebAuthnRegistrationOptionsResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse=} [properties] Properties to set
                 */
                function GetWebAuthnRegistrationOptionsResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetWebAuthnRegistrationOptionsResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @instance
                 */
                GetWebAuthnRegistrationOptionsResponse.prototype.code = 0;

                /**
                 * GetWebAuthnRegistrationOptionsResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @instance
                 */
                GetWebAuthnRegistrationOptionsResponse.prototype.msg = "";

                /**
                 * GetWebAuthnRegistrationOptionsResponse optionsJson.
                 * @member {string} optionsJson
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @instance
                 */
                GetWebAuthnRegistrationOptionsResponse.prototype.optionsJson = "";

                /**
                 * GetWebAuthnRegistrationOptionsResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @instance
                 */
                GetWebAuthnRegistrationOptionsResponse.prototype.traceId = "";

                /**
                 * Creates a new GetWebAuthnRegistrationOptionsResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse} GetWebAuthnRegistrationOptionsResponse instance
                 */
                GetWebAuthnRegistrationOptionsResponse.create = function create(properties) {
                    return new GetWebAuthnRegistrationOptionsResponse(properties);
                };

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsResponse message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse} message GetWebAuthnRegistrationOptionsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnRegistrationOptionsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.optionsJson != null && Object.hasOwnProperty.call(message, "optionsJson"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.optionsJson);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.traceId);
                    return writer;
                };

                /**
                 * Encodes the specified GetWebAuthnRegistrationOptionsResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnRegistrationOptionsResponse} message GetWebAuthnRegistrationOptionsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnRegistrationOptionsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse} GetWebAuthnRegistrationOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnRegistrationOptionsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.optionsJson = reader.string();
                                break;
                            }
                        case 4: {
                                message.traceId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetWebAuthnRegistrationOptionsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse} GetWebAuthnRegistrationOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnRegistrationOptionsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetWebAuthnRegistrationOptionsResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetWebAuthnRegistrationOptionsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.optionsJson != null && message.hasOwnProperty("optionsJson"))
                        if (!$util.isString(message.optionsJson))
                            return "optionsJson: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    return null;
                };

                /**
                 * Creates a GetWebAuthnRegistrationOptionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse} GetWebAuthnRegistrationOptionsResponse
                 */
                GetWebAuthnRegistrationOptionsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.optionsJson != null)
                        message.optionsJson = String(object.optionsJson);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    return message;
                };

                /**
                 * Creates a plain object from a GetWebAuthnRegistrationOptionsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse} message GetWebAuthnRegistrationOptionsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetWebAuthnRegistrationOptionsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.optionsJson = "";
                        object.traceId = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.optionsJson != null && message.hasOwnProperty("optionsJson"))
                        object.optionsJson = message.optionsJson;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    return object;
                };

                /**
                 * Converts this GetWebAuthnRegistrationOptionsResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetWebAuthnRegistrationOptionsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetWebAuthnRegistrationOptionsResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetWebAuthnRegistrationOptionsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetWebAuthnRegistrationOptionsResponse";
                };

                return GetWebAuthnRegistrationOptionsResponse;
            })();

            v1.VerifyWebAuthnRegistrationRequest = (function() {

                /**
                 * Properties of a VerifyWebAuthnRegistrationRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IVerifyWebAuthnRegistrationRequest
                 * @property {string|null} [credentialJson] VerifyWebAuthnRegistrationRequest credentialJson
                 */

                /**
                 * Constructs a new VerifyWebAuthnRegistrationRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a VerifyWebAuthnRegistrationRequest.
                 * @implements IVerifyWebAuthnRegistrationRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest=} [properties] Properties to set
                 */
                function VerifyWebAuthnRegistrationRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * VerifyWebAuthnRegistrationRequest credentialJson.
                 * @member {string} credentialJson
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @instance
                 */
                VerifyWebAuthnRegistrationRequest.prototype.credentialJson = "";

                /**
                 * Creates a new VerifyWebAuthnRegistrationRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest} VerifyWebAuthnRegistrationRequest instance
                 */
                VerifyWebAuthnRegistrationRequest.create = function create(properties) {
                    return new VerifyWebAuthnRegistrationRequest(properties);
                };

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationRequest message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest} message VerifyWebAuthnRegistrationRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnRegistrationRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.credentialJson != null && Object.hasOwnProperty.call(message, "credentialJson"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.credentialJson);
                    return writer;
                };

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationRequest} message VerifyWebAuthnRegistrationRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnRegistrationRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a VerifyWebAuthnRegistrationRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest} VerifyWebAuthnRegistrationRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnRegistrationRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.credentialJson = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a VerifyWebAuthnRegistrationRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest} VerifyWebAuthnRegistrationRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnRegistrationRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a VerifyWebAuthnRegistrationRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                VerifyWebAuthnRegistrationRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.credentialJson != null && message.hasOwnProperty("credentialJson"))
                        if (!$util.isString(message.credentialJson))
                            return "credentialJson: string expected";
                    return null;
                };

                /**
                 * Creates a VerifyWebAuthnRegistrationRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest} VerifyWebAuthnRegistrationRequest
                 */
                VerifyWebAuthnRegistrationRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest)
                        return object;
                    let message = new $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest();
                    if (object.credentialJson != null)
                        message.credentialJson = String(object.credentialJson);
                    return message;
                };

                /**
                 * Creates a plain object from a VerifyWebAuthnRegistrationRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest} message VerifyWebAuthnRegistrationRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                VerifyWebAuthnRegistrationRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.credentialJson = "";
                    if (message.credentialJson != null && message.hasOwnProperty("credentialJson"))
                        object.credentialJson = message.credentialJson;
                    return object;
                };

                /**
                 * Converts this VerifyWebAuthnRegistrationRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                VerifyWebAuthnRegistrationRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for VerifyWebAuthnRegistrationRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                VerifyWebAuthnRegistrationRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.VerifyWebAuthnRegistrationRequest";
                };

                return VerifyWebAuthnRegistrationRequest;
            })();

            v1.VerifyWebAuthnRegistrationResponse = (function() {

                /**
                 * Properties of a VerifyWebAuthnRegistrationResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IVerifyWebAuthnRegistrationResponse
                 * @property {number|null} [code] VerifyWebAuthnRegistrationResponse code
                 * @property {string|null} [msg] VerifyWebAuthnRegistrationResponse msg
                 * @property {string|null} [traceId] VerifyWebAuthnRegistrationResponse traceId
                 */

                /**
                 * Constructs a new VerifyWebAuthnRegistrationResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a VerifyWebAuthnRegistrationResponse.
                 * @implements IVerifyWebAuthnRegistrationResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse=} [properties] Properties to set
                 */
                function VerifyWebAuthnRegistrationResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * VerifyWebAuthnRegistrationResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @instance
                 */
                VerifyWebAuthnRegistrationResponse.prototype.code = 0;

                /**
                 * VerifyWebAuthnRegistrationResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @instance
                 */
                VerifyWebAuthnRegistrationResponse.prototype.msg = "";

                /**
                 * VerifyWebAuthnRegistrationResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @instance
                 */
                VerifyWebAuthnRegistrationResponse.prototype.traceId = "";

                /**
                 * Creates a new VerifyWebAuthnRegistrationResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse} VerifyWebAuthnRegistrationResponse instance
                 */
                VerifyWebAuthnRegistrationResponse.create = function create(properties) {
                    return new VerifyWebAuthnRegistrationResponse(properties);
                };

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationResponse message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse} message VerifyWebAuthnRegistrationResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnRegistrationResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    return writer;
                };

                /**
                 * Encodes the specified VerifyWebAuthnRegistrationResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnRegistrationResponse} message VerifyWebAuthnRegistrationResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnRegistrationResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a VerifyWebAuthnRegistrationResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse} VerifyWebAuthnRegistrationResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnRegistrationResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a VerifyWebAuthnRegistrationResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse} VerifyWebAuthnRegistrationResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnRegistrationResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a VerifyWebAuthnRegistrationResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                VerifyWebAuthnRegistrationResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    return null;
                };

                /**
                 * Creates a VerifyWebAuthnRegistrationResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse} VerifyWebAuthnRegistrationResponse
                 */
                VerifyWebAuthnRegistrationResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    return message;
                };

                /**
                 * Creates a plain object from a VerifyWebAuthnRegistrationResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse} message VerifyWebAuthnRegistrationResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                VerifyWebAuthnRegistrationResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    return object;
                };

                /**
                 * Converts this VerifyWebAuthnRegistrationResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                VerifyWebAuthnRegistrationResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for VerifyWebAuthnRegistrationResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                VerifyWebAuthnRegistrationResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.VerifyWebAuthnRegistrationResponse";
                };

                return VerifyWebAuthnRegistrationResponse;
            })();

            v1.GetWebAuthnLoginOptionsRequest = (function() {

                /**
                 * Properties of a GetWebAuthnLoginOptionsRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetWebAuthnLoginOptionsRequest
                 * @property {string|null} [tempToken] GetWebAuthnLoginOptionsRequest tempToken
                 */

                /**
                 * Constructs a new GetWebAuthnLoginOptionsRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetWebAuthnLoginOptionsRequest.
                 * @implements IGetWebAuthnLoginOptionsRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest=} [properties] Properties to set
                 */
                function GetWebAuthnLoginOptionsRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetWebAuthnLoginOptionsRequest tempToken.
                 * @member {string} tempToken
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @instance
                 */
                GetWebAuthnLoginOptionsRequest.prototype.tempToken = "";

                /**
                 * Creates a new GetWebAuthnLoginOptionsRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest} GetWebAuthnLoginOptionsRequest instance
                 */
                GetWebAuthnLoginOptionsRequest.create = function create(properties) {
                    return new GetWebAuthnLoginOptionsRequest(properties);
                };

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsRequest message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest} message GetWebAuthnLoginOptionsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnLoginOptionsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tempToken != null && Object.hasOwnProperty.call(message, "tempToken"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.tempToken);
                    return writer;
                };

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsRequest} message GetWebAuthnLoginOptionsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnLoginOptionsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetWebAuthnLoginOptionsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest} GetWebAuthnLoginOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnLoginOptionsRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.tempToken = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetWebAuthnLoginOptionsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest} GetWebAuthnLoginOptionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnLoginOptionsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetWebAuthnLoginOptionsRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetWebAuthnLoginOptionsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.tempToken != null && message.hasOwnProperty("tempToken"))
                        if (!$util.isString(message.tempToken))
                            return "tempToken: string expected";
                    return null;
                };

                /**
                 * Creates a GetWebAuthnLoginOptionsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest} GetWebAuthnLoginOptionsRequest
                 */
                GetWebAuthnLoginOptionsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest)
                        return object;
                    let message = new $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest();
                    if (object.tempToken != null)
                        message.tempToken = String(object.tempToken);
                    return message;
                };

                /**
                 * Creates a plain object from a GetWebAuthnLoginOptionsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest} message GetWebAuthnLoginOptionsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetWebAuthnLoginOptionsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.tempToken = "";
                    if (message.tempToken != null && message.hasOwnProperty("tempToken"))
                        object.tempToken = message.tempToken;
                    return object;
                };

                /**
                 * Converts this GetWebAuthnLoginOptionsRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetWebAuthnLoginOptionsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetWebAuthnLoginOptionsRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetWebAuthnLoginOptionsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetWebAuthnLoginOptionsRequest";
                };

                return GetWebAuthnLoginOptionsRequest;
            })();

            v1.GetWebAuthnLoginOptionsResponse = (function() {

                /**
                 * Properties of a GetWebAuthnLoginOptionsResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetWebAuthnLoginOptionsResponse
                 * @property {number|null} [code] GetWebAuthnLoginOptionsResponse code
                 * @property {string|null} [msg] GetWebAuthnLoginOptionsResponse msg
                 * @property {string|null} [optionsJson] GetWebAuthnLoginOptionsResponse optionsJson
                 * @property {string|null} [traceId] GetWebAuthnLoginOptionsResponse traceId
                 */

                /**
                 * Constructs a new GetWebAuthnLoginOptionsResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetWebAuthnLoginOptionsResponse.
                 * @implements IGetWebAuthnLoginOptionsResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse=} [properties] Properties to set
                 */
                function GetWebAuthnLoginOptionsResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetWebAuthnLoginOptionsResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @instance
                 */
                GetWebAuthnLoginOptionsResponse.prototype.code = 0;

                /**
                 * GetWebAuthnLoginOptionsResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @instance
                 */
                GetWebAuthnLoginOptionsResponse.prototype.msg = "";

                /**
                 * GetWebAuthnLoginOptionsResponse optionsJson.
                 * @member {string} optionsJson
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @instance
                 */
                GetWebAuthnLoginOptionsResponse.prototype.optionsJson = "";

                /**
                 * GetWebAuthnLoginOptionsResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @instance
                 */
                GetWebAuthnLoginOptionsResponse.prototype.traceId = "";

                /**
                 * Creates a new GetWebAuthnLoginOptionsResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse} GetWebAuthnLoginOptionsResponse instance
                 */
                GetWebAuthnLoginOptionsResponse.create = function create(properties) {
                    return new GetWebAuthnLoginOptionsResponse(properties);
                };

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsResponse message. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse} message GetWebAuthnLoginOptionsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnLoginOptionsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.optionsJson != null && Object.hasOwnProperty.call(message, "optionsJson"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.optionsJson);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.traceId);
                    return writer;
                };

                /**
                 * Encodes the specified GetWebAuthnLoginOptionsResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetWebAuthnLoginOptionsResponse} message GetWebAuthnLoginOptionsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetWebAuthnLoginOptionsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetWebAuthnLoginOptionsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse} GetWebAuthnLoginOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnLoginOptionsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.optionsJson = reader.string();
                                break;
                            }
                        case 4: {
                                message.traceId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetWebAuthnLoginOptionsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse} GetWebAuthnLoginOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetWebAuthnLoginOptionsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetWebAuthnLoginOptionsResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetWebAuthnLoginOptionsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.optionsJson != null && message.hasOwnProperty("optionsJson"))
                        if (!$util.isString(message.optionsJson))
                            return "optionsJson: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    return null;
                };

                /**
                 * Creates a GetWebAuthnLoginOptionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse} GetWebAuthnLoginOptionsResponse
                 */
                GetWebAuthnLoginOptionsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.optionsJson != null)
                        message.optionsJson = String(object.optionsJson);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    return message;
                };

                /**
                 * Creates a plain object from a GetWebAuthnLoginOptionsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse} message GetWebAuthnLoginOptionsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetWebAuthnLoginOptionsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.optionsJson = "";
                        object.traceId = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.optionsJson != null && message.hasOwnProperty("optionsJson"))
                        object.optionsJson = message.optionsJson;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    return object;
                };

                /**
                 * Converts this GetWebAuthnLoginOptionsResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetWebAuthnLoginOptionsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetWebAuthnLoginOptionsResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetWebAuthnLoginOptionsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetWebAuthnLoginOptionsResponse";
                };

                return GetWebAuthnLoginOptionsResponse;
            })();

            v1.VerifyWebAuthnLoginRequest = (function() {

                /**
                 * Properties of a VerifyWebAuthnLoginRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IVerifyWebAuthnLoginRequest
                 * @property {string|null} [tempToken] VerifyWebAuthnLoginRequest tempToken
                 * @property {string|null} [credentialJson] VerifyWebAuthnLoginRequest credentialJson
                 */

                /**
                 * Constructs a new VerifyWebAuthnLoginRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a VerifyWebAuthnLoginRequest.
                 * @implements IVerifyWebAuthnLoginRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginRequest=} [properties] Properties to set
                 */
                function VerifyWebAuthnLoginRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * VerifyWebAuthnLoginRequest tempToken.
                 * @member {string} tempToken
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @instance
                 */
                VerifyWebAuthnLoginRequest.prototype.tempToken = "";

                /**
                 * VerifyWebAuthnLoginRequest credentialJson.
                 * @member {string} credentialJson
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @instance
                 */
                VerifyWebAuthnLoginRequest.prototype.credentialJson = "";

                /**
                 * Creates a new VerifyWebAuthnLoginRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginRequest} VerifyWebAuthnLoginRequest instance
                 */
                VerifyWebAuthnLoginRequest.create = function create(properties) {
                    return new VerifyWebAuthnLoginRequest(properties);
                };

                /**
                 * Encodes the specified VerifyWebAuthnLoginRequest message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginRequest} message VerifyWebAuthnLoginRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnLoginRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.tempToken != null && Object.hasOwnProperty.call(message, "tempToken"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.tempToken);
                    if (message.credentialJson != null && Object.hasOwnProperty.call(message, "credentialJson"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.credentialJson);
                    return writer;
                };

                /**
                 * Encodes the specified VerifyWebAuthnLoginRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginRequest} message VerifyWebAuthnLoginRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnLoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a VerifyWebAuthnLoginRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginRequest} VerifyWebAuthnLoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnLoginRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.VerifyWebAuthnLoginRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.tempToken = reader.string();
                                break;
                            }
                        case 2: {
                                message.credentialJson = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a VerifyWebAuthnLoginRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginRequest} VerifyWebAuthnLoginRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnLoginRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a VerifyWebAuthnLoginRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                VerifyWebAuthnLoginRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.tempToken != null && message.hasOwnProperty("tempToken"))
                        if (!$util.isString(message.tempToken))
                            return "tempToken: string expected";
                    if (message.credentialJson != null && message.hasOwnProperty("credentialJson"))
                        if (!$util.isString(message.credentialJson))
                            return "credentialJson: string expected";
                    return null;
                };

                /**
                 * Creates a VerifyWebAuthnLoginRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginRequest} VerifyWebAuthnLoginRequest
                 */
                VerifyWebAuthnLoginRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.VerifyWebAuthnLoginRequest)
                        return object;
                    let message = new $root.foolsignup.auth.v1.VerifyWebAuthnLoginRequest();
                    if (object.tempToken != null)
                        message.tempToken = String(object.tempToken);
                    if (object.credentialJson != null)
                        message.credentialJson = String(object.credentialJson);
                    return message;
                };

                /**
                 * Creates a plain object from a VerifyWebAuthnLoginRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {foolsignup.auth.v1.VerifyWebAuthnLoginRequest} message VerifyWebAuthnLoginRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                VerifyWebAuthnLoginRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.tempToken = "";
                        object.credentialJson = "";
                    }
                    if (message.tempToken != null && message.hasOwnProperty("tempToken"))
                        object.tempToken = message.tempToken;
                    if (message.credentialJson != null && message.hasOwnProperty("credentialJson"))
                        object.credentialJson = message.credentialJson;
                    return object;
                };

                /**
                 * Converts this VerifyWebAuthnLoginRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                VerifyWebAuthnLoginRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for VerifyWebAuthnLoginRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                VerifyWebAuthnLoginRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.VerifyWebAuthnLoginRequest";
                };

                return VerifyWebAuthnLoginRequest;
            })();

            v1.VerifyWebAuthnLoginResponse = (function() {

                /**
                 * Properties of a VerifyWebAuthnLoginResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IVerifyWebAuthnLoginResponse
                 * @property {number|null} [code] VerifyWebAuthnLoginResponse code
                 * @property {string|null} [msg] VerifyWebAuthnLoginResponse msg
                 * @property {string|null} [traceId] VerifyWebAuthnLoginResponse traceId
                 */

                /**
                 * Constructs a new VerifyWebAuthnLoginResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a VerifyWebAuthnLoginResponse.
                 * @implements IVerifyWebAuthnLoginResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginResponse=} [properties] Properties to set
                 */
                function VerifyWebAuthnLoginResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * VerifyWebAuthnLoginResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @instance
                 */
                VerifyWebAuthnLoginResponse.prototype.code = 0;

                /**
                 * VerifyWebAuthnLoginResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @instance
                 */
                VerifyWebAuthnLoginResponse.prototype.msg = "";

                /**
                 * VerifyWebAuthnLoginResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @instance
                 */
                VerifyWebAuthnLoginResponse.prototype.traceId = "";

                /**
                 * Creates a new VerifyWebAuthnLoginResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginResponse} VerifyWebAuthnLoginResponse instance
                 */
                VerifyWebAuthnLoginResponse.create = function create(properties) {
                    return new VerifyWebAuthnLoginResponse(properties);
                };

                /**
                 * Encodes the specified VerifyWebAuthnLoginResponse message. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginResponse} message VerifyWebAuthnLoginResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnLoginResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    return writer;
                };

                /**
                 * Encodes the specified VerifyWebAuthnLoginResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.VerifyWebAuthnLoginResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.IVerifyWebAuthnLoginResponse} message VerifyWebAuthnLoginResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VerifyWebAuthnLoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a VerifyWebAuthnLoginResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginResponse} VerifyWebAuthnLoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnLoginResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.VerifyWebAuthnLoginResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a VerifyWebAuthnLoginResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginResponse} VerifyWebAuthnLoginResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VerifyWebAuthnLoginResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a VerifyWebAuthnLoginResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                VerifyWebAuthnLoginResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    return null;
                };

                /**
                 * Creates a VerifyWebAuthnLoginResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.VerifyWebAuthnLoginResponse} VerifyWebAuthnLoginResponse
                 */
                VerifyWebAuthnLoginResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.VerifyWebAuthnLoginResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.VerifyWebAuthnLoginResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    return message;
                };

                /**
                 * Creates a plain object from a VerifyWebAuthnLoginResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {foolsignup.auth.v1.VerifyWebAuthnLoginResponse} message VerifyWebAuthnLoginResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                VerifyWebAuthnLoginResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    return object;
                };

                /**
                 * Converts this VerifyWebAuthnLoginResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                VerifyWebAuthnLoginResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for VerifyWebAuthnLoginResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.VerifyWebAuthnLoginResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                VerifyWebAuthnLoginResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.VerifyWebAuthnLoginResponse";
                };

                return VerifyWebAuthnLoginResponse;
            })();

            v1.GetMeRequest = (function() {

                /**
                 * Properties of a GetMeRequest.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetMeRequest
                 */

                /**
                 * Constructs a new GetMeRequest.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetMeRequest.
                 * @implements IGetMeRequest
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetMeRequest=} [properties] Properties to set
                 */
                function GetMeRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GetMeRequest instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetMeRequest=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetMeRequest} GetMeRequest instance
                 */
                GetMeRequest.create = function create(properties) {
                    return new GetMeRequest(properties);
                };

                /**
                 * Encodes the specified GetMeRequest message. Does not implicitly {@link foolsignup.auth.v1.GetMeRequest.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetMeRequest} message GetMeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetMeRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GetMeRequest message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetMeRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {foolsignup.auth.v1.IGetMeRequest} message GetMeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetMeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetMeRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetMeRequest} GetMeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetMeRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetMeRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetMeRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetMeRequest} GetMeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetMeRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetMeRequest message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetMeRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GetMeRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetMeRequest} GetMeRequest
                 */
                GetMeRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetMeRequest)
                        return object;
                    return new $root.foolsignup.auth.v1.GetMeRequest();
                };

                /**
                 * Creates a plain object from a GetMeRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {foolsignup.auth.v1.GetMeRequest} message GetMeRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetMeRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GetMeRequest to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetMeRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetMeRequest
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetMeRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetMeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetMeRequest";
                };

                return GetMeRequest;
            })();

            v1.GetMeResponse = (function() {

                /**
                 * Properties of a GetMeResponse.
                 * @memberof foolsignup.auth.v1
                 * @interface IGetMeResponse
                 * @property {number|null} [code] GetMeResponse code
                 * @property {string|null} [msg] GetMeResponse msg
                 * @property {string|null} [traceId] GetMeResponse traceId
                 * @property {foolsignup.auth.v1.GetMeResponse.IData|null} [data] GetMeResponse data
                 */

                /**
                 * Constructs a new GetMeResponse.
                 * @memberof foolsignup.auth.v1
                 * @classdesc Represents a GetMeResponse.
                 * @implements IGetMeResponse
                 * @constructor
                 * @param {foolsignup.auth.v1.IGetMeResponse=} [properties] Properties to set
                 */
                function GetMeResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetMeResponse code.
                 * @member {number} code
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @instance
                 */
                GetMeResponse.prototype.code = 0;

                /**
                 * GetMeResponse msg.
                 * @member {string} msg
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @instance
                 */
                GetMeResponse.prototype.msg = "";

                /**
                 * GetMeResponse traceId.
                 * @member {string} traceId
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @instance
                 */
                GetMeResponse.prototype.traceId = "";

                /**
                 * GetMeResponse data.
                 * @member {foolsignup.auth.v1.GetMeResponse.IData|null|undefined} data
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @instance
                 */
                GetMeResponse.prototype.data = null;

                /**
                 * Creates a new GetMeResponse instance using the specified properties.
                 * @function create
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetMeResponse=} [properties] Properties to set
                 * @returns {foolsignup.auth.v1.GetMeResponse} GetMeResponse instance
                 */
                GetMeResponse.create = function create(properties) {
                    return new GetMeResponse(properties);
                };

                /**
                 * Encodes the specified GetMeResponse message. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.verify|verify} messages.
                 * @function encode
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetMeResponse} message GetMeResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetMeResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.traceId);
                    if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                        $root.foolsignup.auth.v1.GetMeResponse.Data.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetMeResponse message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {foolsignup.auth.v1.IGetMeResponse} message GetMeResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetMeResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetMeResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {foolsignup.auth.v1.GetMeResponse} GetMeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetMeResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetMeResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.msg = reader.string();
                                break;
                            }
                        case 3: {
                                message.traceId = reader.string();
                                break;
                            }
                        case 4: {
                                message.data = $root.foolsignup.auth.v1.GetMeResponse.Data.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetMeResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {foolsignup.auth.v1.GetMeResponse} GetMeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetMeResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetMeResponse message.
                 * @function verify
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetMeResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        if (!$util.isInteger(message.code))
                            return "code: integer expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        if (!$util.isString(message.traceId))
                            return "traceId: string expected";
                    if (message.data != null && message.hasOwnProperty("data")) {
                        let error = $root.foolsignup.auth.v1.GetMeResponse.Data.verify(message.data);
                        if (error)
                            return "data." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetMeResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {foolsignup.auth.v1.GetMeResponse} GetMeResponse
                 */
                GetMeResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.foolsignup.auth.v1.GetMeResponse)
                        return object;
                    let message = new $root.foolsignup.auth.v1.GetMeResponse();
                    if (object.code != null)
                        message.code = object.code | 0;
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    if (object.traceId != null)
                        message.traceId = String(object.traceId);
                    if (object.data != null) {
                        if (typeof object.data !== "object")
                            throw TypeError(".foolsignup.auth.v1.GetMeResponse.data: object expected");
                        message.data = $root.foolsignup.auth.v1.GetMeResponse.Data.fromObject(object.data);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetMeResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {foolsignup.auth.v1.GetMeResponse} message GetMeResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetMeResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.code = 0;
                        object.msg = "";
                        object.traceId = "";
                        object.data = null;
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = message.code;
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                        object.traceId = message.traceId;
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = $root.foolsignup.auth.v1.GetMeResponse.Data.toObject(message.data, options);
                    return object;
                };

                /**
                 * Converts this GetMeResponse to JSON.
                 * @function toJSON
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetMeResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetMeResponse
                 * @function getTypeUrl
                 * @memberof foolsignup.auth.v1.GetMeResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetMeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/foolsignup.auth.v1.GetMeResponse";
                };

                GetMeResponse.Data = (function() {

                    /**
                     * Properties of a Data.
                     * @memberof foolsignup.auth.v1.GetMeResponse
                     * @interface IData
                     * @property {string|null} [username] Data username
                     * @property {string|null} [email] Data email
                     */

                    /**
                     * Constructs a new Data.
                     * @memberof foolsignup.auth.v1.GetMeResponse
                     * @classdesc Represents a Data.
                     * @implements IData
                     * @constructor
                     * @param {foolsignup.auth.v1.GetMeResponse.IData=} [properties] Properties to set
                     */
                    function Data(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Data username.
                     * @member {string} username
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @instance
                     */
                    Data.prototype.username = "";

                    /**
                     * Data email.
                     * @member {string} email
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @instance
                     */
                    Data.prototype.email = "";

                    /**
                     * Creates a new Data instance using the specified properties.
                     * @function create
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetMeResponse.IData=} [properties] Properties to set
                     * @returns {foolsignup.auth.v1.GetMeResponse.Data} Data instance
                     */
                    Data.create = function create(properties) {
                        return new Data(properties);
                    };

                    /**
                     * Encodes the specified Data message. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.Data.verify|verify} messages.
                     * @function encode
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetMeResponse.IData} message Data message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Data.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                        if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.email);
                        return writer;
                    };

                    /**
                     * Encodes the specified Data message, length delimited. Does not implicitly {@link foolsignup.auth.v1.GetMeResponse.Data.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetMeResponse.IData} message Data message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Data.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Data message from the specified reader or buffer.
                     * @function decode
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {foolsignup.auth.v1.GetMeResponse.Data} Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Data.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.foolsignup.auth.v1.GetMeResponse.Data();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.username = reader.string();
                                    break;
                                }
                            case 2: {
                                    message.email = reader.string();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Data message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {foolsignup.auth.v1.GetMeResponse.Data} Data
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Data.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Data message.
                     * @function verify
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Data.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.username != null && message.hasOwnProperty("username"))
                            if (!$util.isString(message.username))
                                return "username: string expected";
                        if (message.email != null && message.hasOwnProperty("email"))
                            if (!$util.isString(message.email))
                                return "email: string expected";
                        return null;
                    };

                    /**
                     * Creates a Data message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {foolsignup.auth.v1.GetMeResponse.Data} Data
                     */
                    Data.fromObject = function fromObject(object) {
                        if (object instanceof $root.foolsignup.auth.v1.GetMeResponse.Data)
                            return object;
                        let message = new $root.foolsignup.auth.v1.GetMeResponse.Data();
                        if (object.username != null)
                            message.username = String(object.username);
                        if (object.email != null)
                            message.email = String(object.email);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Data message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {foolsignup.auth.v1.GetMeResponse.Data} message Data
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Data.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.username = "";
                            object.email = "";
                        }
                        if (message.username != null && message.hasOwnProperty("username"))
                            object.username = message.username;
                        if (message.email != null && message.hasOwnProperty("email"))
                            object.email = message.email;
                        return object;
                    };

                    /**
                     * Converts this Data to JSON.
                     * @function toJSON
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Data.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for Data
                     * @function getTypeUrl
                     * @memberof foolsignup.auth.v1.GetMeResponse.Data
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Data.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/foolsignup.auth.v1.GetMeResponse.Data";
                    };

                    return Data;
                })();

                return GetMeResponse;
            })();

            return v1;
        })();

        return auth;
    })();

    return foolsignup;
})();

export { $root as default };
