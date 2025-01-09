"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("./appointment.entity");
const doctor_enum_1 = require("../enums/doctor.enum");
let Doctor = class Doctor {
};
exports.Doctor = Doctor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Doctor.prototype, "doc_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "doc_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, (appointment) => appointment.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['M', 'F'],
    }),
    __metadata("design:type", String)
], Doctor.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Doctor.prototype, "next_available", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: doctor_enum_1.DoctorStatus,
        default: doctor_enum_1.DoctorStatus.Available,
    }),
    __metadata("design:type", String)
], Doctor.prototype, "doc_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Doctor.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Doctor.prototype, "updated_at", void 0);
exports.Doctor = Doctor = __decorate([
    (0, typeorm_1.Entity)()
], Doctor);
//# sourceMappingURL=doctor.entity.js.map