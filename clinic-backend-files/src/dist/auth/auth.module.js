"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const frontdeskstaff_entity_1 = require("../entities/frontdeskstaff.entity");
const jwt_config_1 = require("../config/jwt.config");
const jwt_strategy_1 = require("./jwt.strategy");
const frontdesk_service_1 = require("./frontdesk.service");
const passport_1 = require("@nestjs/passport");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([frontdeskstaff_entity_1.FrontDeskStaff]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: jwt_config_1.jwtConfig.secret,
                signOptions: jwt_config_1.jwtConfig.signOptions,
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, frontdesk_service_1.FrontDeskStaffService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map